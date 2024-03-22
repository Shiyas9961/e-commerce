import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import productsReducer from './slices/productsSlices'
import productReducer from './slices/productSlice'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'
import orderReducer from './slices/orderSlice'
import usersReducer from './slices/usersSlice'


const reducer = combineReducers({
    productsState : productsReducer,
    productState : productReducer,
    authState : authReducer,
    cartState : cartReducer,
    orderState : orderReducer,
    usersState : usersReducer
})

export const store = configureStore({
        reducer,
        middleware : () => (
            [thunk]
        )
    })