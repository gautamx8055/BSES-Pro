const mongoose = require('mongoose');

const personalDetailSchema = new mongoose.Schema({
  requestId: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: String,
  lastName: String,
  dob: String,
  gender: String,
  connection: String,
  email: String,
  phone: String,
  houseNumber: String,
  streetName: String,
  district: String,
  landmark: String,
  state: String,
  pincode: String,
  photo: String,      // stores path or URL
  signature: String,  // stores path or URL
}, { timestamps: true });

// Generate 5-digit unique requestId
personalDetailSchema.pre('validate', async function (next) {
  if (!this.requestId) {
    let isUnique = false;
    while (!isUnique) {
      const randomId = Math.floor(10000 + Math.random() * 90000).toString(); // generates a 5-digit number
      const existing = await mongoose.models.PersonalDetail.findOne({ requestId: randomId });
      if (!existing) {
        this.requestId = randomId;
        isUnique = true;
      }
    }
  }
  next();
});

module.exports = mongoose.model('PersonalDetail', personalDetailSchema);
