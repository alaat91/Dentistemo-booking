import { Request, Response, NextFunction } from 'express'
import { CallbackError } from 'mongoose'
import Appointment, { Appointment as TAppointment } from '../types/appointment'

exports.create = (req: Request, res: Response, next: NextFunction) => {
  const appointment = new Appointment(req.body)
  appointment.save((err: CallbackError, appointment: TAppointment) => {
    if (err) {
      return next(err)
    }
    return res.status(201).json(appointment)
  })
}

exports.findOne = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  Appointment.findById(id, (err: CallbackError, appointment: TAppointment) => {
    if (err) {
      return next(err)
    }
    
    if (!appointment) {
      return res.status(404).json({'message': "Appointment not found."})
    }

    return res.status(200).json(appointment)
  })
}

exports.updateOne = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  Appointment.findByIdAndUpdate(id, req.body, (err: CallbackError, appointment: TAppointment) => {
    if (err) {
      return next(err)
    }
    
    if (!appointment) {
      return res.status(404).json({'message': "Appointment not found."})
    }

    return res.status(200).json(appointment)
  })
}

exports.deleteOne = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id
  Appointment.findByIdAndDelete(id, (err: CallbackError, appointment: TAppointment) => {
    if (err) {
      return next(err)
    }
    
    if (!appointment) {
      return res.status(404).json({'message': "Appointment not found."})
    }

    return res.status(200).json(appointment)
  })
}