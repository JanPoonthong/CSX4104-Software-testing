import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb://127.0.0.1:27017/software-testing'

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
}
