const express = require('express')
const { registerUser, loginUser, logOut, forgotPassword, resetPassword, myProfile, changePassword, updateUserProfile, getAllUsers, getSpecificUser, updateSpecificUser, deleteSpecificUser } = require('../controllers/authControllers')
const { verifyJWT, authorizedRoles } = require('../middlewares/authenticated')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const upload = multer({
    storage : multer.diskStorage({
        destination : function(req, file, callBack) {
            callBack(null, path.join(__dirname, '..', 'public', 'img', 'user'))
        },
        filename : function (req, file, callBack) {
            callBack(null, file.originalname)
        }
    })
})

router.route('/register').post(upload.single('avatar'), registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logOut)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').post(resetPassword)
router.route('/password/change').put(verifyJWT, changePassword)
router.route('/myProfile').get(verifyJWT, myProfile)
router.route('/update').put(verifyJWT, upload.single('avatar'), updateUserProfile)

//Admin
router.route('/admin/users').get(verifyJWT, authorizedRoles("admin") , getAllUsers)
router.route('/admin/user/:id').get(verifyJWT, authorizedRoles("admin") , getSpecificUser)
                                .put(verifyJWT, authorizedRoles("admin"), updateSpecificUser)
                                .delete(verifyJWT, authorizedRoles("admin"), deleteSpecificUser)

module.exports = router