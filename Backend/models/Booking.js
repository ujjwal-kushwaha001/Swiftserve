const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  appointmentTime: { type: Date, required: true },
  serviceName: { type: String, required: true }, // Tracking what was booked
  status: { type: String, default: 'Pending' },
  uniqueCode: {type: Number, required: true}
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);