import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordAction, clearAuthError, clearForgotMessage } from '../../actions/authActions'
import { toast } from 'react-toastify'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const { error, message } = useSelector((state) => state.authState)

    useEffect(() => {
        if(message){
            toast(message, {
                position : 'top-center',
                type : 'success',
                onOpen : () => { dispatch(clearForgotMessage) }
            })
        }
        if(error){
            toast(error, {
                position : 'top-center',
                type : 'error',
                onOpen : () => { dispatch(clearAuthError) }
            }) 
        }
    },[message, error, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('email', email)

        dispatch(forgotPasswordAction(formData))
    }

  return (
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={handleSubmit} className="shadow-lg">
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input type="email" id="email_field" className="form-control" value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>

                        <button id="forgot_password_button" type="submit" className="btn btn-block py-3">
                            Send Email
                    </button>

                    </form>
                </div>
            </div>
  )
}

export default ForgotPassword