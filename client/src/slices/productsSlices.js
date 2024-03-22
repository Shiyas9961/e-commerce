import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : false
}

const productsSlice = createSlice({
    name : 'products',
    initialState,
    reducers : {
        productsRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        productsSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                products : action.payload.products,
                totalProductsCount : action.payload.totalProductsCount,
                resultPerPage : action.payload.resultPerPage
            }
        },
        productsFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        adminProductsRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        adminProductsSuccess : (state, action) => {
            return  {
                ...state,
                loading : false,
                products : action.payload.products
            }
        },
        adminProductsFail : (state, action) => {
            return {
                ...state, 
                loading : false,
                error : action.payload
            }
        },
        clearError : (state, action) => {
            return {
                ...state,
                error : null
            }
        }
    }
})

export default productsSlice.reducer

export const { 
        productsRequest, 
        productsSuccess, 
        productsFail,
        adminProductsRequest,
        adminProductsSuccess,
        adminProductsFail,
        clearError
    } = productsSlice.actions