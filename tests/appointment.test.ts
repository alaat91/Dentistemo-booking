import { assert } from 'chai'
import mongoose from 'mongoose'
import appointment from '../src/controllers/appointment'
import { IAppointment } from '../src/interfaces/appointment'

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
describe('Create appointments for user', () => {
  after(async () => {
    mongoose.connection.dropDatabase()
  })
  describe('createAppointment(), no parameters', () => {
    it('should return an error on', async () => {
      await appointment.createAppointment('').then((result) => {
        assert.equal(result, null, 'Appointment generated something')
      }).catch((result) => {
        assert.equal(result, 'Something went wrong!', 'Appointment generated something')
      })
    })
  })
  describe('createAppointment(), with invalid parameters', () => {
    it('should X', async (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    }),
    it('should Y', async (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })
  describe('createAppointment(), with valid parameters', () => {
    const currentTime = Date.now()
    const paramPreset: IAppointment = {
      user_id: '27881266',
      request_id: '0',
      clinic_id: '1337',
      issuance: 0,
      date: new Date(),
    }

    it('should create a proper appointment', async () => {  
      await appointment.createAppointment(JSON.stringify(paramPreset)).then((result) => {
        assert.exists(result, 'Nothing was returned')
        assert.equal(result.user_id, paramPreset.user_id, 'User ID modified/mismatched')
        assert.equal(result.request_id, paramPreset.request_id, 'Request ID modified/mismatched')
        assert.equal(result.clinic_id, paramPreset.clinic_id, 'Clinic ID modified/mismatched')
        assert.notEqual(result.issuance, 0, "Issuance time unchanged")
        assert.isAtLeast(result.issuance, currentTime, "Issuance time mismatched")
      }).catch((result) => {
        assert.notOk(result, result)
      })
    })
  })
})

/*
* This section of unit tests is for getting appointments from one user's ID.
*/
describe('Getting appointments from one user', () => {
  describe('getAppointmentsFromUserId(), no parameters', () => {
    it('should return an error on', async (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })
})

/*
* This section of unit tests is for getting appointments from one user's ID.
*/
describe('Getting upcoming appointments from one user', () => {
  describe('getUpcomingAppointmentsFromUserId(), no parameters', () => {
    it('should return an error on', async (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })
})

/*
* This section of unit tests is for getting historic appointments from one user's ID.
*/
describe('Getting all historic appointments from one user', () => {
  describe('getAppointmentHistoryFromUserId(), no parameters', () => {
    it('should return an error on', async (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })
})

/*
* This section of unit tests is for getting all appointments.
*/
describe('Getting all booked appointments', () => {
  describe('getAllAppointments(), no parameters', () => {
    it('should return an error on', async (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })
})

/*
* This section of unit tests is for updating appointments.
*/
describe('Updating appointment time on existing appointment', () => {
  describe('updateAppointmentTime(), no parameters', () => {
    it('should return an error on', async (done) => {
      assert.isTrue(true, 'Placeholder failed!?')
      done()
    })
  })
})