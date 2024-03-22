import React from 'react'
import SetTitle from '../../components/SetTitle'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Profile = () => {

    const { user } = useSelector((state) => state.authState)

  return (
        <div className="row justify-content-around mt-5 user-info">
            <SetTitle title={'My Profile'}/>
            <div className="col-12 col-md-3">
                <figure className="avatar avatar-profile">
                    <img className="rounded-circle img-fluid" src={user.avatar ? user.avatar : '/images/default.jpeg'} alt="profile" />
                </figure>
                <Link to='/myprofile/edit' id="edit_profile" className="btn btn-primary btn-block my-5">
                    Edit Profile
                </Link>
            </div>
     
            <div className="col-12 col-md-5">
                 <h4>Full Name</h4>
                 <p>{user.username}</p>
     
                 <h4>Email Address</h4>
                 <p>{user.email}</p>

                 <h4>Joined Date</h4>
                 <p>{String(user.createAt).substring(0, 10)}</p>

                 <Link to='/orders' className="btn btn-danger btn-block mt-5">
                    My Orders
                </Link>

                <Link to='/myprofile/edit/password' className="btn btn-primary btn-block mt-3">
                    Change Password
                </Link>
            </div>
        </div>
  )
}

export default Profile