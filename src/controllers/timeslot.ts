import { ReadonlyITimeslot } from "../interfaces/timeslot"

/**
* Creates a timeslot object.
*/
async function createTimeSlot(startDate: Date, endDate: Date): Promise<ReadonlyITimeslot> {
  return {
    start_date: startDate,
    end_date: endDate,
  }
}

/**
* Returns the start date of timeslot.
*/
async function getStartDate(timeslot: ReadonlyITimeslot): Promise<Date> {
  return timeslot.start_date
}

/**
* Returns the end date of timeslot.
*/
async function getEndDate(timeslot: ReadonlyITimeslot): Promise<Date> {
  return timeslot.end_date
}

export default {createTimeSlot, getStartDate, getEndDate}