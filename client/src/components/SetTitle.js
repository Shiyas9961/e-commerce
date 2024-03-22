import React from 'react'
import { Helmet } from 'react-helmet-async'

const SetTitle = ({title}) => {
  return (
    <Helmet>
        <title>{`${title} - E-Cart`}</title>
    </Helmet>
  )
}

export default SetTitle