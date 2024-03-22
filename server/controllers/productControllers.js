const Product = require('../models/Product')
const ErrClass = require('../utils/errClass')
const { catchAsyncError } = require('../middlewares/catchAsyncError')
const { ApiFeatures } = require('../utils/apiFeatures')
const asyncHandler = require('express-async-handler')

//Title - GetAllProducts
//Routes - api/v1/products
//Req - GET
const getAllProducts = asyncHandler( async ( req, res, next ) => {

    const resultPerPage = 3

    let buildQuery = () => {
        return new ApiFeatures(Product.find(), req.query).search().filter()
    }

    const filteredProducts = await buildQuery().query.countDocuments()
    const totalProductsCount = await Product.countDocuments()

    let countProducts = totalProductsCount

    if(filteredProducts !== totalProductsCount){
        countProducts = filteredProducts
    }

    const products = await buildQuery().pagination(resultPerPage).query

    res.cookie('hello', "Hello world!", { httpOnly : true, sameSite : 'none' })

    res.status(201).json({
        suceess : true,
        count : products.length,
        products,
        totalProductsCount : countProducts,
        resultPerPage
    })
})

//Title - Admin : Create Product 
//Routes - /api/v1/product/new
//Req - POST
const createProduct = catchAsyncError( async (req, res, next) => {

    let images = []
    req.body.user = req.user.id

    let BASE_URL = process.env.BACKEND_URL

    if(process.env.NODE_ENV === 'production'){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.files.length > 0){
        req.files.forEach(file => {
            let url = `${BASE_URL}/public/img/product/${file.originalname}`

            images.push({ image : url })
        })
    }

    req.body.images = images

    const product = await Product.create(req.body)
    res.status(201).json({
        success : true,
        product
    })
})

//Title - Get Single Product
//Routes - /api/v1/product/:id
//Reg - GET
const getSingleProduct = catchAsyncError( async (req, res, next) => {
    const { id } = req. params

    const product = await Product.findById(id).populate('reviews.user', 'username email')

    if(!product){
        return next(new ErrClass("Product not found", 404))
    }

    res.status(201).json({
        success : true,
        product
    })
})

//Title - Update Product
//Routes - /api/v1/product/:id
//Req - PUT
const updateProduct = catchAsyncError( async (req, res, next) => {
    const { id } = req.params

    const product = await Product.findOne({ _id : id })

    if(!product){
        return next(new ErrClass("Product not found", 404))
    }

    let images = []

    if(req.body.isImagesCleared === 'false'){
        images = product.images
    }

    let BASE_URL = process.env.BACKEND_URL

    if(process.env.NODE_ENV === 'production'){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.files.length > 0){
        req.files.forEach(file => {
            let url = `${BASE_URL}/public/img/product/${file.originalname}`

            images.push({ image : url })
        })
    }

    req.body.images = images

    const chngProduct = await Product.findByIdAndUpdate(id, req.body, { new : true, runValidators : true })
    
    res.status(201).json({
        success : true,
        chngProduct
    })
})

//Title - Delete Product
//Routes - /api/v1/product/:id
//Reg - DELETE
const deleteProduct = catchAsyncError( async (req, res, next) => {
    const { id } = req.params

    const product = await Product.findOne({ _id : id })

    if(!product){
        return next(new ErrClass("Product not found", 404))
    }

    await product.deleteOne()

    return res.status(200).json({
        success : true,
        message : "Product deleted"
    })
})

//Title - Updating or Adding review
//Routes - /api/v1/product/review
//Reg - PUT
const updatingReview = catchAsyncError( async (req, res, next) => {
    const { productId, comments, rating } = req.body
    
    const product = await Product.findById(productId)

    if(!product){
        return next(new ErrClass("Product not found", 404))
    }

    const alreadyRev = product.reviews.find(item => item.user.toString() === req.user.id.toString())

    if(alreadyRev){
        product.reviews.forEach(item => {
            if(item.user.toString() === req.user.id.toString()){
                item.comments = comments
                item.rating = rating
            }
        })
    }else{
        product.reviews.push({
            comments,
            rating,
            user : req.user.id
        })
        product.noOfReviews = product.reviews.length
    }

    product.rating = product.reviews.reduce((acc, rev) => rev.rating + acc, 0) / product.reviews.length

    product.rating = isNaN(product.rating) ? 0 : product.rating

    await product.save({validateBeforeSave : false})

    res.status(200).json({
        success : true,
        message : "Review Updated"
    })
})

//Title - Get All reviews
//Routes - /api/v1/product/reviews?id=hgscjyst2csg7sstys
//Req - GET
const getReviews = catchAsyncError( async (req, res, next) => {
    const { id } = req.query

    const product = await Product.findById(id).populate('reviews.user', 'username email')

    if(!product){
        return next(new ErrClass("Product not found", 404))
    }

    res.status(200).json({
        success : true,
        reviews : product.reviews
    })
})

//Title - Delete Review
//Routes - /api/v1/product/review?id=b7s3rfvf276257yvx&productId=sbliufsi6sf672sdf
//Req - DELETE
const deleteReview = catchAsyncError( async (req, res) => {
    const { productId, id } = req.query

    const product = await Product.findById(productId)

    if(!product){
        return next(new ErrClass("Product not found", 404))
    }

    const restReviews = product.reviews.filter(item => {
        return item._id.toString() !== id
    })

    const noOfReviews = restReviews.length

    let rating = restReviews.reduce((acc, rev) => rev.rating + acc, 0) / noOfReviews

    rating = isNaN(rating) ? 0 : rating

    await Product.findByIdAndUpdate(productId, {
        rating,
        noOfReviews,
        reviews : restReviews
    })

    res.status(200).json({
        success : true,
        message : "Review deleted successfully"
    })
})

//Title - Admin : Get All Products
//Routes - /api/v1/admin/products
//Req - GET
const getAdminAllProducts = catchAsyncError( async (req, res, next) => {
    const products = await Product.find()

    res.status(200).json({
        success : true,
        products
    })
})

module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    updatingReview,
    getReviews,
    deleteReview,
    getAdminAllProducts
}