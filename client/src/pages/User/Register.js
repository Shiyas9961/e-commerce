import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearAuthError, registerUser } from '../../actions/authActions'
import Loader from '../Loader'

const Register = () => {

    const [userData, setUserData] = useState({
        username : '',
        email : '',
        password : ''
    })

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default.jpeg')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, isAuthenticated, error } = useSelector((state) => state.authState)

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name] : event.target.value
        })
    }

    useEffect(() => {
        if(isAuthenticated){
            navigate('/')
        }
        if(error){
            toast(error, {
                position : 'top-center',
                type : 'error',
                onOpen : dispatch(clearAuthError)
            })
        }
    },[isAuthenticated, error, dispatch, navigate])

    const handleFileChange = (event) => {
        //console.log(event.target.files[0])
        const reader = new FileReader()

        reader.onload = () => {
            if(reader.readyState === 2) {
                setAvatar(event.target.files[0])
                setAvatarPreview(reader.result)
            }
        }

        reader.readAsDataURL(event.target.files[0])
    }


    const handleRegisterSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData()

        formData.append('username', userData.username)
        formData.append('email', userData.email)
        formData.append('password', userData.password)
        formData.append('avatar', avatar)

        dispatch(registerUser(formData))
    }

    if(loading){
        return <Loader/>
    }

  return (
    <div className="row wrapper">
		<div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={handleRegisterSubmit} encType="multipart/form-data" autoComplete="false">
                <h1 className="mb-3">Register</h1>

                <div className="form-group">
                    <label htmlFor="name_field">Name</label>
                    <input 
                        type="name" 
                        id="name_field" 
                        name='username'
                        className="form-control"
                        value={userData.username} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email_field">Email</label>
                    <input 
                        type="email" 
                        id="email_field" 
                        name='email'
                        className="form-control" 
                        value={userData.email} 
                        onChange={handleChange} 
                    />
                </div>
        
                <div className="form-group">
                    <label htmlFor="password_field">Password</label>
                    <input 
                        type="password" 
                        id="password_field" 
                        className="form-control" 
                        name='password'
                        value={userData.password} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="customFile">Avatar</label>
                    <div className="d-flex align-items-center">
                        <div>
                            <figure className="avatar mr-3 item-rtl">
                                <img src={avatarPreview} className="rounded-circle"   alt="default" />
                            </figure>
                        </div>
                        <div className="custom-file">
                            <input 
                                type="file" 
                                name="avatar" 
                                className="custom-file-input" 
                                id="customFile" 
                                onChange={handleFileChange}
                            />
                            <label className="custom-file-label" htmlFor="customFile">
                                Choose Avatar
                            </label>
                        </div>
                    </div>
                </div>
    
                <button id="register_button" type="submit" className="btn btn-block py-3">
                REGISTER
                </button>
            </form>
		  </div>
    </div>
  )
}

export default Register