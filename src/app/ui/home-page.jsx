'use client'

import MonitorCard from '@/app/ui/monitor-card'
import ProvinceSelector from '@/app/ui/province-selector'
import DatePicker from '@/app/ui/data-picker'
import SearchBar from '@/app/ui/search-bar'
import { useState, useEffect, useMemo } from 'react'

export default function HomePage() {
  const [selectedProvince, setSelectedProvince] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredMonitors, setFilteredMonitors] = useState([])
  const [monitors, setMonitors] = useState([])
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [bookedMonitors, setBookedMonitors] = useState([])

  const handleProvinceChange = (province) => {
    setSelectedProvince(province)
  }

  const fetchMonitorsAPI = async () => {
    try {
      const response = await fetch('/api/monitors', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const result = await response.json()
      if (response.ok) {
        setMonitors(result.data)
      } else {
        console.error('Error:', result.message)
      }
    } catch (error) {
      console.error('Error fetching monitors:', error)
    }
  }

  const fetchBookedMonitorsAPI = async () => {
    try {
      const response = await fetch('/api/book-monitor', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const result = await response.json()
      if (response.ok) {
        setBookedMonitors(result.data)
      } else {
        console.error('Error:', result.message)
      }
    } catch (error) {
      console.error('Error fetching monitors:', error)
    }
  }

  // Memoize unavailableDates so that it's recalculated only when bookedMonitors changes
  const unavailableDates = useMemo(() => {
    return bookedMonitors.reduce((acc, range) => {
      const start = new Date(range.startDate)
      const end = new Date(range.endDate)

      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        acc.push({ date: new Date(d), monitor: range.monitor })
      }

      return acc
    }, [])
  }, [bookedMonitors])

  useEffect(() => {
    fetchMonitorsAPI()
    fetchBookedMonitorsAPI()
  }, [])

  useEffect(() => {
    // Filter monitors by province
    let tempMonitors = selectedProvince
      ? monitors.filter((monitor) => monitor.province === selectedProvince)
      : monitors

    // Filter monitors by search term
    if (searchTerm) {
      tempMonitors = tempMonitors.filter((monitor) => {
        const keywords = [monitor.keyword, monitor.location, monitor.province]
        return keywords.some((key) =>
          key.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
    }

    // If a date range is selected, check for overlaps with unavailableDates
    if (startDate || endDate) {
      tempMonitors = tempMonitors.map((monitor) => {
        const newMonitor = { ...monitor }
        newMonitor.isDisable = false

        // Check if the selected date range overlaps with the monitor's unavailable dates
        unavailableDates.forEach((unavailable) => {
          if (
            unavailable.monitor === newMonitor._id && // Match the monitor
            startDate &&
            unavailable.date >= new Date(startDate) &&
            unavailable.date <= new Date(endDate)
          ) {
            newMonitor.isDisable = true
          }
        })

        return newMonitor
      })
    }

    setFilteredMonitors(tempMonitors)
  }, [
    searchTerm,
    selectedProvince,
    monitors,
    startDate,
    endDate,
    unavailableDates,
  ])

  return (
    <>
      <div className="flex justify-between my-3 items-center">
        <div className="flex gap-5">
          <ProvinceSelector
            selectedProvince={selectedProvince}
            onProvinceChange={handleProvinceChange}
          />
          <DatePicker
            title={'Start date'}
            selectedDate={startDate}
            setSelectedDate={setStartDate}
            bookedDates={[]}
          />
          <DatePicker
            title={'End date'}
            selectedDate={endDate}
            setSelectedDate={setEndDate}
            bookedDates={[]}
          />
        </div>
        <div>
          <SearchBar onSearchTermSubmit={setSearchTerm} />
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {filteredMonitors.map((monitor) => (
          <MonitorCard key={monitor._id} monitor={monitor} />
        ))}
      </div>
    </>
  )
}
