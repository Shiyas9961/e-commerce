import React from 'react'
import Search from './Search'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Image } from 'react-bootstrap'
import { logoutUser } from '../actions/authActions'
import { IoMdCart } from 'react-icons/io'

const Header = () => {

    const { isAuthenticated, user } = useSelector((state) => state.authState)
    const { items } = useSelector((state) => state.cartState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = () => {
        dispatch(logoutUser)
    }

  return (
        <nav className="navbar row p-3">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to='/'>
                        <img width="150px" src="/images/logo.png" alt='logo'  />
                    </Link>
                </div>
            </div>

            <div className="col-12 col-md-6 mt-2 mt-md-0 search-parent">
                <Search/>
            </div>

            <div className="d-flex justify-content-center align-items-center col-md-3 mt-4 mt-md-0">
                {
                    isAuthenticated ? (
                        <Dropdown className='d-inline'>
                            <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                                <figure className='avatar avatar-nav'>
                                    <Image className='profile-img' width="80px" src={user.avatar ? user.avatar : './images/default.jpeg'}/>
                                </figure>
                                <span>{user?.username.split(" ")[0]}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                { user.role === 'admin' && <Dropdown.Item onClick={() => navigate('/admin/dashboard')}>Dashboard</Dropdown.Item>}
                                <Dropdown.Item onClick={() => navigate('/myprofile')}>Profile</Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate('/orders')} >Orders</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogOut} className='text-danger'>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : <Link to='/login' className="btn mr-3" id="login_btn">Login</Link>
                }
                <Link to='/cart'>
                    <div id="cart" className="cart-icon">
                        <IoMdCart/>
                        <span className="ml-1" id="cart_count">{items.length}</span>
                    </div>
                </Link>
            </div>
        </nav>
  )
}

export default Header