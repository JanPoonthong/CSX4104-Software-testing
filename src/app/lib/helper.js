export function isDateBetween(dateToCheck, startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const check = new Date(dateToCheck)

  return check >= start && check <= end
}
