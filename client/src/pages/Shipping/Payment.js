import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { validateShipping } from './Shipping'
import { useElements, useStripe, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { privateAxios } from '../../baseAxios'
import { BASE_URL } from '../../baseUrl'
import { toast } from 'react-toastify'
import { completedOrder } from '../../slices/cartSlice'
import { createNewOrder } from '../../actions/orderActions'
import { clearOrderError } from '../../slices/orderSlice'

const Payment = () => {

    const navigate = useNavigate()
    const { shippingInfo, items : cartItems } = useSelector((state) => state.cartState)
    const { user } = useSelector((state) => state.authState)
    const { error : orderError } = useSelector((state) => state.orderState)
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const elements = useElements()
    const strip = useStripe()
    const dispatch = useDispatch()

    useEffect(()=>{
        validateShipping(shippingInfo, navigate)
        if(orderError){
            toast(orderError, {
                type : 'error',
                position : 'top-center',
                onOpen : () => dispatch(clearOrderError())
            })
        }
        // eslint-disable-next-line
    },[])

    const paymentData = {
        amount : Math.round(orderInfo?.totalPrice * 100),
        shipping : {
            name : user.username,
            address : {
                city : shippingInfo.city,
                postal_code : shippingInfo.postalCode,
                country : shippingInfo.country,
                state : shippingInfo.state,
                line1 : shippingInfo.address
            },
            phone : shippingInfo.phoneNo
        }
    }

    const order = {
        orderItems : cartItems,
        shippingInfo
    }

    if(orderInfo){
        order.itemsPrice = orderInfo.subTotalPrice
        order.taxPrice = orderInfo.taxPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.totalPrice = orderInfo.totalPrice
    }

    const submitHandle = async (e) => {
        e.preventDefault()
        document.querySelector('#pay_btn').disabled = true

        try {
            const { data } = await privateAxios.post(`${BASE_URL}/api/v1/payment/process`, paymentData)
            const clienSecret = data.client_secret

            const result = await  strip.confirmCardPayment(clienSecret, {
                    payment_method : {
                        card : elements.getElement(CardNumberElement),
                        billing_details : {
                            name : user.username,
                            email : user.email
                        }
                    }
                })
            
            if(result.error){
                toast(result.error.message, {
                    type : 'error',
                    position : 'top-center'
                })
                document.querySelector('#pay_btn').disabled = false
            }else{
                if(result.paymentIntent.status === 'succeeded'){
                    toast('Payment Success !', {
                        type : 'success',
                        position : 'top-center'
                    })

                    order.paymentInfo = {
                        id : result.paymentIntent.id,
                        status : result.paymentIntent.status
                    }
                    dispatch(createNewOrder(order))
                    dispatch(completedOrder())
                    navigate('/order/success')
                }else{
                    toast("Please try again", {
                        type : 'warning',
                        position : 'top-center'
                    })
                    document.querySelector('#pay_btn').disabled = false
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
  return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                
                <form className="shadow-lg" onSubmit={submitHandle}>

                    <h1 className="mb-4">Card Info</h1>

                    <div className="form-group">
                        <label htmlFor="card_num_field">Card Number</label>
                        <CardNumberElement 
                            type="text" 
                            id="card_num_field" 
                            className="form-control" 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="card_exp_field">Card Expiry</label>
                        <CardExpiryElement 
                            type="text" 
                            id="card_exp_field" 
                            className="form-control" 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="card_cvc_field">Card CVC</label>
                        <CardCvcElement 
                            type="text" 
                            id="card_cvc_field" 
                            className="form-control" 
                        />
                    </div>
        
                
                    <button id="pay_btn" type="submit" className="btn btn-block py-3">
                    Pay - ${orderInfo?.totalPrice}
                    </button>
        
                </form>
            </div>
        </div>
  )
}

export default Payment