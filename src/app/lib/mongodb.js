import mongoose from 'mongoose'

// const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URI =
  'mongodb+srv://janpoonthong628:OD3X1AGECxIJuzpG@cluster0.v64su.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw error
  }
}
