import mongoose from 'mongoose'

const { Schema } = mongoose

const MonitorSchema = new Schema(
  {
    location: {
      type: String,
      unique: true,
      required: true,
    },
    keyword: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    max: {
      type: Number,
      required: true,
      max: 3,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Monitor ||
  mongoose.model('Monitor', MonitorSchema)
