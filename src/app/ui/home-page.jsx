'use client'

import MonitorCard from '@/app/ui/monitor-card'
import ProvinceSelector from '@/app/ui/province-selector'
import DatePicker from '@/app/ui/data-picker'
import SearchBar from '@/app/ui/search-bar'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [selectedProvince, setSelectedProvince] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredMonitors, setFilteredMonitors] = useState([])
  const [monitors, setMonitors] = useState([])
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()

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
        // console.log('Fetch Monitors:', result)
        setMonitors(result.data)
      } else {
        console.error('Error:', result.message)
      }
    } catch (error) {
      console.error('Error fetching monitors:', error)
    }
  }

  useEffect(() => {
    fetchMonitorsAPI()
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

    function isDateBetween(dateToCheck, startDate, endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const check = new Date(dateToCheck)

      return check >= start && check <= end
    }

    if (startDate || endDate) {
      tempMonitors = monitors.map((monitor) => {
        monitor.isDisable = false
        if (isDateBetween(startDate, monitor.startDate, monitor.endDate)) {
          monitor.isDisable = true
          monitor.available = new Date(monitor.endDate)
          monitor.available.setDate(monitor.available.getDate() + 1)
        }
        return monitor
      })
    }

    setFilteredMonitors(tempMonitors)
  }, [searchTerm, selectedProvince, monitors, startDate, endDate])

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
          />
          <DatePicker
            title={'End date'}
            selectedDate={endDate}
            setSelectedDate={setEndDate}
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
