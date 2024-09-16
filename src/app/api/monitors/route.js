import { NextResponse } from 'next/server'
import Monitor from '@/app/model/monitor'
import { connectDB } from '@/app/lib/mongodb'

export async function GET() {
  try {
    await connectDB()

    const monitors = await Monitor.find()
    return NextResponse.json(
      { status: 'success', data: monitors },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Error fetching monitors',
        error: error.message,
      },
      { status: 500 }
    )
  }
}
