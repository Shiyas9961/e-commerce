import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../Sidebar'
import Loader from '../../Loader'
import { MDBDataTable } from 'mdbreact'
import { Link } from 'react-router-dom'
import { deleteOrder, getAdminOrders } from '../../../actions/orderActions'
import { Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { clearIsDeleted, clearOrderError } from '../../../slices/orderSlice'

const OrderList = () => {

    const { adminOrders = [], loading, isOrderDeleted, error } = useSelector(state => state.orderState)
    const dispatch = useDispatch()

    useEffect(() => {
        if(error){
            toast(error, {
                type : 'error',
                position : 'top-center',
                onOpen : () => dispatch(clearOrderError())
            })
            return
        }
        if(isOrderDeleted){
            toast("Order deleted successfully", {
                type : 'success',
                position : 'top-center',
                onOpen : () => dispatch(clearIsDeleted())
            })
            return
        }

        dispatch(getAdminOrders())
    }, [dispatch, error, isOrderDeleted])


    const setOrders = () => {
        const data = {
            columns : [
                {
                    label : 'ID',
                    field : 'id',
                    sort : 'asc'
                },
                {
                    label : 'No Of Items',
                    field : 'noOfItems',
                    sort : 'asc'
                },
                {
                    label : 'Amount',
                    field : 'amount',
                    sort : 'asc'
                },
                {
                    label : 'Status',
                    field : 'status',
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

        adminOrders.forEach(order => {
            data.rows.push({
                id : order._id,
                noOfItems : order.orderItems.length,
                amount : order.totalPrice,
                status : (
                    <p style={{ color : `${order.orderStatus === 'Delivered' ? 'green' : 'crimson'}` }}>{order.orderStatus}</p>
                ),
                action : (
                    <Fragment>
                        <Link className='btn btn-primary' to={`/admin/order/${order._id}`}><i className='fa fa-pencil'></i></Link>
                        <Button onClick={() => handleDeleteClick(order._id)} className='btn btn-danger ml-2'><i className='fa fa-trash'></i></Button>
                    </Fragment>
                )
            })
        });

        return data
    }

    function handleDeleteClick (id){
        dispatch(deleteOrder(id))
    }


  return (
    <div className="row">
        <div className='col-12 col-md-2'>
            <Sidebar/>
        </div>
        <div className='col-12 col-md-10'>
            {
                loading ? <Loader/> : (
                    <Fragment>
                        <h1 className='my-4'>All Orders</h1>
                        <MDBDataTable
                            hover
                            striped
                            className='px-3'
                            bordered
                            data={setOrders()}
                        />
                    </Fragment>
                )
            }
        </div>
    </div>
  )
}

export default OrderList