import { connectDB } from '../src/app/lib/mongodb.js'
import { monitors } from '../src/app/lib/monitor-data.js'
import Monitor from '../src/app/model/monitor.js'
import mongoose from 'mongoose'

async function seedMonitors() {
  try {
    await Monitor.insertMany(monitors)
  } catch (error) {
    console.error('Error seeding monitors:', error)
    throw error
  }
}

async function main() {
  try {
    await connectDB()
    await seedMonitors()
  } finally {
    await mongoose.disconnect()
  }
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err)
})
