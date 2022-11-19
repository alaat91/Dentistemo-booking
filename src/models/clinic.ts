/** id: String, name: String, owner: String, dentists: Integer, 
 * address: String, Opening Hours: Date,  City: String */
 import { Schema } from 'mongoose'

 const clinicSchema = new Schema({
    user_id: String,
    name: String,
    owner: String,
    dentists: Number,
    address: String,
    opening_hours: Date,
    city: String
 })
 module.exports = mongoose.model('clinic', appointmentSchema)