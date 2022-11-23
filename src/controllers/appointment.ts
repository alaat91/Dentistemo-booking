import Appointment from "../models/appointment"

// Creates appointment from request
export function create() {
  const app = new Appointment()
  app.save((err, result) => {
    if (err) {
      // Handle error
      return
    }

    return result
  })
}

// Get appointment from ID
export function get(userId: string) {
  Appointment.findOne({user_id: userId}, null, (err, appointment) => {
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
}

// Change appointment booking time from request
export function changeTime(userId: string, date: Date) {
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