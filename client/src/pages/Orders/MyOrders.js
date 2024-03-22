import React, { Fragment, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import SetTitle from '../../components/SetTitle'
import { useDispatch, useSelector } from 'react-redux'
import { getMyOrders } from '../../actions/orderActions'
import { Link } from 'react-router-dom'

const MyOrders = () => {

    const { userOrders = [] } = useSelector((state) => state.orderState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMyOrders)    
    },[])

    const getData = () => {
        const data = {
            columns : [
                {
                    label : 'Order ID',
                    field : 'id',
                    sort : 'asc'
                },
                {
                    label : 'Number Of Items',
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
                    label : 'Actions',
                    field : 'actions',
                    sort : 'asc'
                }
            ],
            rows : [

            ]
        }

        userOrders.forEach(each => {
            data.rows.push({
                id : each._id,
                noOfItems : each.orderItems.length,
                amount : each.totalPrice,
                status : each.orderStatus && each.orderStatus === "Delivered" ? (
                    <p style={{ color : 'green'}}>{each.orderStatus}</p> ) : (
                        <p style={{ color : 'red' }}>{each.orderStatus}</p>
                    ),
                actions : (
                    <Link to={`/order/${each._id}`} className='btn btn-primary'>
                        <i className='fa fa-eye'></i>
                    </Link>
                )    
            })
        })

        return data
    }


  return (
    <Fragment>
        <SetTitle title={"My Orders"}/>
        <h1 className='mt-5'>My Orders</h1>
        <MDBDataTable
            className='px-3'
            bordered
            striped
            hover
            data={getData()}
        />
    </Fragment>
  )
}

export default MyOrders