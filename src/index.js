const express = require('express');
const mongoose = require('mongoose');
const bookingRoutes = require('./routes/booking.routes');
const healthCheck = require('./routes/health.routes')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
(async () => {
   try {
     await mongoose.connect(process.env.MONGO_URI, {
       dbName: 'restaurant_bookings', // Specify the database name
     });
     console.log('Connected to MongoDB');
   } catch (err) {
     console.error('Error connecting to MongoDB:', err);
   }
 })();


app.get('/', (req, res) => res.send('Hello from Vercel!'));

 // Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/health', healthCheck);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;