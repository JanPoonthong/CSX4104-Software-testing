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
    startDate: {
      type: Date,
      default: new Date('1990-01-01'),
    },
    endDate: {
      type: Date,
      default: new Date('1990-01-01'),
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Monitor ||
  mongoose.model('Monitor', MonitorSchema)
