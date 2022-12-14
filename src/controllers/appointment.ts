import { IAppointment } from "../interfaces/appointment"
import Appointment from "../models/appointment"

/**
 * 
 * Creates one appointment to database.
 * @param {string} message Inbound MQTT payload message
 * @returns {Promise<string | IAppointment>} Promise of the return containing another message or appointment object
 * 
 */
async function createAppointment(message: string): Promise<string | IAppointment> {
  const appointmentInfo = JSON.parse(message)
  const { userId, requestId, clinicId, bookedDateTime } = appointmentInfo
  const requests = Appointment.find({request_id: requestId}) 

  if ((await requests).length > 0)
    return 'Duplicate request found'

  const appointment = new Appointment({user_id: userId, request_id: requestId, clinic_id: clinicId, issuance: Date.now(), date: new Date(bookedDateTime)})
  appointment.save((err, result) => {
    if (err) {
      // Handle error
      return ''
    }

    return result
  })
  return ''
}


/**
 * 
 * Returns all appointment entries on one user from database.
 * @param {string} userId Target user ID for appointments
 * @returns An array of appointment entries?
 * 
 */
async function getAppointmentsFromUserId(userId: string) {
  Appointment.find({user_id: userId}, {new: true}, (err, appointments) => {
    if (err) {
      // Handle error
      return
    }
    if (!appointments) {
      // Found no appointments
      return
    }
    return appointments
  })
}

/**
 * 
 * Returns all future appointment entries on one user from database.
 * @param {string} userId Target user ID for appointments
 * @returns An array of appointment entries?
 * 
 */
async function getUpcomingAppointmentsFromUserId(userId: string) {
  Appointment.find({user_id: userId, date: {
    $gt: new Date()
  }}, {new: true}, (err, appointments) => {
    if (err) {
      // Handle error
      return
    }
    if (!appointments) {
      // Found no appointments
      return
    }
    return appointments
  })
}

/**
 * 
 * Returns all appointment entries from one clinic.
 * @param {string} clinicId Target clinic ID for appointments
 * @returns An array of appointment entries?
 * 
 */
async function getAllAppointmentsFromClinic(clinicId: string) {
  Appointment.find({dentist_id: clinicId}, {new: true}, (err, appointments) => {
    if (err) {
      // Handle error
      return
    }
    if (!appointments) {
      // Found no appointments
      return
    }
    return appointments
  })
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
  Appointment.find({date: {
    $gt: startDate, $lt: endDate
  }}, null, (err, appointments) => {
    // Hello?
    if (err) {
      // Handle error
      return
    }
    if (!appointments) {
      // Found no appointments
      return
    }
    return appointments
  })
  return
}

/**
 * 
 * Returns appointment history on one user from database.
 * @param {string} userId Target user ID for appointments
 * @returns An array of appointment entries?
 * 
 */
async function getAppointmentHistoryFromUserId(userId: string) {
  Appointment.find({user_id: userId, date: {
    $lt: new Date()
  }}, null, (err, appointments) => {
    // Hello?
    if (err) {
      // Handle error
      return
    }
    if (!appointments) {
      // Found no appointments
      return
    }
    return appointments
  })
}

/**
 * 
 * Update appointment booking time from request to database.
 * @param {string} userId Target user ID for appointments.
 * @param {Date} date New date to update appointment to.
 * @returns
 * 
 */
async function updateAppointmentTime(userId: string, date: Date): Promise<undefined> {
  Appointment.findOneAndUpdate({user_id: userId, date: {
    $gt: new Date(Date.now() + 86400000)
  }}, {date: date}, {new: true}, (err, appointment) => {
    if (err) {
      // Handle error
      return
    }

    if (!appointment) {
      // Found no appointments
      return
    }

    return appointment
  })
  return
}

export default {createAppointment, getAllAppointmentsFromClinic, getAppointmentHistoryFromUserId, getAppointmentsFromUserId, getUpcomingAppointmentsFromUserId, getAppointmentsBetweenDates, updateAppointmentTime}