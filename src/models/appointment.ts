/* userid:  String, requestid: String , dentistid: String , issuance: boolean, date: Date, price: float, treatment: String/Enum */
import { Schema, model } from 'mongoose'

// Interface
interface Appointment {
  user_id: string,
  request_id: string,
  dentist_id: string,
  issuance: boolean,
  date: Date,
  price: number,
  treatment: string
}

// Schema
const appointmentSchema = new Schema({
  user_id: String,
  request_id: String,
  dentist_id: String,
  issuance: Boolean,
  date: Date,
  price: Number,
  treatment: { 
    type: String,
    enum: ["null"]
  }
})

export default model<Appointment>('appointment', appointmentSchema)