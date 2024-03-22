import React, { Fragment, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import {toast} from 'react-toastify'
import { clearError } from '../../../slices/productsSlices'
import { getAllProductsForAdmin } from '../../../actions/productsActions'
import Loader from '../../Loader'
import { clearIsDeleted, clearProductError } from '../../../slices/productSlice'
import { deleteProduct } from '../../../actions/productActions'

const ProductsList = () => {

    const { products = [], error, loading } = useSelector(state => state.productsState)
    const { error : producError, loading : productLoading, isProductDeleted } = useSelector(state => state.productState)
    const dispatch = useDispatch()

    useEffect(() => {
        if(error){
            toast(error, {
                type : 'error',
                position : 'top-center',
                onOpen : () => dispatch(clearError())
            })
            return
        }
        if(producError){
            toast(producError, {
                type : 'error',
                position : 'top-center',
                onOpen : () => dispatch(clearProductError())
            })
            return
        }
        if(isProductDeleted){
            toast("Product Deleted Successfully", {
                type : 'success',
                position : 'top-center',
                onOpen : () => dispatch(clearIsDeleted())
            })
        }
        dispatch(getAllProductsForAdmin())
    },[dispatch, error, producError, isProductDeleted])
    
    const setData = () => {
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
                    label : 'Price',
                    field : 'price',
                    sort : 'asc'
                },
                {
                    label : 'Stock',
                    field : 'stock',
                    sort : 'asc'
                },
                {
                    label : 'Actions',
                    field : 'actions',
                    sort : 'asc'
                },
            ],
            rows : [

            ]
        }

        products.forEach(product => {
            data.rows.push({
                id : product._id,
                name : product.name,
                price : product.price,
                stock : product.stock,
                actions : (
                    <Fragment>
                        <Link className='btn btn-primary' to={`/admin/product/${product._id}`}><i className='fa fa-pencil'></i></Link>
                        <Button onClick={(e) => handleDeleteClick( e, product._id )} className='btn btn-danger ml-2'><i className='fa fa-trash'></i></Button>
                    </Fragment>
                )
            })
        });

        return data
    }

    const handleDeleteClick = ( e, id ) => {
        e.target.disabled = true
        dispatch(deleteProduct(id))
    }

  return (
    <div className='row'>
        <div className='col-12 col-md-2'>
            <Sidebar/>
        </div>
        <div className='col-12 col-md-10'>
            {
                loading || productLoading ? (
                    <Loader/>
                ) : (
                    <Fragment>
                        <h1 className="my-4">All Products</h1>
                        <MDBDataTable
                            hover
                            striped
                            className='px-3'
                            bordered
                            data={setData()}
                        />
                    </Fragment>
                )
            }
        </div>
    </div>
  )
}

export default ProductsList