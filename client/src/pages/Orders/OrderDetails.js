import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../../actions/orderActions'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../pages/Loader'

const OrderDetails = () => {

    const dispatch = useDispatch()
    const { id } = useParams()
    const { orderDetails : sigleOrder = {}, loading } = useSelector((state) => state.orderState)

    const { user = {}, shippingInfo = {}, paymentInfo = {}, orderItems = [] } = sigleOrder

    useEffect(() => {
        dispatch(getOrderDetails(id))
    }, [id])

    if(loading){
        return <Loader/>
    }

  return (
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">

                <h1 className="my-5">Order # {sigleOrder?._id}</h1>

                <h4 className="mb-4">Shipping Info</h4>
                <p><b>Name: </b> {user.username}</p>
                <p><b>Phone: </b>{shippingInfo.phoneNo}</p>
                <p className="mb-4"><b>Address:</b>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}</p>
                <p><b>Amount:</b> ${sigleOrder?.totalPrice}</p>

                <hr />

                <h4 className="my-4">Payment</h4>
                <p className={ paymentInfo.status && paymentInfo.status === 'succeeded' ? 'greenColor' : 'redColor'}><b>{ paymentInfo.status && paymentInfo.status === 'succeeded' ? 'PAID' : 'NOT PAID'}</b></p>


                <h4 className="my-4">Order Status:</h4>
                <p className={sigleOrder?.orderStatus && sigleOrder.orderStatus === 'Delivered' ? 'greenColor' : 'redColor'}><b>{sigleOrder?.orderStatus && sigleOrder.orderStatus === 'Delivered' ? 'Delivered' : 'Processing'}</b></p>


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
        </div>
  )
}

export default OrderDetails