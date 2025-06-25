const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs'); 

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

userSchema.pre('save', async function (next) {
    // 'this' refers to the user document that is about to be saved
  
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
      return next(); // If password isn't changed, move on
    }
  
    try {
      // Generate a "salt" - a random string to make the hash unique
      const salt = await bcrypt.genSalt(10); // 10 is the salt rounds - a good default
      // Hash the password using the generated salt
      this.password = await bcrypt.hash(this.password, salt);
      next(); // Proceed with saving the user
    } catch (error) {
      next(error); // If an error occurs, pass it on
    }
  });
  


//Creating a model for User
const User = mongoose.model('User' , userSchema)

// Exporting to be used somewhere else
module.exports = User;