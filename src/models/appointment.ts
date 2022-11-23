import { IAppointment } from "../types/appointment"
import { model, Schema } from 'mongoose'

// The Appointment Schema
export const appointmentSchema = new Schema<IAppointment>({
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

export default model<IAppointment>('appointment', appointmentSchema)









