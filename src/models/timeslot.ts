import { Timeslot } from "../interfaces/timeslot"
import { model, Schema } from 'mongoose'

// Timeslot Schema
// TODO: Validate dates that start_date do not exceed end_date, and vice versa
export const timeslotSchema = new Schema<Timeslot>({
  start_date: {type: Date, required: true},
  end_date: {type: Date, required: true}
})

export default model<Timeslot>('timeslot', timeslotSchema)





