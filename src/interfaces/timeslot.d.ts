/**
* Interface for Timeslots, containing a start date and an end date.
*/
export interface ITimeslot {
  start_date: Date,
  end_date: Date,
}

/**
* Interface for Timeslots, containing a start date and an end date. Readonly.
*/
export interface ReadonlyITimeslot {
  readonly start_date: Date,
  readonly end_date: Date,
}