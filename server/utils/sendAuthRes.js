const sendAuthRes = (res, user, statusCode) => {

    const token = user.getJWTToken()

    const options = {
        expires : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ,
        httpOnly : true,
    }

    res.cookie('token', token, {})
    
    return res.status(statusCode).json({
        success : true,
        user,
        token
    })
}

module.exports = {
    sendAuthRes
}