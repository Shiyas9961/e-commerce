import axios from "axios"
import { productRequest, productSuccess, productFail, createReviewRequest, createReviewSuccess, createReviewFail, newProductFail, newProductRequest, newProductSuccess, deleteProductFail, deleteProductRequest, deleteProductSuccess, editProductFail, editProductRequest, editProductSuccess, getAllReviewsRequest, getAllReviewsFail, getAllReviewsSuccess, deleteReviewFail, deleteReviewSuccess } from "../slices/productSlice"
import { BASE_URL } from "../baseUrl"
import { privateAxios } from "../baseAxios"

//Get Single Product by Id
export function getProduct(id){
    return async function (dispatch){
        try{
            dispatch(productRequest())
            const { data } = await axios.get(`${BASE_URL}/api/v1/product/${id}`)
            //console.log("getting product")
            dispatch(productSuccess(data))
        }catch(error){
            //Handle Error
            if(error.message === "Network Error"){
                return dispatch(productFail(error.message))
            }
            dispatch(productFail(error.response.data.message))
        }
    }
} 

//Create Review in Product details page
export function createReviewAction (reviewData) {
    return async function (dispatch) {
        try{
            dispatch(createReviewRequest())

            await privateAxios.put(`${BASE_URL}/api/v1/review`, reviewData, { headers : { 'Content-Type' : 'application/json' } })

            dispatch(createReviewSuccess())
        }catch(error){
            //Handle Error
            dispatch(createReviewFail(error.response.data.message))
        }
    }
}

//Create new Product : Admin
export function createNewProduct (productData) {
    return async function (dispatch) {
        try{
            dispatch(newProductRequest())

            const { data } = await privateAxios.post(`${BASE_URL}/api/v1/admin/product/new`, productData, { headers : { 'Content-Type' : 'multipart/form-data' } })

            dispatch(newProductSuccess(data))
        }catch(error){
            //Handle Error
            dispatch(newProductFail(error.response.data.message))
        }
    }
}

//Delete Product : Admin
export function deleteProduct (id) {
    return async function (dispatch) {
        try{
            dispatch(deleteProductRequest())

            await privateAxios.delete(`${BASE_URL}/api/v1/admin/product/${id}`)

            dispatch(deleteProductSuccess())
        }catch(error){
            //Handle Error
            dispatch(deleteProductFail(error.response.data.message))
        }
    }
}

//Edit Product : Admin
export function editProduct (id, productData) {
    return async function (dispatch) {
        try{
            dispatch(editProductRequest())

            await privateAxios.put(`${BASE_URL}/api/v1/admin/product/${id}`, productData, { headers : { 'Content-Type' : 'multipart/form-data' } })

            dispatch(editProductSuccess())
        }catch(error){
            dispatch(editProductFail(error.response.data.message))
        }
    }
}

//Get All Reviews by Product id : Admin
export const getAllReviewsByProduct = (productId) => {
    return async (dispatch) => {
        try{
            dispatch(getAllReviewsRequest())

            const { data } = await privateAxios.get(`${BASE_URL}/api/v1/admin/reviews`, { params : { id : productId } })

            dispatch(getAllReviewsSuccess(data))
        }catch(error){
            dispatch(getAllReviewsFail(error.response.data.message))
        }
    }
}

//Delete Review : Admin
export const deleteReview = (reviewId, productId) => {
    return async (dispatch) => {
        try{
            dispatch(deleteProductRequest())

            await privateAxios.delete(`${BASE_URL}/api/v1/admin/review`, { params : { id : reviewId, productId } })

            dispatch(deleteReviewSuccess())
        }catch(error){
            dispatch(deleteReviewFail(error.response.data.message))
        }
    }
}