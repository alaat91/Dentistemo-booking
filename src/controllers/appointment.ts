import { IAppointment } from '../interfaces/appointment'
import Appointment from '../models/appointment'

/**
 * Creates one appointment to database.
 */
export const createAppointment = async (appointmentInfo: IAppointment) => {
  // TODO: Add validation for user_id, dentist_id, issuance, date
  // TODO: send email to user
  try {
    const appointment = new Appointment(appointmentInfo)
    await appointment.save()
    return appointment
  } catch (err) {
    return err
  }
}

/**
 * Returns all appointment entries on one user from database.
 */
export const getAppointmentsFromUserId = (userId: string) => {
  Appointment.find({ user_id: userId }, { new: true }, (err, appointments) => {
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
  Appointment.find(
    {
      user_id: userId,
      date: {
        $gt: new Date(),
      },
    },
    { new: true },
    (err, appointments) => {
      if (err) {
        // Handle error
        return
      }
      if (!appointments) {
        // Found no appointments
        return
      }
      return appointments
    }
  )
}

/**
 * Returns all appointment entries from database.
 */
export const getAllAppointments = () => {
  Appointment.find({}, { new: true }, (err, appointments) => {
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
  Appointment.find(
    {
      user_id: userId,
      date: {
        $lt: new Date(),
      },
    },
    null,
    (err, appointments) => {
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
    }
  )
}

/**
 * Update appointment booking time from request to database.
 */
export const updateAppointmentTime = (userId: string, date: Date) => {
  Appointment.findOneAndUpdate(
    {
      user_id: userId,
      date: {
        $gt: new Date(Date.now() + 86400000),
      },
    },
    { date: date },
    { new: true },
    (err, appointment) => {
      if (err) {
        // Handle error
        return
      }

      if (!appointment) {
        // Found no appointments
        return
      }

      return appointment
    }
  )
  return
}

/**
 * Get all appointments within a date range
 * @param startDate Start date as UNIX ms timestamp
 * @param endDate End date as UNIX ms timestamp
 * @returns Array of appointments
 */

export const getAppointmentsWithinDateRange = async (
  startDate: number,
  endDate: number
) => {
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
