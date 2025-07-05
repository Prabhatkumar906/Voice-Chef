// backend/server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); // <-- IMPORT our connection function
const cors = require('cors');


// Connect to Database
connectDB(); // <-- RUN the connection function

const app = express();


// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',         // For local frontend testing
  'https://voicechef1.vercel.app', // Your deployed frontend on Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS not allowed from this origin: ' + origin), false);
    }
  },
  credentials: true,
}));


app.use(express.json());  
// Define Routes`
app.use('/api/auth', require('./routes/auth'));

app.use('/api/recipes', require('./routes/recipes'));

app.use('/api/cookbook', require('./routes/cookbook'));

app.use('/api/user', require('./routes/user'));

app.use('/api/ai', require('./routes/ai')); 


const PORT = process.env.PORT || 5000;

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running successfully on port ${PORT}`);
});

