export function isDateBetween(dateToCheck, startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const check = new Date(dateToCheck)

  return check >= start && check <= end
}

export function calculateDayBetween(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid date(s)')
  }

  const differenceInTime = end.getTime() - start.getTime()

  const differenceInDays = differenceInTime / (1000 * 3600 * 24)

  return Math.floor(differenceInDays)
}
