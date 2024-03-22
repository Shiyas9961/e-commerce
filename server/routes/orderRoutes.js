const express = require('express')
const { verifyJWT, authorizedRoles } = require('../middlewares/authenticated')
const { newOrder, getSingleOrder, getOrderByLoggedUser, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderControllers')
const router = express.Router()

router.route('/order/new').post(verifyJWT, newOrder)
router.route('/order/:id').get(verifyJWT, getSingleOrder)
router.route('/myorders').get(verifyJWT, getOrderByLoggedUser)

//Admin
router.route('/admin/orders').get(verifyJWT, authorizedRoles("admin"), getAllOrders)
router.route('/admin/order/:id').put(verifyJWT, authorizedRoles("admin"), updateOrder)
                                .delete(verifyJWT, authorizedRoles("admin"), deleteOrder)

module.exports = router