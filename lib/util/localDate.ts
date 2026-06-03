// Helpers for prefilling date/datetime inputs with the user's *local* day,
// not UTC. `new Date().toISOString()` is UTC, which rolls over to the next day
// during Pacific evenings — so "defaults to today" could show tomorrow.

function shiftToLocal(date: Date): Date {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
}

/** Local calendar date as `YYYY-MM-DD` for <input type="date">. */
export function todayLocalDate(): string {
  return shiftToLocal(new Date()).toISOString().slice(0, 10);
}

/** Local date+time as `YYYY-MM-DDTHH:mm` for <input type="datetime-local">. */
export function nowLocalDateTime(): string {
  return shiftToLocal(new Date()).toISOString().slice(0, 16);
}

/** Format an existing date as `YYYY-MM-DDTHH:mm` for <input type="datetime-local">. */
export function toLocalDateTimeValue(date: Date): string {
  return shiftToLocal(date).toISOString().slice(0, 16);
}

/** Format an existing date as `YYYY-MM-DD` for <input type="date">. */
export function toLocalDateValue(date: Date): string {
  return shiftToLocal(date).toISOString().slice(0, 10);
}
