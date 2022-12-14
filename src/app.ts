import mqtt, { MqttClient } from 'mqtt'
import * as dotenv from 'dotenv'
// import express, { Express, Request, Response } from 'express'
import appointment from './controllers/appointment'
import mongoose, { CallbackError } from 'mongoose'

dotenv.config()

const mongoURI: string = process.env.MONGODB_URI as string || 'mongodb://localhost:27017/dentistimo'
const mqttURI: string = process.env.MQTT_URI as string

const client: MqttClient = mqtt.connect(mqttURI)

// Connect to MongoDB
mongoose.connect(mongoURI, (err: CallbackError) => {
  if (err) {
    // Connection failure here
    process.exit(1)
  }
  // Connection successful
})

// Publishes
client.on('connect', () => {
  client.subscribe('test', {qos : 0}, (err) => {
    if (!err) {
      client.publish('test', 'Hello mqtt')
    }
  })
  // Published content include stringified JSON
  client.subscribe('bookings/#', {qos : 0}, (err) => {
    if (err) {
      // TODO: Handle errors
    }

    // Add things here
  })
})

client.on('message', (topic: string, message: Buffer) => {
  switch (topic) {
    case 'bookings/test':
      // eslint-disable-next-line no-console
      console.log(message.toString())
      client.end()
      break
    case 'bookings/appointment/create':
      // new topic here
      appointment.createAppointment(message.toString()).then((newAppointment) => {
        client.publish('bookings/appointment/create', JSON.stringify(newAppointment))
      }).then(() => {
        client.end()
      }).catch(() => {
        client.publish('bookings/appointment/create', 'Woops...')
      })
      break
    default:
      client.end()
      break
  }
})
