import { ReadonlyITimeslot } from "../interfaces/timeslot"

/**
 * 
 * Creates a timeslot object.
 * @param {Date} startDate Starting date of timeslot.
 * @param {Date} endDate Ending date of timeslot.
 * @returns {ReadonlyITimeslot} Timeslot object containing start and end date.
 *
 */
async function createTimeSlot(startDate: Date, endDate: Date): Promise<ReadonlyITimeslot> {
  return {
    start_date: startDate,
    end_date: endDate,
  }
}

/**
 * 
 * @param timeslot 
 * @returns 
 * 
 */


/**
 * 
 * Returns the start date of timeslot.
 * @param {ReadonlyITimeslot} timeslot Timeslot object.
 * @returns {Date} Starting date of timeslot.
 * 
 */
async function getStartDate(timeslot: ReadonlyITimeslot): Promise<Date> {
  return timeslot.start_date
}

/**
 * 
 * Returns the end date of timeslot.
 * @param {ReadonlyITimeslot} timeslot Timeslot object.
 * @returns {Date} Ending date of timeslot.
 * 
 */
async function getEndDate(timeslot: ReadonlyITimeslot): Promise<Date> {
  return timeslot.end_date
}

export default {createTimeSlot, getStartDate, getEndDate}