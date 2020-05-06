const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const dotenv = require('dotenv');

// Load env variables
dotenv.config({ path: './config/.env' });

// Import routes
const authRoute = require('./routes/auth');
const sensorRoute = require('./routes/sensors');
const userRoute = require('./routes/user');
const path = require('path');

// Middleware
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 150000
  })
);
app.use(bodyParser.json({ limit: '50mb' }));

app.use(cookieParser());
app.use(cors());
app.use(
  bodyParser.json({
    limit: '50mb'
  })
);
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
  })
);

// Route middlewares
app.use('/api/auth', authRoute);
app.use('/api/sensors', sensorRoute);
app.use('/api/user', userRoute);

//app.use(express.static(path.join(__dirname, 'public')));

// Connect to database
mongoose.connect(
  'mongodb+srv://testuser:passu123@citybike-data-gsnal.mongodb.net/iot',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('Connected to MongoDB!')
);

app.listen(3000, () => {
  console.log('Server running at 3000!');
});
