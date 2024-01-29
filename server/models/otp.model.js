const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name: {

        type: String,
        required: [true, 'please add name']
    },

    phone: {

        type: String,
        required: [true, 'please enter phone number']
    },
    password: {

        type: String,
        required: [true, 'please enter Password']
    }
}, {

    timestamps: true
})

module.exports = mongoose.model('User', userSchema);