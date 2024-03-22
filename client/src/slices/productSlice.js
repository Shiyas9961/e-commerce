import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : false,
    product : {},
    reviews : [],
    isReviewSubmited : false,
    isProductCreated : false,
    isProductDeleted : false,
    isProductEdited : false,
    isReviewDeleted : false
}

const productSlice = createSlice({
    name : 'product',
    initialState,
    reducers : {
        productRequest : (state, action) => {
            return {
                loading : true
            }
        },
        productSuccess : (state, action) => {
            return {
                loading : false,
                product : action.payload.product
            }
        },
        productFail : (state, action) => {
            return {
                loading : false,
                error : action.payload
            }
        },
        createReviewRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        createReviewSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                isReviewSubmited : true
            }
        },
        createReviewFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        clearProductError : (state, action) => {
            return {
                ...state,
                error : null
            }
        },
        clearReviewSubmitted : (state, action) => {
            return {
                ...state,
                isReviewSubmited : false
            }
        },
        newProductRequest : ( state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        newProductSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                product : action.payload.product,
                isProductCreated : true
            }
        },
        newProductFail : (state, action) => {
            return {
                ...state,
                loading : false,
                isProductCreated : false,
                error : action.payload
            }
        },
        clearIsProductSubmitted : (state, action) => {
            return { 
                ...state,
                isProductCreated : false
            }
        },
        deleteProductRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        deleteProductSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                isProductDeleted : true
            }
        },
        deleteProductFail : (state, action) => {
            return {
                ...state,
                loading : false,
                isProductDeleted : false,
                error : action.payload
            }
        },
        clearIsDeleted : (state, action) => {
            return {
                ...state,
                isProductDeleted : false
            }
        },
        editProductRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        editProductSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                isProductEdited : true
            }
        },
        editProductFail : (state, action) => {
            return {
                loading : false,
                error : action.payload
            }
        },
        clearIsEdited : (state, action) => {
            return {
                ...state,
                isProductEdited : false
            }
        },
        getAllReviewsRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        getAllReviewsSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                reviews : action.payload.reviews
            }
        },
        getAllReviewsFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        deleteReviewRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        deleteReviewSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                isReviewDeleted : true
            }
        },
        deleteReviewFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        clearIsReviewDeleted : (state, action) => {
            return {
                ...state,
                isReviewDeleted : false
            }
        }
    }
})

export default productSlice.reducer

export const { 
    productRequest, 
    productSuccess, 
    productFail,
    createReviewRequest,
    createReviewSuccess,
    createReviewFail,
    clearProductError,
    clearReviewSubmitted,
    newProductRequest,
    newProductSuccess,
    newProductFail,
    clearIsProductSubmitted,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFail,
    clearIsDeleted,
    editProductRequest,
    editProductSuccess,
    editProductFail,
    clearIsEdited,
    getAllReviewsRequest,
    getAllReviewsSuccess,
    getAllReviewsFail,
    deleteReviewRequest,
    deleteReviewSuccess,
    deleteReviewFail,
    clearIsReviewDeleted
} = productSlice.actions