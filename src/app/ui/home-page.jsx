'use client'

import MonitorCard from '@/app/ui/monitor-card'
import ProvinceSelector from '@/app/ui/province-selector'
import DatePicker from '@/app/ui/data-picker'
import SearchBar from '@/app/ui/search-bar'
import { monitors } from '@/app/lib/monitor-data'
import { useState } from 'react'

export default function HomePage() {
  const [selectedProvince, setSelectedProvince] = useState('')

  const handleProvinceChange = (province) => {
    setSelectedProvince(province)
  }

  const filterMonitors = selectedProvince
    ? monitors.filter((monitor) => monitor.province === selectedProvince)
    : monitors

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
          <SearchBar />
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {filterMonitors.map((monitor) => (
          <MonitorCard key={monitor.id} monitor={monitor} />
        ))}
      </div>
    </>
  )
}
