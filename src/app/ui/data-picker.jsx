'use client'
import { useState } from 'react'

export default function DatePicker({ title }) {
  const [selectedDate, setSelectedDate] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value)
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  return (
    <div className="relative">
      <label
        htmlFor={`date-picker-${title}`}
        className={`floating-label ${isFocused || selectedDate ? 'active' : ''}`}
      >
        {title}
      </label>
      <input
        className="border border-slate-400 p-2 rounded-lg date-input"
        type="date"
        id={`date-picker-${title}`}
        value={selectedDate}
        onChange={handleDateChange}
        onFocus={handleFocus}
      />
    </div>
  )
}
