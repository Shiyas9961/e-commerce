const { catchAsyncError } = require("../middlewares/catchAsyncError");
const Order = require('../models/Order');
const ErrClass = require("../utils/errClass");
const Product = require('../models/Product')

//Title - Create Order
//Routes - /api/v1/order/new
//Req - POST
const newOrder = catchAsyncError( async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt : Date.now(),
        user : req.user.id
    })

    res.status(201).json({
        success : true,
        order
    })
})

//Title - Get Single Order
//Routes - /api/v1/order/:id
//Req - GET
const getSingleOrder = catchAsyncError( async (req, res, next) => {
    const { id } = req.params

    const order = await Order.findById(id).populate('user', 'username email')

    if(!order){
        return next(new ErrClass(`Order not found with ${id} id`, 404))
    }

    res.status(200).json({
        success : true,
        order
    })
})

//Title - Get Order By Logged User
//Routes - /api/v1/myorders
//Req - GET
const getOrderByLoggedUser = catchAsyncError( async (req, res) => {
    const orders = await Order.find({ user : req.user.id })

    res.status(200).json({
        success : true,
        orders
    })
})

//Title - Admin : Get All Orders
//Routes - /api/v1/admin/orders
//Req - GET
const getAllOrders = catchAsyncError( async(req, res) => {
    const orders = await Order.find()

    let totalAmount = 0

    orders.forEach(item => totalAmount += item.totalPrice)

    res.status(200).json({
        success : true,
        totalAmount,
        orders
    })
})

//Title - Update Order
//Routes - /api/v1/admin/orders/:id
//Req - PUT
const updateOrder = catchAsyncError( async (req, res, next) => {
    const { id } = req.params

    const order = await Order.findById(id)

    if(!order){
        return next(new ErrClass("Order did'not find with this id", 404))
    }

    if(order.orderStatus === 'Delivered'){
        return next(new ErrClass("Order has been already delivered", 400))
    }

    order.orderItems.forEach(item => {
        updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.orderStatus
    await order.save({ validateBeforeSave : false })

    res.status(200).json({
        success : true,
        message : "Order delivered"
    })

})

async function updateStock (productId, quantity) {
    const product = await Product.findById(productId)

    product.stock = product.stock - quantity
    await product.save({validateBeforeSave : false})
}

//Title - Delete Order
//Routes - /api/v1/admin/orders/:id
//Req - DELETE
const deleteOrder = catchAsyncError( async (req, res, next) => {
    const { id } = req.params

    const order = await Order.findById(id)

    if(!order){
        return next(new ErrClass("Order did'not find with this id", 404))
    }

    await order.deleteOne()

    res.status(200).json({
        success : true,
        message : "Order deleted successfully"
    })
})

module.exports = {
    newOrder,
    getSingleOrder,
    getOrderByLoggedUser,
    getAllOrders,
    updateOrder,
    deleteOrder
}