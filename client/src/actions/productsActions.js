import axios from "axios";
import { productsRequest, productsSuccess, productsFail, adminProductsRequest, adminProductsSuccess } from "../slices/productsSlices";
import { BASE_URL } from "../baseUrl";
import { privateAxios } from '../baseAxios'

//Get All Products by filtering
export function getProducts(keyword, price, category, rating, currentPage){
    return async (dispatch) => {
        try{
            dispatch(productsRequest())

            let link = `${BASE_URL}/api/v1/products?page=${currentPage}`

            if(keyword){
                link += `&keyword=${keyword}`
            }

            if(price){
                link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
            }

            if(category){
                link += `&category=${category}`
            }

            if(rating){
                link += `&rating=${rating}`
            }

            const { data } = await axios.get(link)
            dispatch(productsSuccess(data))
        }catch(error){
            //Handle Errors
            console.log(error)
            if(error.message === "Network Error"){
                return dispatch(productsFail(error.message))
            }
            dispatch(productsFail(error.response.data.message))
        }
    }
}

//Get All Products : Admin
export function getAllProductsForAdmin () {
    return async function (dispatch) {
        try{
            dispatch(adminProductsRequest())

            const { data } = await privateAxios.get(`${BASE_URL}/api/v1/admin/products`)

            dispatch(adminProductsSuccess(data))
        }catch(error){
            //Handle Errro
        }
    }
}