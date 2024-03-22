import { Fragment, useEffect, useState } from 'react'
import SetTitle from '../../components/SetTitle'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuthError, loginUser } from '../../actions/authActions'
import Loader from '../Loader'
import { toast } from 'react-toastify'

export default function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const { loading, isAuthenticated, error } = useSelector((state) => state.authState)
    const redierect = location.search ? `/${location.search.split('=')[1]}` : '/'

    useEffect(() => {
        if(isAuthenticated){
            navigate(redierect)
        }
        if(error){
            toast(
                error, {
                    position : 'top-center',
                    type : 'error',
                    onOpen : () => { dispatch(clearAuthError) }
                }
            )
            return
        }
    },[isAuthenticated, error, navigate, dispatch, redierect])

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(email, password))
    }

    if(loading){
        return <Loader/>
        
    }

    return (
        <Fragment>
            <SetTitle title={"Login"} />
            <div className="row wrapper"> 
                <div className="col-10 col-lg-5">
                    <form onSubmit={handleLoginSubmit} className="shadow-lg">
                        <h1 className="mb-3" style={{textAlign : 'center'}}>Login</h1>

                        <div className="form-group">
                        <label htmlFor="email_field">Email</label>
                        <input 
                            type="email" 
                            id="email_field" 
                            className="form-control" 
                            value={email}
                            onChange={(event)=>setEmail(event.target.value)}
                        />
                        </div>
            
                        <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input 
                            type="password" 
                            id="password_field" 
                            className="form-control"
                            value={password}
                            onChange={(event)=>setPassword(event.target.value)} 
                        />
                        </div>

                        <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
            
                        <button id="login_button" type="submit" className="btn btn-block py-3">
                        LOGIN
                        </button>

                        <Link to="/register" className="float-right mt-3">New User?</Link>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}