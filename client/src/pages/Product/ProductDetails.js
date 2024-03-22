import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../../actions/productActions'
import { useParams } from 'react-router-dom'
import Loader from '../Loader'
import { Carousel, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import SetTitle from '../../components/SetTitle'
import { addToCart } from '../../actions/cartActions'
import { createReviewAction } from '../../actions/productActions'
import { clearProductError, clearReviewSubmitted } from '../../slices/productSlice'
import ProductReview from './ProductReview'

const ProductDetails = () => {
    const { product = {}, loading, error, isReviewSubmited } = useSelector((state) => state.productState)
    const { user } = useSelector(state => state.authState)
    const [noOfStocks, setNoOfStocks] = useState(1)
    const [show, setShow] = useState(false);
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const { id } = useParams()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //console.log(product)

    useEffect(() => {
        if(error){
            toast.error(error, {
                position : 'top-center',
                onOpen : () => dispatch(clearProductError())
            })
            return
        }
        if(isReviewSubmited){
            handleClose()
            toast('Review Submitted Successfully !', {
                type : 'success',
                onOpen : () => dispatch(clearReviewSubmitted())
            })
            return
        }
    },[error, dispatch, id, isReviewSubmited])

    useEffect(() => {
        dispatch(getProduct(id))
    },[isReviewSubmited, dispatch, id])


    if(loading){
        return (
            <Loader/>
        )
    }

    const increseQuantity = () => {
        const count = document.querySelector('.count')

        if(product.stock === 0 || product.stock <= count.valueAsNumber) {
            return
        }
        let quantity = count.valueAsNumber += 1
        setNoOfStocks(quantity)
    }

    const decreseQuantity = () => {
        let count = document.querySelector('.count')

        if(count.valueAsNumber === 1) return

        let quantity = count.valueAsNumber -= 1
        setNoOfStocks(quantity)
    }

    const handleSubmit = () => {
        const formData = new FormData()

        formData.append('rating', rating)
        formData.append('comments', comment)
        formData.append('productId', id)

        dispatch(createReviewAction(formData))
    }


  return (
    <Fragment>
        {
            product && (
                    <Fragment>
                        <div className="row f-flex justify-content-around">
                            <SetTitle title={product.name}/>
                            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                                <Carousel pause="hover">
                                    {
                                        product.images && product.images.map(img => {
                                            return (
                                                <Carousel.Item key={img._id}>
                                                    <img className='d-black w-100' src={img.image} alt={product.name} height="500" width="500" />
                                                </Carousel.Item>
                                            )
                                        })
                                    }
                                </Carousel>
                            </div>

                            <div className="col-12 col-lg-5 mt-5">
                                <h3>{product?.name}</h3>
                                <p id="product_id">Product #{product._id}</p>

                                <hr/>

                                <div className="rating-outer">
                                    <div className="rating-inner" style={{ width : `${(product.rating)/5 * 100}` }}></div>
                                </div>
                                <span id="no_of_reviews">{`(${product?.noOfReviews} Reviews)`}</span>

                                <hr/>

                                <p id="product_price">${product?.price}</p>
                                <div className="stockCounter d-inline">
                                    <span className="btn btn-danger minus" onClick={decreseQuantity}>-</span>

                                    <input 
                                        type="number" 
                                        className="form-control count d-inline" 
                                        value={noOfStocks}
                                        readOnly
                                    />

                                    <span className="btn btn-primary plus" onClick={increseQuantity}>+</span>
                                </div>
                                    <button onClick={() => {
                                        dispatch(addToCart(product._id, noOfStocks))
                                        toast("Item added to cart", {
                                            type : 'success',
                                            position : 'top-center'
                                        })
                                        }} disabled={product.stock === 0 ? true : false} type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

                                <hr />

                                <p>Status: <span style={{color : `${product.stock > 0 ? 'green' : 'red'}`}} id="stock_status">{product.stock > 0 ? 'In Stock' : 'Out Of Stock'}</span></p>

                                <hr />

                                <h4 className="mt-2">Description:</h4>
                                <p>{product.description}</p>
                                <hr />
                                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                                {
                                    user ? (
                                        <button id="review_btn" type="button" className="btn btn-primary mt-4" onClick={handleShow}>
                                            Submit Your Review
                                        </button>
                                    ) : (
                                        <div className='alert alert-danger mt-5'>Login to post your reviews !</div>
                                    )
                                }
                                
                                <div className="row mt-2 mb-5">
                                    <div className="rating w-50">
                                        <Modal show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Submit Review</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                            <div className="modal-body">
                                                <ul className="stars">
                                                    {
                                                        [1, 2, 3, 4, 5].map(star => (
                                                            <li 
                                                            key={star}
                                                            value={star}
                                                            onClick={() => setRating(star)}
                                                            className={`star ${star <= rating ? 'orange' : ''}`}
                                                            onMouseOver={(e) => e.target.classList.add('yellow')}
                                                            onMouseOut={(e) => e.target.classList.remove('yellow')}
                                                            >
                                                            <i className="fa fa-star"></i></li>
                                                        ))
                                                    }
                                                </ul>
                                                <textarea name="review" id="review" className="form-control mt-3" onChange={(e) => setComment(e.target.value)}>
                                                </textarea>

                                                <button className="btn my-3 float-right review-btn px-4 text-white" onClick={handleSubmit}>Submit</button>
                                                </div>
                                            </Modal.Body>
                                        </Modal>
                                    </div>		
                                </div>
                            </div>
                        </div>
                        {
                            product.reviews && product.reviews.length > 0 ? (
                                <ProductReview reviews={product.reviews}/>
                            ) : null
                        }
                    </Fragment>
            )
        }
    </Fragment>
  )
}

export default ProductDetails