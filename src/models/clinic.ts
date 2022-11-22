/** id: String, name: String, owner: String, dentists: Integer, 
 * address: String, Opening Hours: Date,  City: String */
import { Schema, model } from 'mongoose'

// Interface
export interface Clinic {
  user_id: string,
  name: string,
  owner: string,
  dentists: number,
  address: string,
  opening_hours: Date,
  city: string
}


//Schema 
export const clinicSchema = new Schema<Clinic>({
  user_id: {type: String, required: true},
  name: {type: String, required: true},
  owner:  {type: String, required:true},
  dentists: {type: Number, required:true},
  address: {type: String, required:true},
  opening_hours: {type: Date, required:true},
  city: {type: String, required:true},
})

export default model<Clinic>('clinic', clinicSchema)




