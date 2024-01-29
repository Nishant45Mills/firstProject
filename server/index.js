const express = require('express');
const route = require('./routes');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandle = require('./middleware/errorHandler');
require('dotenv').config();

app.use(express.json());

app.use(cors());

app.use('/', route);

app.use(errorHandle);

mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true }).then((data) => {

    console.log("db connected successfully");

    app.listen(process.env.PORT, () => {

        console.log("server is listen on port: " + process.env.PORT);
    })

})
