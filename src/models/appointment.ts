
/**userid:  String, requestid: String , dentistid: String , issuance: boolean, date: Date, price: float, 
 * treatment: String/Enum */
import mongoose, { Schema } from 'mongoose'

const appointmentSchema = new Schema({
  user_id: String,
  request_id: String,
  dentist_id: String,
  issuance: Boolean,
  date: Date,
  price: Number,
  treatment: String
})

module.exports = mongoose.model('appointment', appointmentSchema)