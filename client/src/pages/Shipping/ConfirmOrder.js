import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ShippingStatus from './ShippingStatus'
import { validateShipping } from './Shipping'
import { Link, useNavigate } from 'react-router-dom'

const ConfirmOrder = () => {

    const { shippingInfo, items } = useSelector((state) => state.cartState)
    const { user } = useSelector((state) => state.authState)
    const navigate = useNavigate()
    const subTotalPrice = items.reduce((acc, item) => (acc += item.quantity * item.price), 0)
    const shippingPrice = subTotalPrice < 200 ? 0 : 20
    let taxPrice = 0.05 * subTotalPrice
    const totalPrice = Number((subTotalPrice + shippingPrice + taxPrice).toFixed(2))
    taxPrice = Number(taxPrice.toFixed(2))

    //console.log(items)

    useEffect(() => {
        validateShipping(shippingInfo, navigate)
    },[shippingInfo, navigate])


    const handleClick =() => {
        const paymentDetails = {
            subTotalPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(paymentDetails))
        navigate('/payment')
    }

  return (
    <Fragment>
        <ShippingStatus confirmOrder shipping/>
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-confirm">

                <h4 className="mb-3">Shipping Info</h4>
                <p><b>Name:</b>{user.username}</p>
                <p><b>Phone:</b>{shippingInfo.phoneNo}</p>
                <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state} , {shippingInfo.country}</p>
                
                <hr/>

                <h4 className="mt-4">Your Cart Items:</h4>
                {
                    items?.map( item => (
                            <div className="cart-item my-1" key={item.product}>
                                <div className="row">
                                    <div className="col-4 col-lg-2" >
                                        <img src={item.image} alt={item.name} height="45" width="65" />
                                    </div>

                                    <div className="col-5 col-lg-6">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>

                                    <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                        <p>{item.quantity} x ${item.price} = <b>${item.quantity * item.price}</b></p>
                                    </div>
                                </div> 
                            </div>                             
                    ))
                }
            </div>
			
			<div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">${subTotalPrice}</span></p>
                    <p>Shipping: <span className="order-summary-values">${shippingPrice}</span></p>
                    <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

                    <hr />

                    <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

                    <hr />
                    <button id="checkout_btn" className="btn btn-primary btn-block" onClick={handleClick} >Proceed to Payment</button>
                </div>
            </div>	
        </div>
    </Fragment>
  )
}

export default ConfirmOrder