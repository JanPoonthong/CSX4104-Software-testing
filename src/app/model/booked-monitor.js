import mongoose from 'mongoose'

const { Schema } = mongoose

const BookedMonitorSchema = new Schema(
  {
    monitor: {
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
      required: true,
      ref: 'Monitor',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Monitor ||
  mongoose.model('BookedMonitor', BookedMonitorSchema)
