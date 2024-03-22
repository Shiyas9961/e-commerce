import React from 'react'
import Sidebar from './Sidebar'
import Menu from './Menu'

const DashBoard = () => {

  return (
    <div className='row'>
        <div className='col-12 col-md-2'>
            <Sidebar/>
        </div>
        <div className='col-12 col-md-10'>
          <Menu />
        </div>
    </div>
  )
}

export default DashBoard