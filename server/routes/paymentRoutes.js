const express = require('express')
const { verifyJWT } = require('../middlewares/authenticated')
const { processPayment, sendStripApi } = require('../controllers/paymentControllers')
const router = express.Router()

router.route('/payment/process').post(verifyJWT, processPayment)
router.route('/stripeapi').get(verifyJWT, sendStripApi)

module.exports = router