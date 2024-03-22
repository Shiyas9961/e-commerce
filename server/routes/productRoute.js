const express = require('express')
const { getAllProducts, createProduct, getSingleProduct, updateProduct, deleteProduct, updatingReview, getReviews, deleteReview, getAdminAllProducts } = require('../controllers/productControllers')
const { verifyJWT, authorizedRoles } = require('../middlewares/authenticated')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const upload = multer({
    storage : multer.diskStorage({
        destination : (req, file, callBack) => {
            callBack(null, path.join(__dirname, '..', 'public', 'img', 'product'))
        },
        filename : (req, file, callBack) => {
            callBack(null, file.originalname)
        }
    })
})


router.route('/products').get(getAllProducts)
router.route('/product/:id').get(getSingleProduct)
router.route('/review').put(verifyJWT, updatingReview)
                           

//Admin                         
router.route('/admin/product/new').post(verifyJWT, authorizedRoles("admin") , upload.array('images') , createProduct) 
router.route('/admin/products').get(verifyJWT, authorizedRoles("admin"), getAdminAllProducts)
router.route('/admin/product/:id').delete(verifyJWT, authorizedRoles("admin"), deleteProduct)                           
router.route('/admin/product/:id').put(verifyJWT, authorizedRoles("admin"), upload.array('images'),  updateProduct)
router.route('/admin/reviews').get(verifyJWT, authorizedRoles("admin"),getReviews) 
router.route('/admin/review').delete(verifyJWT, authorizedRoles("admin"), deleteReview)


module.exports = router