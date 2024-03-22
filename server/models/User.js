const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const usersScehema = new Schema({
    username : {
        type : String,
        required : [true, "Please enter Username"]
    },
    email : {
        type : String,
        required : [true, "Please enter Email"],
        unique : true,
        validate : [validator.isEmail, "Please enter valid email address"]
    },
    password : {
        type : String,
        required : [true, "Please enter password"],
        validate : [validator.isStrongPassword, "Password must be contain number, letter & symbols should be 8 charecters"],
        select : false
    },
    resetPasswordToken : String,
    resetPasswordTokenExpire : Date,
    avatar : {
        type : String,    
    },
    role : {
        type : String,
        default : "user"
    },
    createAt : {
        type : Date,
        default : Date.now()
    }
})

usersScehema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

usersScehema.methods.getJWTToken = function () {
    return jwt.sign({ id : this._id }, process.env.SECRET_KEY, { expiresIn : '10d' })
}

usersScehema.methods.verifyPwd = async function (enteredPwd){
    return await bcrypt.compare(enteredPwd, this.password)
}

usersScehema.methods.getResetPasswordToken = function () {

    //Setting random string as a Token
    const token = crypto.randomBytes(20).toString('hex')

    //Setting hashed Token string as a resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')

    //Setting Token Expire time at database
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000

    return token
}

module.exports = mongoose.model("User", usersScehema)