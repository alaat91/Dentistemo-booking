import { IAppointment } from '../interfaces/appointment'
import Appointment from '../models/appointment'

/**
 * 
 * Creates one appointment to database.
 * @param {string} message Inbound MQTT payload message
 * @returns {Promise<IAppointment>} Promise of the return containing appointment object
 * 
 */
async function createAppointment(appointmentInfo: IAppointment): Promise<IAppointment> {
  // TODO: Add validation for user_id, dentist_id, issuance, date
  // TODO: send email to user
  try {
    appointmentInfo.issuance = Date.now()
    
    const requests = await Appointment.find({request_id: appointmentInfo.request_id})

    if (requests.length > 0) {
      throw 'Duplicate request found'
    }

    const appointment = new Appointment(appointmentInfo)
    return await appointment.save()
  } catch {
    throw 'Something went wrong!'
  }
}

/**
 * 
 * Returns all appointment entries on one user from database.
 * @param {string} userId Target user ID for appointments
 * @returns {Promise<IAppointment[]>} An array of appointment entries
 * 
 */
async function getAppointmentsFromUserId(userId: string): Promise<IAppointment[]> {
  return await Appointment.find({user_id: userId}, {new: true}).then((result) => {
    return result
  }).catch((err) => {
    return err
  })
}

/**
 * 
 * Returns all future appointment entries on one user from database.
 * @param {string} userId Target user ID for appointments
 * @returns {Promise<IAppointment[]>} An array of appointment entries
 * 
 */
async function getUpcomingAppointmentsFromUserId(userId: string): Promise<IAppointment[]> {
  return await Appointment.find({user_id: userId, date: {
    $gt: new Date()
  }}, {new: true})
}

/**
 * 
 * Returns all appointment entries from one clinic.
 * @param {string} clinicId Target clinic ID for appointments
 * @param {Date} startDate Starting date of filter
 * @param {Date} endDate Ending date of filter
 * @returns {Promise<IAppointment[]>} An array of appointment entries
 * 
 */
async function getAllAppointmentsFromClinic(clinicId: string, startDate?: Date, endDate?: Date): Promise<IAppointment[]> {
  return await Appointment.find({dentist_id: clinicId, date: {
    $gt: startDate || null, $lt: endDate || null
  }}, {new: true})
}

/**
 * 
 * Returns appointments between two dates.
 * @param {Date} startDate Starting date of checking.
 * @param {Date} endDate Ending date of checking.
 * @returns {Promise<IAppointment[]>}
 * 
 */
async function getAppointmentsBetweenDates(startDate: Date, endDate: Date): Promise<IAppointment[]> {
  return await Appointment.find({date: {
    $gt: startDate, $lt: endDate
  }})
}

/**
 * 
 * Returns appointment history on one user from database.
 * @param {string} userId Target user ID for appointments
 * @returns {Promise<IAppointment[]>} An array of appointment entries
 * 
 */
async function getAppointmentHistoryFromUserId(userId: string): Promise<IAppointment[]> {
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

/**
 * Get all appointments within a date range
 * @param startDate Start date as UNIX ms timestamp
 * @param endDate End date as UNIX ms timestamp
 * @returns Array of appointments
 */

async function getAppointmentsWithinDateRange(startDate: number, endDate: number) {
  try {
    const appointments = await Appointment.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
    return appointments
  } catch (err) {
    // Handle error
    return err
  }
}

export default {
  createAppointment, 
  getAllAppointmentsFromClinic, 
  getAppointmentHistoryFromUserId, 
  getAppointmentsFromUserId, 
  getUpcomingAppointmentsFromUserId, 
  getAppointmentsBetweenDates, 
  updateAppointmentTime,
  getAppointmentsWithinDateRange
}
