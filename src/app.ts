import mqtt, { MqttClient } from 'mqtt'
import * as dotenv from 'dotenv'
// import express, { Express, Request, Response } from 'express'
import { connect, CallbackError } from 'mongoose'
dotenv.config()

const mongoURI: string = process.env.MONGODB_URI as string || 'mongodb://localhost:27017/dentistimo'
const mqttURI: string = process.env.MQTT_URI as string

const client: MqttClient = mqtt.connect(mqttURI)

// Connect to MongoDB
connect(mongoURI, (err: CallbackError) => {
  if (err) {
    // Connection failure here
    process.exit(1)
  }
  // Connection successful
})

// Publishes
client.on('connect', () => {
  client.subscribe('test', (err: Error) => {
    if (!err) {
      client.publish('test', 'Hello mqtt')
    }
  })
})

client.on('message', (topic: string, message: Buffer) => {
  switch (topic) {
    case 'test':
      // eslint-disable-next-line no-console
      console.log(message.toString())
      client.end()
      break
    case '':
      // new topic here
      client.end()
      break
    default:
      client.end()
      break
  }
})
