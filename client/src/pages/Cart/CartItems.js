import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeProductFromCart, increaseCartQty, decreseCartQty } from '../../slices/cartSlice'

const CartItems = ({item}) => {

    const dispatch = useDispatch()

    const icreaseQty = () => {
        if(item.stock === 0 || item.stock <= item.quantity) return

        dispatch(increaseCartQty(item.product))
    }

    const decreseQty = () => {
        if(item.quantity === 0) return

        dispatch(decreseCartQty(item.product))
    }

  return (
        <div className="col-12 col-lg-8">
            <div className="cart-item">
                <div className="row">
                    <div className="col-4 col-lg-3">
                        <img src={item.image} alt="Laptop" height="90" width="115" />
                    </div>

                    <div className="col-5 col-lg-3">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>


                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus" onClick={decreseQty}>-</span>
                            <input 
                                type="number" 
                                className="form-control count d-inline" 
                                value={item.quantity} 
                                readOnly 
                            />
                            <span className="btn btn-primary plus" onClick={icreaseQty}>+</span>
                        </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i onClick={() => dispatch(removeProductFromCart(item.product))} id="delete_cart_item" className="fa fa-trash btn btn-danger"></i>
                    </div>

                </div>
            </div>
            <hr />
        </div>
  )
}

export default CartItems