const ErrClass = require("../utils/errClass");
const { catchAsyncError } = require("./catchAsyncError");
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const verifyJWT = catchAsyncError( async (req, res, next) => {
    const { token } = req.cookies

    //console.log(token)

    if(!token){
        return next(new ErrClass("Login first unauthorized", 401))
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY)

    req.user = await User.findById(decode.id)
    
    next()
})

const authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrClass(`Role ${req.user.role} can't access this uri`, 401))
        }
        next()
    }
}

module.exports = {
    verifyJWT,
    authorizedRoles
}