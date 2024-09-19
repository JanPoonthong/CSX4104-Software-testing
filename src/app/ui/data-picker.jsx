'use client'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function CustomDatePicker({
  selectedDate,
  setSelectedDate,
  bookedDates,
}) {
  const unavailableDates = bookedDates.reduce((acc, range) => {
    const start = new Date(range.startDate)
    const end = new Date(range.endDate)

    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      acc.push(new Date(d))
    }

    return acc
  }, [])

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <div className="relative">
      <DatePicker
        className="border border-slate-400 p-2 rounded-lg date-input"
        selected={selectedDate}
        onChange={handleDateChange}
        excludeDates={unavailableDates}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select a date"
      />
    </div>
  )
}
