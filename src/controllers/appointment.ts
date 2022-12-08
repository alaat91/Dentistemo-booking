import { IAppointment } from "../interfaces/appointment"
import Appointment from "../models/appointment"

/**
* Creates one appointment to database.
*/
export const createAppointment = (appointmentInfo: IAppointment) => {
  const appointment = new Appointment(appointmentInfo)
  appointment.save((err, result) => {
    if (err) {
      // Handle error
      return
    }

    return result
  })
}


/**
* Returns all appointment entries on one user from database.
*/
export const getAppointmentsFromUserId = (userId: string) => {
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
* Returns all future appointment entries on one user from database.
*/
export const getUpcomingAppointmentsFromUserId = (userId: string) => {
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
* Returns all appointment entries from database.
*/
export const getAllAppointments = () => {
  Appointment.find({}, {new: true}, (err, appointments) => {
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
* Returns appointment history on one user from database.
*/
export const getAppointmentHistoryFromUserId = (userId: string) => {
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
* Update appointment booking time from request to database.
*/
export const updateAppointmentTime = (userId: string, date: Date) => {
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