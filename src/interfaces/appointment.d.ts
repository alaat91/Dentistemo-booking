// Interface for Appointment
export interface IAppointment {
  user_id: string,
  request_id: string,
  clinic_id: string,
  issuance: number,
  date: Date,
  /*
  treatment: string
  */
}