const ErrClass = require('../utils/errClass')

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500

    if(process.env.NODE_ENV == 'development'){
        res.status(err.statusCode).json({
            success : false,
            message : err.message,
            stack : err.stack,
            err
        })
    }
    if(process.env.NODE_ENV == 'production'){

        let message = err.message
        let error = new ErrClass(message, err.statusCode)

        if(err.name === "ValidationError"){
            message = Object.values(err.errors).map(val => val.message)
            error = new ErrClass(message, 400)
        }

        if(err.name === "CastError"){
            message = `Resources not found : ${err.path}`
            error = new ErrClass(message, 404)
        }

        if(err.code === 11000){
            message = `Duplicate ${Object.keys(err.keyValue)} address`
            error = new ErrClass(message, 401)
        }

        if(err.name === 'JSONWebTokenError'){
            message = "JSON Web Token invalid. Try again"
            error = new ErrClass(message, 401)
        }

        if(err.name === 'TokenExpiredError'){
            message = "JSON Web Token expired. Try again"
            error = new ErrClass(message, 401)
        }

        res.status(error.statusCode).json({
            success : false,
            message : error.message || 'Internal server error'
        })
    }
}

module.exports = {
    errorHandler
}