import { privateAxios } from "../baseAxios"
import { BASE_URL } from "../baseUrl"
import { 
    adminOrderFail,
    adminOrderRequest,
    adminOrderSuccess,
    createOrderFail, 
    createOrderRequest, 
    createOrderSuccess, 
    deleteOrderFail, 
    deleteOrderRequest, 
    deleteOrderSuccess, 
    myOrdersFail, 
    myOrdersRequest,
    myOrdersSuccess,
    orderDetailsFail,
    orderDetailsRequest,
    orderDetailsSuccess,
    updateOrderFail,
    updateOrderRequest,
    updateOrderSuccess
} from "../slices/orderSlice"

export const createNewOrder = (orderData) => {
    return async (dispatch) => {
        try{
            dispatch(createOrderRequest())

            const { data } = await privateAxios.post(`${BASE_URL}/api/v1/order/new`, orderData)

            dispatch(createOrderSuccess(data))
        }catch(error){
            //Handle Error
            dispatch(createOrderFail(error.response.data.message))
        }
    }   
}

export const getMyOrders = async (dispatch) => {
    try{
        dispatch(myOrdersRequest())

        const { data } = await privateAxios.get(`${BASE_URL}/api/v1/myorders`)
        dispatch(myOrdersSuccess(data))
    }catch(error){
        //Handle Error
        dispatch(myOrdersFail(error.response.data.message))
    }
}

export const getOrderDetails = (id) => {
    return async (dispatch) => {
        try{
            dispatch(orderDetailsRequest())
            
            const { data } = await privateAxios.get(`${BASE_URL}/api/v1/order/${id}`)

            dispatch(orderDetailsSuccess(data))
        }catch(error){
            //Handle Error  
            dispatch(orderDetailsFail(error.response.data.message))      
        }
    }
}

//Fetch Admin Orders
export function getAdminOrders () {
    return async function (dispatch){
        try{
            dispatch(adminOrderRequest())

            const { data } = await privateAxios.get(`${BASE_URL}/api/v1/admin/orders`)

            dispatch(adminOrderSuccess(data))
        }catch(error){
            dispatch(adminOrderFail(error.response.data.message))
        }
    }
}

//Delete Order : Admin
export const deleteOrder = (id) => {
    return async (dispatch) => {
        try{
            dispatch(deleteOrderRequest())

            await privateAxios.delete(`${BASE_URL}/api/v1/admin/order/${id}`)

            dispatch(deleteOrderSuccess())
        }catch(error){
            dispatch(deleteOrderFail(error.response.data.message))
        }
    }
}

//Update Order : Admin
export const updateOrder = (id, updateData) => {
    return async (dispatch) => {
        try{
            dispatch(updateOrderRequest())

            await privateAxios.put(`${BASE_URL}/api/v1/admin/order/${id}`, updateData)

            dispatch(updateOrderSuccess())
        }catch(error){
            dispatch(updateOrderFail(error.response.data.message))
        }
    }
}