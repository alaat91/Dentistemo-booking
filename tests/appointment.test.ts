import { assert } from 'chai'
import mongoose from 'mongoose'
import { disconnect } from 'process'
import appointment from '../src/controllers/appointment'

const mongoURI: string = process.env.MONGODB_URI as string || 'mongodb://localhost:27017/dentistimo'

before(() => {
  mongoose.connect(mongoURI, (err) => {
    if (err) {
      // Connection failure here
      process.exit(1)
    }
    // Connection successful
  })
})

after(async () => {
  await mongoose.connection.close()
})

/*
* This section of unit tests is for creating appointments.
* Tests should attempt use invalid vs. valid parameters, expect former to error and latter to return objects.
*/
describe('Create appointments for user', async () => {
  after(async () => {
    mongoose.connection.dropDatabase()
  })
  describe('createAppointment(), no parameters', () => {
    it('should return an error on', (done) => {
      appointment.createAppointment('').then((result) => {
        assert.equal(result, null, 'Appointment generated something')
        done()
      }).catch((err) => {
        assert.equal(err, '', 'Appointment did not generate error')
        done()
      })
    })
  })
  describe('createAppointment(), with invalid parameters', () => {
    it('should X', (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    }),
    it('should Y', (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })
  describe('createAppointment(), with valid parameters', () => {
    it('should X', (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })
})

/*
* This section of unit tests is for getting appointments from one user's ID.
*/
describe('Getting appointments from one user', async () => {
  describe('getAppointmentsFromUserId(), no parameters', () => {
    it('should return an error on', (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })
})

/*
* This section of unit tests is for getting appointments from one user's ID.
*/
describe('Getting upcoming appointments from one user', async () => {
  describe('getUpcomingAppointmentsFromUserId(), no parameters', () => {
    it('should return an error on', (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })
})

/*
* This section of unit tests is for getting historic appointments from one user's ID.
*/
describe('Getting all historic appointments from one user', async () => {
  describe('getAppointmentHistoryFromUserId(), no parameters', () => {
    it('should return an error on', (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })
})

/*
* This section of unit tests is for getting all appointments.
*/
describe('Getting all booked appointments', async () => {
  describe('getAllAppointments(), no parameters', () => {
    it('should return an error on', (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })
})

/*
* This section of unit tests is for updating appointments.
*/
describe('Updating appointment time on existing appointment', async () => {
  describe('updateAppointmentTime(), no parameters', () => {
    it('should return an error on', (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })
})