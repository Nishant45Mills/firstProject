const express = require('express');
const { authController } = require('../controllers');
const app = express();

app.post('/register', authController.registerUser);
app.post('/verifyOtp', authController.verifyUserOtp);

module.exports = app;