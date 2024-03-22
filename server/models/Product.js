const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name : {
        type : String,
        required : [ true, "Please enter product name" ],
        trim : true,
        maxLength : [ 100, "Product name cannot exceed 100 charecters" ]
    },
    price : {
        type : Number,
        default : 0.0
    },
    description : {
        type : String,
        required : [ true, "Please enter product description" ]
    },
    rating : {
        type : Number,
        default : 0
    },
    images : [
        {
            image : {
                type : String,
                required : true
            }
        }
    ],
    category : {
        type : String,
        required : [ true, "Please enter product category" ],
        enum : {
            values : [
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message : "Please select currect category"
        }
    },
    seller : {
        type : String,
        required : [ true, "Please enter product seller" ]
    },
    stock : {
        type : Number,
        required : [ true, "Please enter product stocks" ],
        maxLength : [ 20, "Produc stocks cannote exceed 20" ]
    },
    noOfReviews : {
        type : Number,
        default : 0
    },
    reviews : [
        {
            user : {
                type : mongoose.SchemaTypes.ObjectId,
                ref : 'User'
            },
            rating : {
                type : Number,
                required : true
            },
            comments : {
                type : String,
                required : true
            }
        }
    ],
    user : {
        type : mongoose.Types.ObjectId
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

module.exports = mongoose.model("Product", productSchema)