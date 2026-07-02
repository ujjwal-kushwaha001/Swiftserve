const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const User = require('../models/User');
const Booking = require('../models/Booking');

// @route   POST api/services
// @desc    Add a service to provider profile
// @access  Private (Needs Middleware!)
router.post('/',auth, async (req, res)=>{

    try {
        const { serviceName, price, duration } = req.body;
    
    // Find the user by the ID we stored in the middleware (req.user)
    const user = await User.findById(req.user);

    const newService = { serviceName, price, duration };
    user.services.push(newService);

    await user.save();
    res.json(user.services);

    } catch (error) {
        console.error(err.message);
    res.status(500).send('Server Error');
    }
});

// @route   GET api/services
// @desc    Get all services for the logged-in provider
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    res.json({
      userId: user._id,
      services: user.services
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET api/services/public/:id
// @desc    Get a provider's services for the public
// @access  Public (No Auth Middleware here!)
router.get('/public/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('name businessName services');
    if (!user) return res.status(404).json({ msg: "Provider not found" });
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});


// @route   POST api/services/book
// @desc    Create a new booking
// @access  Public
router.post('/book', async (req, res) => {
  try {
    const { providerId, customerName, customerEmail, appointmentTime, serviceName,uniqueCode } = req.body;

    const newBooking = new Booking({
      providerId,
      customerName,
      customerEmail,
      appointmentTime,
      serviceName,
      uniqueCode  // We'll add this to the schema to track what they booked
    });

    await newBooking.save();
    res.json({ msg: "Booking successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});



// @route   GET api/services/bookings
// @desc    Get all bookings for the logged-in provider
// @access  Private
router.get('/my-bookings', auth, async (req, res) => {
  try {
    // Look for bookings where providerId matches the logged-in user's ID
    const bookings = await Booking.find({ providerId: req.user }).sort({ appointmentTime: 1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});




router.get('/all', async (req, res) => {
  try {
    // Fetch users who have actually added services, selecting only needed fields
    const providers = await User.find({ "services.0": { $exists: true } }).select('name businessName services');
    
    // Flatten the data so it's easy to map over on the frontend
    let allServices = [];
    providers.forEach(provider => {
      provider.services.forEach(service => {
        allServices.push({
          providerId: provider._id,
          businessName: provider.businessName || provider.name,
          serviceName: service.serviceName,
          price: service.price,
          duration: service.duration,
          serviceId: service._id
        });
      });
    });

    res.json(allServices);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;