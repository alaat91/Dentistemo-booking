import { IAppointment } from "../interfaces/appointment"
import Appointment from "../models/appointment"

/**
 * 
 * Creates one appointment to database.
 * @param {string} message Inbound MQTT payload message
 * @returns {Promise<string | IAppointment>} Promise of the return containing another message or appointment object
 * 
 */
async function createAppointment(message: string): Promise<IAppointment> {
  try {
    const appointmentParams: IAppointment = JSON.parse(message)
    appointmentParams.issuance = Date.now()
    
    const requests = await Appointment.find({request_id: appointmentParams.request_id})

    if (requests.length > 0) {
      throw 'Duplicate request found'
    }

    const appointment = new Appointment(appointmentParams)
    return await appointment.save()
  } catch {
    throw 'Something went wrong!'
  }
}

/**
 * 
 * Returns all appointment entries on one user from database.
 * @param {string} userId Target user ID for appointments
 * @returns An array of appointment entries?
 * 
 */
async function getAppointmentsFromUserId(userId: string) {
  return await Appointment.find({user_id: userId}, {new: true})
}

/**
 * 
 * Returns all future appointment entries on one user from database.
 * @param {string} userId Target user ID for appointments
 * @returns An array of appointment entries?
 * 
 */
async function getUpcomingAppointmentsFromUserId(userId: string) {
  return await Appointment.find({user_id: userId, date: {
    $gt: new Date()
  }}, {new: true})
}

/**
 * 
 * Returns all appointment entries from one clinic.
 * @param {string} clinicId Target clinic ID for appointments.
 * @param {Date} startDate Starting date of filter.
 * @param {Date} endDate Ending date of filter.
 * @returns An array of appointment entries?
 * 
 */
async function getAllAppointmentsFromClinic(clinicId: string, startDate?: Date, endDate?: Date) {
  return await Appointment.find({dentist_id: clinicId, date: {
    $gt: startDate || null, $lt: endDate || null
  }}, {new: true})
}

/**
 * 
 * Returns appointments between two dates.
 * @param {Date} startDate Starting date of checking.
 * @param {Date} endDate Ending date of checking.
 * @returns
 * 
 */
async function getAppointmentsBetweenDates(startDate: Date, endDate: Date) {
  return await Appointment.find({date: {
    $gt: startDate, $lt: endDate
  }})
}

/**
 * 
 * Returns appointment history on one user from database.
 * @param {string} userId Target user ID for appointments
 * @returns An array of appointment entries?
 * 
 */
async function getAppointmentHistoryFromUserId(userId: string) {
  return await Appointment.find({user_id: userId, date: {
    $lt: new Date()
  }})
}

/**
 * 
 * Update appointment booking time from request to database.
 * @param {string} userId Target user ID for appointments.
 * @param {Date} date New date to update appointment to.
 * @returns
 * 
 */
async function updateAppointmentTime(userId: string, date: Date): Promise<null | undefined> {
  return await Appointment.findOneAndUpdate({user_id: userId, date: {
    $gt: new Date(Date.now() + 86400000)
  }}, {date: date}, {new: true})
}

export default {createAppointment, getAllAppointmentsFromClinic, getAppointmentHistoryFromUserId, getAppointmentsFromUserId, getUpcomingAppointmentsFromUserId, getAppointmentsBetweenDates, updateAppointmentTime}