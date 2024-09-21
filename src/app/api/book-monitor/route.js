import { NextResponse } from 'next/server'
import BookedMonitor from '@/app/model/booked-monitor'
import { connectDB } from '@/app/lib/mongodb'

export async function POST(request) {
  try {
    const {
      monitorId,
      advertisementName,
      advertisementDescription,
      startDate,
      endDate,
    } = await request.json()

    await connectDB()

    const newBooking = {
      monitor: monitorId,
      advertisementName,
      advertisementDescription,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    }

    console.log(newBooking)

    const result = await BookedMonitor.create(newBooking)

    return NextResponse.json(
      { status: 'success', data: result },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error booking monitor:', error)
    return NextResponse.json(
      {
        status: 'error',
        message: 'Error booking monitor',
        error: error.message,
      },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  try {
    await connectDB()

    const result = await BookedMonitor.find().sort({ createdAt: -1 })

    return NextResponse.json(
      { status: 'success', data: result },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error getting booked monitors:', error)
    return NextResponse.json(
      {
        status: 'error',
        message: 'Error getting booked monitors',
        error: error.message,
      },
      { status: 500 }
    )
  }
}
