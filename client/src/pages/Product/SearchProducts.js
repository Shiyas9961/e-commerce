import React, { Fragment, useEffect, useState } from 'react'
import SetTitle from '../../components/SetTitle'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productsActions'
import Loader from '../Loader'
import Product from '../../components/Product'
import { toast } from 'react-toastify'
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router-dom'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css'

const SearchProducts = () => {
    
    const dispatch = useDispatch()
    const [ currentPage, setCurrentPage ] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [priceChanged, setPriceChanged] = useState(price)
    const [category, setCategory] = useState(null)
    const [rating, setRating] = useState(0)
    const { products, loading, error, totalProductsCount, resultPerPage } = useSelector((state) => state.productsState)

    //console.log(currentPage)

    const categories = [
        'Electronics',
        'Mobile Phones',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const { keyword } = useParams()

    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo)
    }

    useEffect(() => {
        if(error){
            toast.error(error, {
                position : 'top-center'
            })
            return
        }
        dispatch(getProducts(keyword, priceChanged, category, rating, currentPage))
    }, [error, dispatch, currentPage, keyword, priceChanged, category, rating])
    

    if(loading){
        return (
            <Loader/>
        )
    }

  return (
    <Fragment>
        <SetTitle title={"Buy Best Products"}/>
        <h1 id="products_heading">Search Products</h1>
        <section id="products" className="container mt-5">
            <div className="row">
                <div className="col-6 col-md-3 mb-5 mt-5">
                    <div className="px-5" onMouseUp={()=>setPriceChanged(price)}>
                        <Slider
                            range={true}
                            marks={
                                {
                                    1 : "$1",
                                    1000 : "$1000"
                                }
                            }
                            min={1}
                            max={1000}
                            onChange={(price)=>setPrice(price)}
                            defaultValue={price}
                            handleRender={
                                renderProps => {
                                    return (
                                        <Tooltip overlay={`$${renderProps.props['aria-valuenow']}`}>
                                            <div {...renderProps.props}></div>
                                        </Tooltip>
                                    )
                                }
                            }
                        />
                    </div>

                    <hr className='my-5'/>

                    <div className='mt-5'>
                            <h2 className='mb-3'>Categories</h2>
                            <ul className='pl-1' style={{listStyleType : 'none'}}>
                                {
                                    categories.map(each => (
                                        <li 
                                            onClick={()=>setCategory(each)}
                                            style={{cursor : 'pointer'}} 
                                            key={each}>
                                                {each}
                                        </li>
                                    ))
                                }
                            </ul>
                    </div>

                    <hr className='my-5'/>            

                    <div className="mt-5">
                        <h2 className='mb-3'>Ratings</h2>
                        <ul style={{listStyle : 'none'}}>
                                {
                                    [5, 4, 3, 2, 1].map(star => (
                                        <li
                                            onClick={()=>setRating(star)}
                                            style={{cursor : 'pointer'}}
                                            key={star}
                                        >
                                            <div className='rating-outer'>
                                                <div className="rating-inner" style={{width : `${star * 20}%`}}>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                        </ul>
                    </div>
                </div>
                <div className="col-6 col-md-9">
                    <div className="row">
                        {
                            products && products.map(product => {
                                return (
                                    <Product 
                                        col={4} key={product._id} 
                                        product={product}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div> 
        </section>
        <div className="d-flex justify-center mt-5">
            {
                totalProductsCount > 0 && totalProductsCount > resultPerPage ? (
                    <Pagination
                    activePage={currentPage}
                    onChange={setCurrentPageNo}
                    totalItemsCount={totalProductsCount}
                    itemsCountPerPage={resultPerPage}
                    nextPageText={'Next'}
                    lastPageText={'Last'}
                    firstPageText={'First'}
                    itemClass='page-item'
                    linkClass='page-link'
                />
                ) : null
            }
        </div>
    </Fragment>
  )
}

export default SearchProducts