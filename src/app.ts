import mqtt from 'mqtt'
import * as dotenv from 'dotenv'
import { connect } from 'mongoose'
dotenv.config()

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dentistimo'
const client = mqtt.connect(process.env.MQTT_URI as string)

// Connect to MongoDB
connect(mongoURI, (err) => {
  if (err) {
    // Connection failure here
    process.exit(1)
  }
  // Connection successful
})

client.on('connect', () => {
  client.subscribe('test', (err) => {
    if (!err) {
      client.publish('test', 'Hello mqtt')
    }
  })
})

client.on('message', (topic, message) => {
  switch (topic) {
    case 'test':
      // eslint-disable-next-line no-console
      console.log(message.toString())
      client.end()
      break
  }
})
