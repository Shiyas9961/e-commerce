const expressAsyncHandler = require('express-async-handler')
const { allowedOrigins } = require('../config/allowedOrigin')

const credentials = expressAsyncHandler( async (req, res, next) => {
    const headerOrigin = req.headers.origin

    if(allowedOrigins.includes(headerOrigin)){
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()
})

module.exports = {
    credentials
}