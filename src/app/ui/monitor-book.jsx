'use client'

import DatePicker from '@/app/ui/data-picker'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MonitorBook({ monitorId }) {
  const [selectedStartDate, setSelectedStartDate] = useState('')
  const [selectedEndDate, setSelectedEndDate] = useState('')
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const data = {
      monitorId: monitorId,
      advertisementName: formData.get('advertisement_name'),
      advertisementDescription: formData.get('advertisement_description'),
      startDate: selectedStartDate,
      endDate: selectedEndDate,
    }

    await BookedMonitorAPI(data)
    router.push('/rate')
  }

  const BookedMonitorAPI = async (data) => {
    try {
      const response = await fetch(`/api/book-monitor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (response.ok) {
        console.log('Monitor booked:', result)
      } else {
        console.error('Error:', result.message)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="w-1/2 p-4 border border-gray-200">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h5 className="text-xl font-medium text-gray-900">
          Upload Your Advertisement
        </h5>
        <div>
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Select image
          </label>
          <input
            type="file"
            name="image"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder=""
            required
          />
        </div>
        <div>
          <label
            htmlFor="advertisement_name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Advertisement name
          </label>
          <input
            type="text"
            name="advertisement_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder=""
            required
          />
        </div>
        <div>
          <label
            htmlFor="advertisement_description"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Advertisement description
          </label>
          <input
            type="text"
            name="advertisement_description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder=""
            required
          />
        </div>
        <div className="flex justify-between flex-wrap gap-3 items-center">
          <DatePicker
            title={'Start date'}
            selectedDate={selectedStartDate}
            setSelectedDate={setSelectedStartDate}
          />
          <p>-</p>
          <DatePicker
            title={'End date'}
            selectedDate={selectedEndDate}
            setSelectedDate={setSelectedEndDate}
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
