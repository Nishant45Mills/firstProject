const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    email: {

        type: String,
        required: [true, 'please enter email']
    },
    otp: {
        type: String,
    }
}, {

    timestamps: true
})

module.exports = mongoose.model('User', userSchema);