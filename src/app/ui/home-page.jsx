'use client'

import MonitorCard from '@/app/ui/monitor-card'
import ProvinceSelector from '@/app/ui/province-selector'
import DatePicker from '@/app/ui/data-picker'
import SearchBar from '@/app/ui/search-bar'
import { monitors } from '@/app/lib/monitor-data'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [selectedProvince, setSelectedProvince] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredMonitors, setFilteredMonitors] = useState(monitors)

  const handleProvinceChange = (province) => {
    setSelectedProvince(province)
  }

  useEffect(() => {
    // filter monitors by province
    let tempMonitors = selectedProvince
      ? monitors.filter((monitor) => monitor.province === selectedProvince)
      : monitors

    // filter monitors by search
    if (searchTerm) {
      tempMonitors = monitors.filter((monitor) => {
        const keywords = [monitor.keyword, monitor.location, monitor.province]
        return keywords.some((key) =>
          key.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
    }

    setFilteredMonitors(tempMonitors)
  }, [searchTerm, selectedProvince])

  return (
    <>
      <div className="flex justify-between my-3 items-center">
        <div className="flex gap-5 ">
          <ProvinceSelector
            selectedProvince={selectedProvince}
            onProvinceChange={handleProvinceChange}
          />
          <DatePicker title={'Start date'} />
          <DatePicker title={'End date'} />
        </div>
        <div>
          <SearchBar onSearchTermSubmit={setSearchTerm} />
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {filteredMonitors.map((monitor) => (
          <MonitorCard key={monitor.id} monitor={monitor} />
        ))}
      </div>
    </>
  )
}
