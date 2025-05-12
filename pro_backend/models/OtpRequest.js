const mongoose = require('mongoose');

const otpRequestSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true },
  systemOtp: { type: String, required: true },
  userEnteredOtp: { type: String },
  requestType: { type: String, enum: ['valid', 'invalid'], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('OtpRequest', otpRequestSchema);
