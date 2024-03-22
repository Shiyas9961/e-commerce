import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../Sidebar'
import Loader from '../../Loader'
import { MDBDataTable } from 'mdbreact'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { deleteUser, getAllUsers } from '../../../actions/authActions'
import { toast } from 'react-toastify'
import { clearUserDeleted, clearUserError } from '../../../slices/usersSlice'

const UsersList = () => {

    const { users = [], loading, error, isUserDeleted } = useSelector(state => state.usersState)
    const dispatch = useDispatch()

    useEffect(() => {
        if(error){
            toast(error, {
                type : 'error',
                position : 'top-center',
                onOpen : () => dispatch(clearUserError())
            })
            return
        }
        if(isUserDeleted){
            toast("User deleted successfully", {
                type : 'success',
                position : 'top-center',
                onOpen : () => dispatch(clearUserDeleted())
            })
            return
        }

        dispatch(getAllUsers())
    },[dispatch, error, isUserDeleted])

    const setUsers = () => {
        const data = {
            columns : [
                {
                    label : 'ID',
                    field : 'id',
                    sort : 'asc'
                },
                {
                    label : 'Name',
                    field : 'name',
                    sort : 'asc'
                },
                {
                    label : 'Email',
                    field : 'email',
                    sort : 'asc'
                },
                {
                    label : 'Role',
                    field : 'role',
                    sort : 'asc'
                },
                {
                    label : 'Action',
                    field : 'action',
                    sort : 'asc'
                }
            ],
            rows : [

            ]
        }

        users.forEach(user => {
            data.rows.push({
                id : user._id,
                name : user.username,
                email : user.email,
                role : user.role,
                action : (
                    <Fragment>
                        <Link className='btn btn-primary' to={`/admin/user/${user._id}`}><i className='fa fa-pencil'></i></Link>
                        <Button className='btn btn-danger ml-2' onClick={() => handleDeleteClick(user._id)}>
                            <i className='fa fa-trash'></i>
                        </Button>
                    </Fragment>
                )
            })
        });

        return data
    }

    const handleDeleteClick = (id) => {
        dispatch(deleteUser(id))
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
                        <h1 className='my-4'>Users List</h1>
                        <MDBDataTable
                            hover
                            striped
                            className='px-3'
                            bordered
                            data={setUsers()}
                        />
                    </Fragment>
                )
            }
        </div>
    </div>
  )
}

export default UsersList