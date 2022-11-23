import Appointment from "../models/appointment"

/**
* Creates one appointment to database.
*/
export const create = () => {
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
* Gets all appointment entries from database.
*/
export const get = (userId: string) => {
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
* Gets all appointment entries from database.
*/
export const getHistory = (userId: string) => {
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
  Appointment.findOneAndUpdate({user_id: userId}, {date: date}, {new: true}, (err, appointment) => {
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