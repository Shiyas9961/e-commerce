import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleUser, updateUser } from '../../../actions/authActions'
import { toast } from 'react-toastify'
import { clearUserError, clearUserUpdated } from '../../../slices/usersSlice'
import { useParams } from 'react-router-dom'
import Loader from '../../Loader'

const EditUser = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const { id : userId } = useParams()
    const { error, user = {}, isUserUpdated, loading } = useSelector(state => state.usersState)
    const { user : authUser } = useSelector(state => state.authState)
    const dispatch = useDispatch()

    useEffect(() => {
        if(isUserUpdated){
            toast("User details updated successfully", {
                type : 'success',
                position : 'top-center',
                onOpen : () => dispatch(clearUserUpdated())
            })
            return
        }
        if(error){
            toast(error, {
                type : 'error',
                position : 'top-center',
                onOpen : () => dispatch(clearUserError())
            })
            return
        }
        dispatch(getSingleUser(userId))
    },[dispatch, isUserUpdated, error, userId])

    useEffect(() => {
        if(user._id){
            setUsername(user.username)
            setEmail(user.email)
            setRole(user.role)
        }
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.append("username", username)
        formData.append("email", email)
        formData.append("role", role)

        dispatch(updateUser(userId, formData))
    }

  return (
    <div className="row">
        <div className="col-12 col-md-2">
            <Sidebar/>
        </div>
        <div className="col-12 col-md-10">
            {
                loading ? <Loader/> : (
                    <Fragment>
                        <h1 className='my-4'>Edit User</h1>
                        <div className="wrapper my-5"> 
                            <form onSubmit={handleSubmit} className="shadow-lg" encType="multipart/form-data">
                                <h1 className="mb-4">Update Product</h1>

                                <div className="form-group">
                                <label htmlFor="name_field">Username</label>
                                <input 
                                    type="text" 
                                    id="name_field" 
                                    className="form-control" 
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)} 
                                />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input 
                                    type="text" 
                                    id="price_field" 
                                    className="form-control"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}   
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Role</label>
                                    <select disabled={userId === authUser._id} onChange={(event) => setRole(event.target.value)} value={role} className="form-control" id="category_field">
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                                <button id="login_button" type="submit" className="btn btn-block py-3">
                                UPDATE
                                </button>
                            </form>
                        </div>
                    </Fragment>
                )
            }
            
        </div>
    </div>
  )
}

export default EditUser