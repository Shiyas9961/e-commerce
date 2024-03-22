import { addToCartRequest, addToCartSuccess } from '../slices/cartSlice'
import axios from 'axios'
import { BASE_URL } from '../baseUrl'

//Add to Cart
export const addToCart = (id, quantity) => {
    return async (dispatch) => {
        try{
            dispatch(addToCartRequest())

            const { data } = await axios.get(`${BASE_URL}/api/v1/product/${id}`)

            dispatch(addToCartSuccess({
                product : data.product._id,
                image : data.product.images[0].image,
                name : data.product.name,
                stock : data.product.stock,
                quantity,
                price : data.product.price
            }))
        }catch(error){
            console.log(error)
        }
    }
} 