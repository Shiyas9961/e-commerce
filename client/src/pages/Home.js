import React, { Fragment, useEffect, useState } from 'react'
import SetTitle from '../components/SetTitle'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productsActions'
import Loader from './Loader'
import Product from '../components/Product'
import { toast } from 'react-toastify'
import Pagination from 'react-js-pagination'

const Home = () => {
    const dispatch = useDispatch()
    const [ currentPage, setCurrentPage ] = useState(1)
    const { products, loading, error, totalProductsCount, resultPerPage } = useSelector((state) => state.productsState)

    //console.log(currentPage)

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
        dispatch(getProducts(null, null, null, null, currentPage))
    }, [error, dispatch, currentPage])

    if(loading){
        return (
            <Loader/>
        )
    }

  return (
    <Fragment>
        <SetTitle title={"Buy Best Products"}/>
        <h1 id="products_heading">Latest Products</h1>
        <section id="products" className="container mt-5">
            <div className="row justify-content-center">

                {
                    products && products.map(product => {
                        return (
                            <Product col={3} key={product._id} product={product}/>
                        )
                    })
                }
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

export default Home