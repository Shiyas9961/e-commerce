import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import CartItems from './CartItems'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const { items } = useSelector((state) => state.cartState)
    const navigate = useNavigate()

    const handleCheckOut = () => {
        navigate('/login?redierect=shipping')
    }

  return  items.length > 0 ? (
                <Fragment>
                    
                    <h2 className="mt-5">Your Cart: <b>{items.length} items</b></h2>
                    <div className="row d-flex justify-content-between">
                        
                            {
                                items.map(item => (
                                    <CartItems item={item} key={item.product}/>
                                ))
                            }

                        <div className="col-12 col-lg-3 my-4">
                            <div id="order_summary">
                                <h4>Order Summary</h4>
                                <hr/>
                                <p>Subtotal:  <span className="order-summary-values">{items.reduce((total, item) => (total += item.quantity), 0)} (Units)</span></p>
                                <p>Est. total: <span className="order-summary-values">${items.reduce((total, item) => total += item.quantity * item.price, 0)}</span></p>
                
                                <hr/>
                                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={handleCheckOut}>Check out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            ) : <h2 className="mt-5">Your Cart is Empty</h2>
        }

export default Cart