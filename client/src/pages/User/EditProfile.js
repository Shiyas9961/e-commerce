import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearAuthError, clearIsUpdatedAction, editUser } from "../../actions/authActions"
import Loader from "../Loader"
import { toast } from "react-toastify"

export default function UpdateProfile () {

    const { user, loading, error, isUpdated } = useSelector((state) => state.authState)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('')
    const dispatch = useDispatch()

    useEffect(()=>{
        if(user){
            setUsername(user.username)
            setEmail(user.email)
            if(user.avatar){
                setAvatarPreview(user.avatar)
            }
        }

        if(isUpdated){
            toast("Updated Successfully", {
                type : 'success',
                position : 'top-center',
                onOpen : () => dispatch(clearIsUpdatedAction)
            })
            return
        }

        if(error){
            toast(error, {
                type : 'error',
                position : 'top-center',
                onOpen : () => { dispatch(clearAuthError) }
            })
            return
        }

    },[user, dispatch, error, isUpdated])

    const handleAvatarChange = (e) => {
        const reader = new FileReader()

        reader.onload = () => {
            if(reader.readyState === 2){
                setAvatarPreview(reader.result)
                setAvatar(e.target.files[0])
            }
        }

        reader.readAsDataURL(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('username', username)
        formData.append('email', email)
        formData.append('avatar', avatar)

        dispatch(editUser(formData))
    }

    if(loading){
        return <Loader/>
    }

    return (
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={handleSubmit} className="shadow-lg" encType="multipart/form-data">
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input 
                                type="name" 
                                id="name_field" 
                                className="form-control" 
                                name="name"  
                                value={username} 
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input 
                                type="email" 
                                id="email_field" 
                                className="form-control" 
                                name="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="customFile">Avatar</label>
                            <div className="d-flex align-items-center">
                                <div>
                                    <figure className="avatar mr-3 item-rtl">
                                        <img src={avatarPreview} className="rounded-circle" alt="Avatar Preview" />
                                    </figure>
                                </div>
                                <div className="custom-file">
                                    <input 
                                        type="file" 
                                        name="avatar" 
                                        className="custom-file-input" 
                                        id="customFile" 
                                        onChange={handleAvatarChange}
                                    />
                                    <label className="custom-file-label" htmlFor="customFile">
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update</button>
                    </form>
                </div>
            </div>
    )
}