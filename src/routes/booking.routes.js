const express = require('express');
const router = express.Router();
const Booking = require('../models/bookings.model');

 // Create a new booking
router.post('/', async (req, res) => {
  const { date, time, guests, name, contact } = req.body;

  try {
    // Validate time
    const [hours, minutes] = time.split(':').map(Number);
    if (hours < 10 || hours > 22 || (hours === 22 && minutes > 0)) {
      return res.status(400).json({ message: 'Time must be between 10:00 AM and 10:00 PM' });
    }
    if(contact.length < 10){
      return res.status(400).json({ message: 'Enter a Valid Contact' });
    }

    // Check for existing booking at the same date and time
    const existingBooking = await Booking.findOne({ date, time });
    if (existingBooking) {
      return res.status(400).json({ message: 'This time slot is already booked.' });
    }

    const booking = new Booking({ date, time, guests, name, contact });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
});


router.get('/', async (req, res) => {
  const { contact } = req.query;

  try {
    const bookings = await Booking.find({ contact });
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this contact number.' });
    }
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
});



module.exports = router;
