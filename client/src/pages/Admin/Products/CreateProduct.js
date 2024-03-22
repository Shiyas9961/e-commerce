import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createNewProduct } from '../../../actions/productActions'
import Loader from '../../Loader'
import { toast } from 'react-toastify'
import { clearIsProductSubmitted, clearProductError } from '../../../slices/productSlice'

const CreateProduct = () => {
    const [ name, setName ] = useState('')
    const [ price, setPrice ] = useState('')
    const [ description, setDescription] = useState('')
    const [ category, setCategory] = useState('')
    const [ stock, setStock] = useState(0)
    const [ seller, setSeller ] = useState('')
    const [ images, setImages ] = useState([])
    const [ imagePreview, setImagePreview ] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, error, isProductCreated } = useSelector( state => state.productState)

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


    useEffect(() => {
        if(isProductCreated){
            toast("New Product created successfully", {
                type : 'success',
                position : 'top-center',
                onOpen : () => dispatch(clearIsProductSubmitted())
            })
            navigate('/admin/products')
            return
        }
        if(error){
            toast(error, {
                type : 'error',
                position : 'top-center',
                onOpen : () => dispatch(clearProductError())
            })
            return
        }
    }, [isProductCreated, error, dispatch, navigate])

    const handleImageChange = (e) => {

        const files = Array.from(e.target.files)    

        files.forEach(file => {
            const reader = new FileReader()

            reader.onload = () => {
                if(reader.readyState === 2){
                    setImagePreview(oldArr => [...oldArr, reader.result])
                    setImages(oldArr => [...oldArr, file])
                }
            }

            reader.readAsDataURL(file)
        })

        
    }

    const handleSubmit = (e) => {

        e.preventDefault()

        const formData = new FormData()

        formData.append('name', name)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('category', category)
        formData.append('seller', seller)
        formData.append('stock', stock)
        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(createNewProduct(formData))
    }

    if(loading){
        return <Loader/>
    }


  return (
    <div className='row'>
        <div className='col-12 col-md-2'>
            <Sidebar/>
        </div>
        <div className='col-12 col-md-10'>
            <div className="wrapper my-3"> 
                <form onSubmit={handleSubmit} className="shadow-lg" encType="multipart/form-data">
                    <h1 className="mb-4">New Product</h1>
                    <div className="form-group">
                    <label htmlFor="name_field">Name</label>
                    <input 
                        type="text" 
                        id="name_field" 
                        className="form-control" 
                        value={name}
                        onChange={e => setName(e.target.value)} 
                    />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price_field">Price</label>
                        <input 
                            type="text" 
                            id="price_field" 
                            className="form-control" 
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description_field">Description</label>
                        <textarea 
                            className="form-control" 
                            id="description_field" 
                            rows="8"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="category_field">Category</label>
                        <select 
                            value={category} 
                            onChange={e => setCategory(e.target.value)} className="form-control" 
                            id="category_field"
                        >
                            <option>Select</option>
                            {
                                categories.map((categ,index) => (
                                    <option key={index} value={categ}>{categ}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock_field">Stock</label>
                        <input 
                        type="number" 
                        id="stock_field" 
                        className="form-control" 
                        value={stock}
                        onChange={e => setStock(e.target.value)} 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="seller_field">Seller Name</label>
                        <input 
                            type="text" 
                            id="seller_field" 
                            className="form-control" 
                            value={seller}
                            onChange={e => setSeller(e.target.value)} 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor='customFiile'>Images</label>
                        
                            <div className="custom-file">
                                <input 
                                type="file" 
                                name="product_images" 
                                className="custom-file-input" 
                                id="customFile" 
                                multiple=""
                                onChange={handleImageChange} 
                            />
                                <label className="custom-file-label" htmlFor="customFile">
                                    Choose Images
                                </label>
                            </div>
                            {
                                imagePreview.map((image, index) => (
                                    <img 
                                        key={index}
                                        className='mt-3 mr-2'
                                        src={image} 
                                        alt="Product Privew"
                                        width="55"
                                        height="52"
                                    />
                                ))
                            }
                    </div>

        
                    <button id="login_button" type="submit" className="btn btn-block py-3">
                    CREATE
                    </button>

                </form>
            </div>
        </div>
    </div>
  )
}

export default CreateProduct