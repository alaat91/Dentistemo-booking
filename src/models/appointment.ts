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
  user_id: { type: String, required: true},
  request_id: { type: String, required: true},
  dentist_id: { type: String, required: true},
  issuance: { type: Boolean, required: true},
  date: { type: Date, required: true},
  price: { type: Number, required: true},
  treatment: { 
    type: String,
    required: true,
    enum: ["null"]
  }
})

export default model<Appointment>('appointment', appointmentSchema)