const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const cloudinary = require('cloudinary');
const User = require('../models/User');
const { useReducer } = require('react');
const { OAuth2Client } = require('google-auth-library');



// Register Route
router.post('/register', async (req, res)=>{

    try {
        const { name, email, password, location, businessName} = req.body;

        // 1. Check if user Already Exists
        let user = await User.findOne({email});
        if(user) return res.status(400).json({msg: "User Already Exists"});

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create and Save the User
        user = new User({
            name,
            email,
            password: hashedPassword,
            location,
            businessName
        });

        await user.save();
        res.status(201).json({msg: "User Registered Successfully"});

    } catch (error) {
        res.status(500).send("Server Error")
    }
});

// Login Route
router.post('/login', async (req, res)=>{
    try {
        
        const {email, password } = req.body;

        // 1. Check if user exists
        let user = await User.findOne({email})
        if(!user) return res.status(400).json({msg: "Invalid Credentials"});

        // 2. Compare passwords (Input vs Hashed in DB)
        const isMatch = await bcrypt.compare(password ,user.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid Credentials"});

        // 3. Create and Send the JWT Token
        const payload = {userId: user.id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h'});

        res.json({ token, user:{id: user.id, name:user.name, email: user.email}});
    } catch (error) {
        res.status(500).send("Server Error");
    }
})

router.get('/AllBusinessName',async(req,res)=>{

    try {
        const Provider = await User.find({"businessName.0" : {$exists:true}}).select('name businessName');

        let AllBusinessNames = [];
        Provider.forEach(prodiver =>{
            AllBusinessNames.push({
                prodiverName : prodiver.name,
                BusinessName : prodiver.businessName
            })
        });
        

        res.json(AllBusinessNames);

    } catch (error) {
        res.status(500).send('Server Error');
    }

})



const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ msg: "No token provided" });
  }

  try {
    // 1. Verify the token with Google's API
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // 2. Unpack the safe profile data payload from Google
    const { name, email, sub } = ticket.getPayload(); // 'sub' is Google's unique user ID string

    // 3. Check if user already exists in your MongoDB
    let user = await User.findOne({ email });

    if (!user) {
      // If user does not exist, seamlessly register them on the fly!
      user = new User({
        name: name,
        email: email,
        // Since they log in via Google, we can skip requiring a manual password
        password: jwt.sign({ googleId: sub }, process.env.JWT_SECRET), // Placeholder safe value
        services: [] // Default empty services array
      });
      await user.save();
    }

    // 4. Generate your own internal app JWT token so the auth middleware keeps working
    const payload = {
      user: user.id // Match whatever payload layout your existing 'auth' middleware expects
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'yourFallbackSecret', // Make sure this matches your .env secret
      { expiresIn: '5d' },
      (err, appToken) => {
        if (err) throw err;
        // Send our secure internal app token right back to the frontend
        res.json({ token: appToken });
      }
    );

  } catch (err) {
    console.error("Google token verification failed:", err.message);
    res.status(401).json({ msg: "Invalid Google token, authentication denied." });
  }
});

module.exports = router