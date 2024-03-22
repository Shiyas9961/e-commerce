import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : false,
    items : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    shippingInfo : localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
}


const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        addToCartRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        addToCartSuccess : (state, action) => {
            const productObj = action.payload

            const isItemAlreadyIn = state.items.find(item => item.product === productObj.product)

            let newState;

            if(isItemAlreadyIn){
                newState = {
                    ...state,
                    loading : false
                }
            }else{
                newState = {
                    items : [...state.items, productObj],
                    loading : false
                }
            }
            localStorage.setItem('cartItems', JSON.stringify(newState.items))
            return newState
        },
        increaseCartQty : (state, action) => {
            state.items = state.items.map(item => {
                if(item.product === action.payload){
                    item.quantity = item.quantity + 1
                }
                return item
            })
        },
        decreseCartQty : (state, action) => {
            state.items = state.items.map(item => {
                if(item.product === action.payload){
                    item.quantity = item.quantity - 1
                }
                return item
            })
        },
        removeProductFromCart : (state, action) => {
            const filteredItems = state.items.filter(item => {
                return item.product !== action.payload
            })

            localStorage.setItem('cartItems', JSON.stringify(filteredItems))

            return {
                ...state,
                items : filteredItems
            }
        },
        addShippingDetails : (state, action) => {
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload))

            return {
                ...state,
                shippingInfo : action.payload
            }
        },
        completedOrder : (state, action) => {
            localStorage.removeItem('shippingInfo')
            localStorage.removeItem('cartItems')
            sessionStorage.removeItem('orderInfo')

            return {
                loading : false,
                shippingInfo : {},
                items : []
            }
        }
    }
})

export default cartSlice.reducer

export const { 
    addToCartRequest, 
    addToCartSuccess, 
    increaseCartQty, 
    decreseCartQty, 
    removeProductFromCart,
    addShippingDetails,
    completedOrder 
} = cartSlice.actions