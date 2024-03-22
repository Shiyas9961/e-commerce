import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import { changePasswordAction, clearAuthError } from '../../actions/authActions'
import { toast } from 'react-toastify'

const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const { isUpdated, error, loading } = useSelector((state) => state.authState)

    useEffect(() => {
        if(isUpdated){
            toast("Password Changed Successfully", {
                position : 'top-center',
                type : 'success'
            })
            setOldPassword("")
            setPassword("")
            return
        }

        if(error){
            toast(error, {
                position : 'top-center',
                type : 'error',
                onOpen : () => { dispatch(clearAuthError) }
            })
        }
    })


    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('oldPassword', oldPassword)
        formData.append('password', password)

        dispatch(changePasswordAction(formData))
    }


    if(loading){
        return <Loader/>
    }

  return (
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={handleSubmit} className="shadow-lg">
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input 
                                type="password" 
                                id="old_password_field" 
                                className="form-control" 
                                value={oldPassword}
                                onChange={e => setOldPassword(e.target.value)} 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input 
                                type="password" 
                                id="new_password_field" 
                                className="form-control" 
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                    </form>
                </div>
            </div>
  )
}

export default ChangePassword