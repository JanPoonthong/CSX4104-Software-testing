import mongoose from 'mongoose'

const { Schema } = mongoose

const BookedMonitorSchema = new Schema(
  {
    monitor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    advertisementName: {
      type: String,
      require: true,
    },
    advertisementDescription: {
      type: String,
      require: true,
    },
    startDate: {
      type: Date,
      require: true,
    },
    endDate: {
      type: Date,
      require: true,
    },
  },
  {
    timestamps: true,
  }
)

BookedMonitorSchema.index({ monitor: 1, bookingTime: 1 }, { unique: true })

export default mongoose.models.BookedMonitor ||
  mongoose.model('BookedMonitor', BookedMonitorSchema)
