'use client'
import { useState } from 'react'

export default function DatePicker({ labelName }) {
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
        htmlFor={`date-picker-${labelName}`}
        className={`floating-label ${isFocused || selectedDate ? 'active' : ''}`}
      >
        {labelName}
      </label>
      <input
        className="border border-slate-400 p-2 rounded-lg date-input"
        type="date"
        id={`date-picker-${labelName}`}
        value={selectedDate}
        onChange={handleDateChange}
        onFocus={handleFocus}
      />
    </div>
  )
}
