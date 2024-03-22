const { connecteDB } = require('../config/connenctDB')
const products = require('../data/products.json')
const Product = require('../models/Product')
require('dotenv').config()

connecteDB()

const addAllProducts = async () => {
    try{
        await Product.deleteMany()
        console.log("All Products deleted !")
        await Product.insertMany(products)
        console.log("Products Added !")
    }catch(error){
        console.log(error.message)
    }
    process.exit()
}

addAllProducts()