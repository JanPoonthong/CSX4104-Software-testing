import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
}
