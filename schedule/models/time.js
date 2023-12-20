const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now()
  },
  startTime: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  studentArrivalTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  student: {
    type: String,
    required: true
  },
  note: {
    type: String,
    required: true,
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Time', timeSchema);