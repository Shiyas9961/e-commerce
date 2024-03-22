import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { clearIsUpdated, clearOrderError } from "../../../slices/orderSlice"
import { getOrderDetails, updateOrder } from "../../../actions/orderActions"
import { useParams, Link } from "react-router-dom"
import Sidebar from "../Sidebar"
import Loader from "../../Loader"

export default function EditOrder () {

    const { loading, error, isOrderUpdated, orderDetails = {} } = useSelector(state => state.orderState)
    const { user = {}, shippingInfo = {}, paymentInfo = {}, orderItems = [] } = orderDetails
    const dispatch = useDispatch()
    const { id : orderId } = useParams()
    const [orderStatus, setOrderStatus] = useState("Processing")

    useEffect(() => {
        if(error){
            toast(error, {
                type : 'error',
                position : 'top-center',
                onOpen : () => dispatch(clearOrderError())
            })
            return
        }
        if(isOrderUpdated){
            toast("Order staus updated successfully", {
                type : 'success',
                position : 'top-center',
                onOpen : () => dispatch(clearIsUpdated())
            })
            return
        }
        dispatch(getOrderDetails(orderId))
    }, [dispatch, error, isOrderUpdated, orderId])

    useEffect(() => {
        if(orderDetails._id){
            setOrderStatus(orderDetails.orderStatus)
        }
    },[orderDetails])

    const handleStatusClick = () => {
        const orderData = {}

        orderData.orderStatus = orderStatus
        dispatch(updateOrder(orderId, orderData))
    }

    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar/>
            </div>
            {
                loading ? <Loader/> : (
                        <div className="col-12 col-md-10">
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-8 mt-5 order-details">
                                    <h1 className="my-5">Order # {orderDetails?._id}</h1>

                                    <h4 className="mb-4">Shipping Info</h4>
                                    <p><b>Name: </b> {user.username}</p>
                                    <p><b>Phone: </b>{shippingInfo.phoneNo}</p>
                                    <p className="mb-4"><b>Address:</b>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}</p>
                                    <p><b>Amount:</b> ${orderDetails?.totalPrice}</p>

                                    <hr />

                                    <h4 className="my-4">Payment</h4>
                                    <p className={ paymentInfo.status && paymentInfo.status === 'succeeded' ? 'greenColor' : 'redColor'}><b>{ paymentInfo.status && paymentInfo.status === 'succeeded' ? 'PAID' : 'NOT PAID'}</b></p>


                                    <h4 className="my-4">Order Status:</h4>
                                    <p className={orderDetails?.orderStatus && orderDetails.orderStatus === 'Delivered' ? 'greenColor' : 'redColor'}><b>{orderDetails.orderStatus}</b></p>


                                    <h4 className="my-4">Order Items:</h4>

                                    <hr />
                                    {
                                        orderItems.map(item => (
                                                <div className="cart-item my-1" key={item.product}>
                                                    <div className="row my-5">
                                                        <div className="col-4 col-lg-2">
                                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                                        </div>

                                                        <div className="col-5 col-lg-5">
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </div>


                                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                            <p>${item.price}</p>
                                                        </div>

                                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                            <p>{item.quantity} Piece(s)</p>
                                                        </div>
                                                    </div>
                                                </div>
                                        ))
                                    }
                                    <hr />
                                </div>
                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Order Status</h4>
                                    <div className="form-group">
                                        <select  
                                            value={orderStatus} 
                                            onChange={(event) => setOrderStatus(event.target.value)} 
                                            name="status"
                                            className="form-control"
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </div>
                                    <button className="btn btn-primary btn-block" disabled={loading} onClick={handleStatusClick}>Change Status</button>
                                </div>
                            </div>   
                        </div> 
                )
            }
                
        </div>
    )
}