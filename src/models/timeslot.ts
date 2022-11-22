/** startdate: Date, enddate: Date */
import { Document, Schema, model } from 'mongoose'

// Interface
export interface Timeslot extends Document {
  start_date: Date,
  end_date: Date,
}


export const timeslotSchema = new Schema({
  start_date: {type: Date, required:true},
  end_date: {type: Date, required:true}
})

export default model<Timeslot>('timeslot', timeslotSchema)





