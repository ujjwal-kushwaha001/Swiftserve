
// Routes
const authRoutes = require('./routes/auth')
const serviceRoutes = require('./routes/services');


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 1220;

// MiddleWares 
app.use(cors());
app.use(express.json())

app.use('/api/auth',authRoutes);
app.use('/api/services', serviceRoutes);


// Databse Connection 
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('MongoDB Connected'))
.catch((err)=> console.log('Getting Error to Connect DB',err)
)

// Test Route 
app.get('/',(req ,res)=>{
    res.send('Server is connected to DataBase!');
})


app.get('/',(req, res)=>{
    res.send('Server is Now Running!');
});

app.listen(PORT, ()=>{
    console.log(`Server Started on http://localhost:${PORT}`);
})