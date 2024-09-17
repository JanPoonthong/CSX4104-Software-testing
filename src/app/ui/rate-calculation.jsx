'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { calculateDayBetween } from '@/app/lib/helper'

export default function RateCalculation({ monitorId }) {
  const [monitor, setMonitor] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const monitorAPI = async () => {
      try {
        const response = await fetch(`/api/monitors`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        const result = await response.json()
        if (response.ok) {
          console.log('Monitors:', result)
          const monitorData = result.data.find((each) => each._id === monitorId)
          setMonitor(monitorData)
        } else {
          console.error('Error:', result.message)
        }
      } catch (error) {
        console.error('Error getting monitors:', error)
      } finally {
        setLoading(false)
      }
    }

    monitorAPI()
  }, [monitorId])

  if (loading) return <p>Loading...</p>
  if (!monitor) return <p>Monitor not found</p>

  const monitorDays = calculateDayBetween(monitor?.startDate, monitor?.endDate)

  return (
    <div className="w-1/2 p-4 border border-gray-200">
      <div className="space-y-6 mb-10">
        <h5 className="text-xl font-medium text-gray-900">Rate calculation</h5>
        <div>
          <p className="font-medium">Calculation Formula</p>
          <p className="ml-4">3,000THB per day</p>
        </div>
        <div>
          <p className="font-medium">Day</p>
          <p className="ml-4">{monitorDays.toLocaleString()} Days</p>
        </div>
        <div>
          <p className="font-medium">Total</p>
          <p className="ml-4">
            3,000THB per day * {monitorDays.toLocaleString()} Days
          </p>
        </div>
        <div>
          <p className="font-medium">Net price:</p>
          <p className="ml-4">{(3000 * monitorDays).toLocaleString()}THB</p>
        </div>
      </div>
      <div className="w-full flex">
        <Link
          href="/"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Confirm
        </Link>
      </div>
    </div>
  )
}
