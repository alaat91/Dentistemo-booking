import Appointment from "../models/appointment"

/**
* Creates one appointment to database.
*/
export const createAppointment = () => {
  const app = new Appointment()
  app.save((err, result) => {
    if (err) {
      // Handle error
      return
    }

    return result
  })
}


/**
* Gets all appointment entries on one user from database.
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
* Gets allf uture appointment entries on one user from database.
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
* Gets all appointment entries from database.
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
* Gets appointment history on one user from database.
*/
export const getAppointmentHistory = (userId: string) => {
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
* Change appointment booking time from request to database.
*/
export const changeTime = (userId: string, date: Date) => {
  Appointment.findOneAndUpdate({user_id: userId, date: {
    $gt: new Date()
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