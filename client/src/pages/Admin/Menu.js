import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllProductsForAdmin } from '../../actions/productsActions'
import { getAdminOrders } from '../../actions/orderActions'
import { getAllUsers } from '../../actions/authActions'
import Loader from '../Loader'

const Menu = () => {
    const { products = [], loading } = useSelector((state) => state.productsState)
    const { adminOrders = [] } = useSelector(state => state.orderState)
    const { users = [] } = useSelector(state => state.usersState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProductsForAdmin())
        dispatch(getAdminOrders())
        dispatch(getAllUsers())
      },[dispatch])

    const totalAmout = adminOrders.reduce((acc, item) => ( acc += item.totalPrice ), 0)

    let noOfOutOfStock = 0
    
    products.forEach(item => {
        if(item.stock === 0){
            noOfOutOfStock += 1
        }
    })

    if(loading){
        return <Loader/>
    }

  return (
    <Fragment>
            <h1 className="my-4">Dashboard</h1>
              <div className="row pr-4">
                  <div className="col-xl-12 col-sm-12 mb-3">
                      <div className="card text-white bg-primary o-hidden h-100">
                          <div className="card-body">
                              <div className="text-center card-font-size">Total Amount<br /> <b>${(totalAmout).toFixed(2)}</b></div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="row pr-4">
                  <div className="col-xl-3 col-sm-6 mb-3">
                      <div className="card text-white bg-success o-hidden h-100">
                          <div className="card-body">
                              <div className="text-center card-font-size">Products<br/><b>{products.length}</b></div>
                          </div>
                          <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                              <span className="float-left">View Details</span>
                              <span className="float-right">
                                  <i className="fa fa-angle-right"></i>
                              </span>
                          </Link>
                      </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 mb-3">
                      <div className="card text-white bg-danger o-hidden h-100">
                          <div className="card-body">
                              <div className="text-center card-font-size">Orders<br/> <b>{adminOrders.length}</b></div>
                          </div>
                          <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                              <span className="float-left">View Details</span>
                              <span className="float-right">
                                  <i className="fa fa-angle-right"></i>
                              </span>
                          </Link>
                      </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 mb-3">
                      <div className="card text-white bg-info o-hidden h-100">
                          <div className="card-body">
                              <div className="text-center card-font-size">Users<br/> <b>{users.length}</b></div>
                          </div>
                          <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                              <span className="float-left">View Details</span>
                              <span className="float-right">
                                  <i className="fa fa-angle-right"></i>
                              </span>
                          </Link>
                      </div>
                  </div>

                  <div className="col-xl-3 col-sm-6 mb-3">
                      <div className="card text-white bg-warning o-hidden h-100">
                          <div className="card-body">
                              <div className="text-center card-font-size">Out of Stock<br/> <b>{noOfOutOfStock}</b></div>
                          </div>
                      </div>
                  </div>
              </div>
          </Fragment>
  )
}

export default Menu