import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearIsReviewDeleted, clearProductError } from '../../../slices/productSlice'
import Sidebar from '../Sidebar'
import Loader from '../../Loader'
import { Button } from 'react-bootstrap'
import { deleteReview, getAllReviewsByProduct } from '../../../actions/productActions'
import { MDBDataTable } from 'mdbreact'

const ReviewList = () => {

    const { error, loading, reviews = [], isReviewDeleted } = useSelector(state => state.productState)
    const dispatch = useDispatch()
    const [productId, setProductId] = useState('')

    const handleProductClick = (event) => {
        event.preventDefault()
        dispatch(getAllReviewsByProduct(productId))
    }

    useEffect(() => {
        if(error){
            toast(error, {
                type : 'error',
                position : 'top-center',
                onOpen : () => dispatch(clearProductError())
            })
            return
        }
        if(isReviewDeleted){
            toast("Review deleted successfully", {
                type : 'success',
                position : 'top-center',
                onOpen : () => dispatch(clearIsReviewDeleted())
            })
            dispatch(getAllReviewsByProduct(productId))
            return
        }
    }, [dispatch, error, isReviewDeleted, productId])

    const setReviews = () => {
        const data = {
            columns : [
                {
                    label : 'ID',
                    field : 'id',
                    sort : 'asc'
                },
                {
                    label : 'User',
                    field : 'user',
                    sort : 'asc'
                },
                {
                    label : 'Rating',
                    field : 'rating',
                    sort : 'asc'
                },
                {
                    label : 'Comment',
                    field : 'comment',
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

        reviews.forEach(review => {
            data.rows.push({
                id : review._id,
                user : review.user.username,
                rating : review.rating,
                comment : review.comments,
                action : (
                    <Button className='btn btn-primary' onClick={() => handleDeleteClick(review._id)}>
                        <i className='fa fa-trash'></i>
                    </Button>
                )
            })
        });

        return data
    }

    const handleDeleteClick = (id) => {
        dispatch(deleteReview(id, productId))
    }

  return (
    <div className='row'>
        <div className="col-12 col-md-2">
            <Sidebar/>
        </div>
        <div className="col-12 col-md-10">
            <h1 className='my-4'>Reviews List</h1>
            <div className="row justify-content-center mt-5">
                <div className="col-5">
                    <form onSubmit={handleProductClick}>
                        <div className="form-group">
                            <label htmlFor="form-id">Product Id</label>
                            <input 
                                type="text" 
                                value={productId}
                                id='form-id'
                                onChange={(event) => setProductId(event.target.value)}
                                className='form-control'
                            />
                        </div>
                        <button disabled={loading} type='submit' className='btn btn-primary btn-block py-2'>Search</button>
                    </form>
                </div>
            </div>
            {
                loading ? <Loader/> : (
                    <Fragment>
                        <MDBDataTable
                            bordered
                            striped
                            hover
                            className='px-3'
                            data={setReviews()}
                        />
                    </Fragment>
                )
            }
        </div>
    </div>
  )
}

export default ReviewList