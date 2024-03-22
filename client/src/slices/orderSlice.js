import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newOrder : {},
    userOrders : [],
    adminOrders : [],
    loading : false,
    isOrderUpdated : false,
    isOrderDeleted : false
}

const orderSlice = createSlice({
    name : 'order',
    initialState,
    reducers : {
        createOrderRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        createOrderSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                newOrder : action.payload.order
            }
        },
        createOrderFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        clearOrderError : (state, action) => {
            return {
                ...state,
                error : null
            }
        },
        myOrdersRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        myOrdersSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                userOrders : action.payload.orders
            }
        },
        myOrdersFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        orderDetailsRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        orderDetailsSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                orderDetails : action.payload.order
            }
        },
        orderDetailsFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        adminOrderRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        adminOrderSuccess : (state, action) => {
            return {
                ...state,
                adminOrders : action.payload.orders,
                loading : false
            }
        },
        adminOrderFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        updateOrderRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        updateOrderSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                isOrderUpdated : true
            }
        },
        updateOrderFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        clearIsUpdated : (state, action) => {
            return {
                ...state,
                isOrderUpdated : false
            }
        },
        deleteOrderRequest : (state, action) => {
            return {
                ...state,
                loading : true
            }
        },
        deleteOrderSuccess : (state, action) => {
            return {
                ...state,
                loading : false,
                isOrderDeleted : true
            }
        },
        deleteOrderFail : (state, action) => {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
        clearIsDeleted : (state, action) => {
            return {
                ...state,
                isOrderDeleted : false
            }
        }
    }
})

export default orderSlice.reducer

export const {
    createOrderRequest,
    createOrderSuccess,
    createOrderFail,
    clearOrderError,
    myOrdersRequest,
    myOrdersSuccess,
    myOrdersFail,
    orderDetailsRequest,
    orderDetailsSuccess,
    orderDetailsFail,
    adminOrderRequest,
    adminOrderSuccess,
    adminOrderFail,
    updateOrderRequest,
    updateOrderSuccess,
    updateOrderFail,
    clearIsUpdated,
    deleteOrderRequest,
    deleteOrderSuccess,
    deleteOrderFail,
    clearIsDeleted
} = orderSlice.actions