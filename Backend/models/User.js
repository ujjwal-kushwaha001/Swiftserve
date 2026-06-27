const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true, unique : true},
    password : {type: String, required: true},
    businessName : {type: String, required: true},
    location : {type: String, required: true},
    services: [
        {
            serviceName: String,
            price: Number,
            duration: Number,  // in Minutes
        }
    ]
}, {timestamps: true});

module.exports = mongoose.model('User', UserSchema);