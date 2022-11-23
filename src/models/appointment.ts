import { Appointment } from "../interfaces/appointment"
import { model, Schema } from 'mongoose'

// The Appointment Schema
export const appointmentSchema = new Schema<Appointment>({
  user_id: { type: String, required: true},
  request_id: { type: String, required: true},
  dentist_id: { type: String, required: true},
  issuance: { type: Number, required: true},
  date: { type: Date, required: true},
  /*
  treatment: { 
    type: String,
    required: true,
    enum: ["null"]
  }
  */
})

export default model<Appointment>('Appointment', appointmentSchema)









