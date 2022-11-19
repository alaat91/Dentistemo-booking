/** startdate: Date, enddate: Date */
import { Schema } from 'mongoose'

const timeslotSchema = new Schema({
    start_date: Date,
    end_date:Date,
})

module.exports = mongoose.model('clinic', appointmentSchema)