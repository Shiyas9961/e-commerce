const ErrClass = require("../utils/errClass")
const { allowedOrigins } = require("./allowedOrigin")

const corsOptions = {
    origin : (origin, callBack) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callBack(null, true)
        }else{
            callBack(new ErrClass("Not Allowed by CORS", 400))
        }
    },
    optionsSuccessStatus : 200
}

module.exports = {
    corsOptions
}