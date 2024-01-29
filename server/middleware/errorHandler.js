const errorHandle = (err, req, res, next) => {

    let { statusCode, message } = err;
    res.status(statusCode).json({
        status: statusCode,
        message
    });

}

module.exports = errorHandle;