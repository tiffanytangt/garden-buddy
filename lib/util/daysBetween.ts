export function daysBetween(date1: Date, date2: Date): number {
  // Convert both dates to milliseconds
  const date1Ms = date1.getTime();
  const date2Ms = date2.getTime();

  // Calculate the difference in milliseconds
  const differenceMs = Math.abs(date2Ms - date1Ms);

  // Convert the difference to days
  const daysDifference = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

  return daysDifference;
}
