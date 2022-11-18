import { Request, Response, NextFunction } from 'express'
import Appointment from '../models/appointment'

exports.create = (req: Request, res: Response, next: NextFunction) => {
  const appointment = new Appointment(req.body)
  appointment.save((err, appointment) => {
    if (err) {
      return next(err)
    }
    return res.status(201).json(appointment)
  })
}

exports.updateDate = () => {
  return
}

exports.archive = () => {
  return
}