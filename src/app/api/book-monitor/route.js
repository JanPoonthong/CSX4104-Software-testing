import { NextResponse } from 'next/server'
import BookedMonitor from '@/app/model/booked-monitor'
import Monitor from '@/app/model/monitor'
import { connectDB } from '@/app/lib/mongodb'

export async function GET() {
  return NextResponse.json({ message: 'Hello' })
}

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

    const monitor = await Monitor.findById(monitorId)
    const result = await BookedMonitor.create(newBooking)

    if (new Date(monitor.endDate) < new Date(newBooking.endDate)) {
      monitor.endDate = newBooking.endDate
    }

    await monitor.save()

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
