const { catchAsyncError } = require("../middlewares/catchAsyncError");
const User = require("../models/User");
const ErrClass = require('../utils/errClass');
const { sendAuthRes } = require("../utils/sendAuthRes");
const { sendMail } = require("../utils/sendMail");
const crypto = require('crypto')

//Title - Register User
//Routes - /api/v1/register
//Req - POST
const registerUser = catchAsyncError(async (req, res) => {
  const { username, email, password } = req.body;

  let avatar;

  let BASE_URL = process.env.BACKEND_URL

  if(process.env.NODE_ENV === 'production'){
    BASE_URL = `${req.protocol}://${req.get('host')}`
  }

  if(req.file){
    avatar = `${BASE_URL}/public/img/user/${req.file.originalname}`
  }

  const user = await User.create({
    username,
    email,
    password,
    avatar
  });

  sendAuthRes(res, user, 201)
});


//Title - Login User
//Routes - /api/v1/login
//Req - POST
const loginUser = catchAsyncError( async (req, res, next) => {
      const { email, password } = req.body

      if(!email || !password){
        return next(new ErrClass("Enter email & password", 400))
      }

      const user = await User.findOne({ email }).select('+password')

      if(!user){
        return next(new ErrClass("Invalid Email & Password", 401))
      }

      const matchPwd = await user.verifyPwd(password)

      if(!matchPwd){
        return next(new ErrClass("Invalid Email & Password", 401))
      }

      const token = await user.getJWTToken()

      res.cookie('token', token, {
        httpOnly : true,
        secure : true,
        sameSite : 'none',
        maxAge : 7 * 24 * 60 * 60 * 1000
      })
      
      return res.status(200).json({
          success : true,
          user,
          token
      })
})


//Title - Logout User
//Routes - /api/v1/logout
//Req - GET
const logOut = catchAsyncError( async (req, res) => {
  res.cookie('token', null, {
    expires : new Date(Date.now()),
    httpOnly : true
  }).status(200).json({
    success : true,
    message : "Loggedout"
  })
})

//Title - Forgot Password
//Routes - /api/v1/password/forgot
//Req - POST
const forgotPassword = catchAsyncError( async (req, res, next) => {
    const { email } = req.body

    const user = await User.findOne({ email })

    if(!user){
      return next(new ErrClass("User not found with this email", 404))
    }

    const token = user.getResetPasswordToken()
    await user.save({ validateBeforeSave : false })

    let BASE_URL = process.env.FRONTEND_URL

    if(process.env.NODE_ENV === 'production'){
      BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    const resetUrl = `${BASE_URL}/password/reset/${token}`

    const message = `Your Password rest url as follows\n\n${resetUrl}\n\nIf you have not requested to this mail then ignore it`

    try{
      sendMail({
        email : user.email,
        subject : 'e-cart password recovery',
        message
      })

      res.status(200).json({
        success : true,
        message : `Email sent to ${user.email}`
      })

    }catch(error){
      user.resetPasswordToken = undefined
      user.resetPasswordTokenExpire = undefined
      await user.save({ validateBeforeSave : false })
      return next(new ErrClass(error.message, 500))
    }
})

//Title - Reset Password
//Routes - /api/v1/password/reset/:token
//Req - POST
const resetPassword = catchAsyncError( async (req, res, next) => {
  const { token } = req.params
  const { confirmPassword, password } = req.body

  const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')

  const user = await User.findOne(
    { 
      resetPasswordToken,
      resetPasswordTokenExpire : {
        $gt : Date.now()
      }
    })

  if(!user){
    return next(new ErrClass("Reset Password Token invalid or exipres", 400))
  }

  if(password !== confirmPassword){
    return next(new ErrClass("Password doest'nt match", 400))
  }

  user.password = password
  user.resetPasswordToken = undefined
  user.resetPasswordTokenExpire = undefined
  await user.save()

  sendAuthRes(res, user, 201)
})

//Title - Get Logged User
//Routes - /api/v1/myProfile
//Req - GET
const myProfile = catchAsyncError(async (req, res) => {
  const { id } = req.user

  //console.log(req.user.id)

  const user = await User.findById(id)

  res.status(200).json({
    success : true,
    user
  })
})

//Title - ChangePassword
//Routes - /api/v1/password/change
//Req - PUT
const changePassword = catchAsyncError( async (req, res, next) => {
  const { id } = req.user
  const { password, oldPassword } = req.body
  const user = await User.findById(id).select('+password')

  if(!await user.verifyPwd(oldPassword)){
    return next(new ErrClass("Incurrect Password. Try again", 401))
  }

  user.password = password
  await user.save()

  res.status(201).json({
    success : true,
    message : "Password Changed"
  })
})

//Title - ChangePassword
//Routes - /api/v1/password/change
//Req - PUT
const updateUserProfile = catchAsyncError( async (req, res) => {

  let dataForUpdate = {
    username : req.body.username,
    email : req.body.email
  }

  let avatar;

  let BASE_URL = process.env.BACKEND_URL

  if(process.env.NODE_ENV === 'production'){
    BASE_URL = `${req.protocol}://${req.get('host')}`
  }

  if(req.file){
    avatar = `${BASE_URL}/public/img/user/${req.file.originalname}`

    dataForUpdate = {
      ...dataForUpdate,
      avatar
    }
  }

  const user = await User.findByIdAndUpdate(req.user.id, dataForUpdate, {new : true, runValidators : true})

  res.status(201).json({
    success : true,
    user
  })
})

//Title - Admin : Get All User
//Routes - /api/v1/admin/user
//Req - GET
const getAllUsers = catchAsyncError( async (req, res) => {
  const users = await User.find()

  res.status(200).json({
    success : true,
    users
  })
})

//Title - Admin : Get Specific User
//Routes - /api/v1/admin/user/:id
//Req - GET
const getSpecificUser = catchAsyncError( async (req, res, next) => {
  const { id } = req.params

  const user = await User.findById(id)

  if(!user){
    return next(new ErrClass(`User did'not found with this ${id}`, 404))
  }

  res.status(200).json({
    success : true,
    user
  })
})

//Title - Admin : Update Specific User
//Routes - /api/v1/admin/user/:id
//Req - PUT
const updateSpecificUser = catchAsyncError( async (req, res) => {
  const { id } = req.params

  const updateData = {
    username : req.body.username,
    email : req.body.email,
    role : req.body.role
  }

  const newUser = await User.findByIdAndUpdate(id, updateData, { new : true, runValidators : true })

  res.status(201).json({
    success : true,
    newUser
  })
})

//Title - Admin : Delete Specific User
//Routes - /api/v1/admin/user/:id
//Req - DELETE
const deleteSpecificUser = catchAsyncError( async (req, res, next) => {
  const { id } = req.params

  const user = await User.findById(id)

  if(!user){
    return next(new ErrClass(`User did'not found with this ${id}`, 404))
  }

  await user.deleteOne()

  res.status(200).json({
    success : true,
    message : "User deleted successfully"
  })
})

module.exports = {
    registerUser,
    loginUser,
    logOut,
    forgotPassword,
    resetPassword,
    myProfile,
    changePassword,
    updateUserProfile,
    getAllUsers,
    getSpecificUser,
    updateSpecificUser,
    deleteSpecificUser
}