import React, { Fragment } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const AdminLayout = () => {
  return (
    <Fragment>
        <Header/>
        <ToastContainer theme='dark'/>
            <Outlet/>
        <Footer/>
    </Fragment>
  )
}

export default AdminLayout