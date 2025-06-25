const mongoose = require('mongoose')
const { Schema } = mongoose

// creating User schema 
const userSchema = new Schema({
    email: {
        type: String,
        require: [true, 'Email is Required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address.']
    },

    password: {
        type: String,
        require: [true, 'Password is Required']
    },

    shopify: {
        shopUrl: { type: String, trim: true },
        accessToken: { type: String } // Will be encrypted
    },

    couriers: [ // This defines an array of courier objects
        {
            name: { type: String, required: true },
            apiKey: { type: String, required: true }, // Will be encrypted
            accountNumber: { type: String },
            isActive: { type: Boolean, default: true }
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now // Sets the current date automatically on creation
    }
})

//Creating a model for User
const User = mongoose.Model('User' , userSchema)

// Exporting to be used somewhere else
module.exports = User;