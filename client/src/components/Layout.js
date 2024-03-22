import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <Fragment>
        <Header/>
        <ToastContainer theme='dark'/>
        <div className='container container-fluid'>
            <Outlet/>
        </div>
        <Footer/>
    </Fragment>
  )
}

export default Layout