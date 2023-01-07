import { IAppointment } from "../interfaces/appointment"
import { model, Schema } from 'mongoose'

// The Appointment Schema
export const appointmentSchema = new Schema<IAppointment>({
  user_id: { type: String, required: true},
  request_id: { type: String, required: true},
  dentist_id: { type: String, required: true},
  issuance: { type: Number, default: Date.now(), required: true},
  date: { type: Number, required: true},
  /*
  treatment: { 
    type: String,
    required: true,
    enum: ["null"]
  }
  */
})

export default model<IAppointment>('Appointment', appointmentSchema)