const express = require('express');
const app = express();
const authRoute = require('../routes/auth.route')

const routeData = [{

    path: '/auth',
    route: authRoute
}]

routeData.forEach((data) => {

    app.use(data.path, data.route);

});

module.exports = app;