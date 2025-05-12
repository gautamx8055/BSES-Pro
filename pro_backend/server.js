// // const express = require('express');
// // const mongoose = require('mongoose');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');

// // const OtpRequest = require('./models/OtpRequest');

// // const app = express();
// // app.use(cors());
// // app.use(bodyParser.json());

// // // Connect to MongoDB (replace with your MongoDB URL if hosted)
// // mongoose.connect('mongodb://localhost:27017/otpSystem', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // })
// // .then(() => console.log('MongoDB connected'))
// // .catch(err => console.error('MongoDB error:', err));

// // // Send OTP
// // app.post('/api/send-otp', async (req, res) => {
// //   const { mobileNumber } = req.body;

// //   if (!mobileNumber || mobileNumber.length !== 10) {
// //     return res.status(400).json({ message: 'Invalid mobile number' });
// //   }

// //   const otp = Math.floor(100000 + Math.random() * 900000).toString();

// //   const otpEntry = new OtpRequest({
// //     mobileNumber,
// //     systemOtp: otp,
// //     userEnteredOtp: '',
// //     requestType: 'invalid',
// //   });

// //   await otpEntry.save();
// //   res.status(200).json({ message: 'OTP sent', otp }); // OTP sent in response (dev only)
// // });

// // // Verify OTP
// // app.post('/api/verify-otp', async (req, res) => {
// //   const { mobileNumber, userEnteredOtp } = req.body;

// //   const latestEntry = await OtpRequest.findOne({ mobileNumber }).sort({ createdAt: -1 });

// //   if (!latestEntry) {
// //     return res.status(404).json({ message: 'OTP not found' });
// //   }

// //   latestEntry.userEnteredOtp = userEnteredOtp;

// //   if (latestEntry.systemOtp === userEnteredOtp) {
// //     latestEntry.requestType = 'valid';
// //     await latestEntry.save();
// //     return res.status(200).json({ message: 'OTP verified', success: true });
// //   } else {
// //     latestEntry.requestType = 'invalid';
// //     await latestEntry.save();
// //     return res.status(401).json({ message: 'Invalid OTP', success: false });
// //   }
// // });

// // app.listen(3001, () => {
// //   console.log('Server running on http://localhost:3001');
// // });

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const multer = require('multer');
// const bodyParser = require('body-parser');
// const path = require('path');

// const OtpRequest = require('./models/OtpRequest');
// const PersonalDetail = require('./models/PersonalDetail');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // MongoDB Connection (single unified DB for both OTP and personal details)
// mongoose.connect('mongodb://localhost:27017/combinedSystem', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB error:', err));

// // Multer setup for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// });
// const upload = multer({ storage });

// // -------- OTP Routes --------

// // Send OTP
// app.post('/api/send-otp', async (req, res) => {
//   const { mobileNumber } = req.body;

//   if (!mobileNumber || mobileNumber.length !== 10) {
//     return res.status(400).json({ message: 'Invalid mobile number' });
//   }

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   const otpEntry = new OtpRequest({
//     mobileNumber,
//     systemOtp: otp,
//     userEnteredOtp: '',
//     requestType: 'invalid',
//   });

//   await otpEntry.save();
//   res.status(200).json({ message: 'OTP sent', otp }); // Include OTP in response for development/testing only
// });

// // Verify OTP
// app.post('/api/verify-otp', async (req, res) => {
//   const { mobileNumber, userEnteredOtp } = req.body;

//   const latestEntry = await OtpRequest.findOne({ mobileNumber }).sort({ createdAt: -1 });

//   if (!latestEntry) {
//     return res.status(404).json({ message: 'OTP not found' });
//   }

//   latestEntry.userEnteredOtp = userEnteredOtp;

//   if (latestEntry.systemOtp === userEnteredOtp) {
//     latestEntry.requestType = 'valid';
//     await latestEntry.save();
//     return res.status(200).json({ message: 'OTP verified', success: true });
//   } else {
//     latestEntry.requestType = 'invalid';
//     await latestEntry.save();
//     return res.status(401).json({ message: 'Invalid OTP', success: false });
//   }
// });

// // -------- Form Submission Route --------

// app.post(
//   '/api/submit',
//   upload.fields([{ name: 'photo' }, { name: 'signature' }]),
//   async (req, res) => {
//     try {
//       const { body, files } = req;

//       const newEntry = new PersonalDetail({
//         ...body,
//         photo: files.photo?.[0]?.path || '',
//         signature: files.signature?.[0]?.path || '',
//       });

//       await newEntry.save();
//       res.status(200).json({ message: 'Form submitted successfully' });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   }
// );


// app.get('/api/personaldetail', async (req, res) => {
//   try {
//     // Fetch the data from personaldetails collection
//     const requests = await PersonalDetail.find();

//     // Send the data as response
//     res.json(requests);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error fetching data' });
//   }
// });

// // Start Server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
// === server.js ===
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const OtpRequest = require('./models/OtpRequest');
const PersonalDetail = require('./models/PersonalDetail');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/combinedSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB error:', err));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// OTP Routes
app.post('/api/send-otp', async (req, res) => {
  const { mobileNumber } = req.body;
  if (!mobileNumber || mobileNumber.length !== 10) {
    return res.status(400).json({ message: 'Invalid mobile number' });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  // const otpEntry = new OtpRequest({ mobileNumber, systemOtp: otp });
  const otpEntry = new OtpRequest({
  mobileNumber,
  systemOtp: otp,
  userEnteredOtp: '',
  requestType: 'invalid',
});
  await otpEntry.save();
  res.status(200).json({ message: 'OTP sent', otp });
});

app.post('/api/verify-otp', async (req, res) => {
  const { mobileNumber, userEnteredOtp } = req.body;
  const latestEntry = await OtpRequest.findOne({ mobileNumber }).sort({ createdAt: -1 });
  if (!latestEntry) return res.status(404).json({ message: 'OTP not found' });

  latestEntry.userEnteredOtp = userEnteredOtp;
  if (latestEntry.systemOtp === userEnteredOtp) {
    latestEntry.requestType = 'valid';
    await latestEntry.save();
    return res.status(200).json({ message: 'OTP verified', success: true });
  } else {
    latestEntry.requestType = 'invalid';
    await latestEntry.save();
    return res.status(401).json({ message: 'Invalid OTP', success: false });
  }
});

// Form submission route
app.post('/api/submit', upload.fields([{ name: 'photo' }, { name: 'signature' }]), async (req, res) => {
  try {
    const { body, files } = req;
    const newEntry = new PersonalDetail({
      ...body,
      photo: files.photo?.[0]?.path || '',
      signature: files.signature?.[0]?.path || '',
    });
    await newEntry.save();
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch personal details
app.get('/api/personaldetail', async (req, res) => {
  try {
    const requests = await PersonalDetail.find();
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
