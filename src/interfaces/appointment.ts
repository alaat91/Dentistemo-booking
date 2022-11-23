// Interface for Appointment
export interface Appointment {
  user_id: string,
  request_id: string,
  dentist_id: string,
  issuance: number,
  date: Date,
  /*
  treatment: string
  */
}