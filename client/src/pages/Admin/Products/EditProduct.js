import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editProduct, getProduct } from '../../../actions/productActions'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearIsEdited, clearProductError } from '../../../slices/productSlice'
import Loader from '../../Loader'
import Sidebar from '../Sidebar'

const EditProduct = () => {

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState('')
  const [seller, setSeller] = useState('')
  const [images, setImages] = useState([])
  const [imagePriview, setImagePreview] = useState([])
  const [imagesCleared, setImagesCleared] = useState(false)
  const dispatch = useDispatch()
  const { id : productId } = useParams()
  const { product = {}, loading, isProductEdited, error } = useSelector(state => state.productState)

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
    if(isProductEdited){
      toast("Product updated successfully", {
        type : 'success',
        position : 'top-center',
        onOpen : () => dispatch(clearIsEdited())
      })
      setImages([])
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
    dispatch(getProduct(productId))
  },[isProductEdited, dispatch, error, productId])

  useEffect(() => {
    if(product._id){
      setName(product.name)
      setDescription(product.description)
      setPrice(product.price)
      setSeller(product.seller)
      setStock(product.stock)
      setCategory(product.category)
    
      let image = []

      product.images.forEach(img => {
        image.push(img.image)
      })
      setImagePreview(image)
    }
  },[product])

  const handleImagesChange = (event) => {
    const files = Array.from(event.target.files)

    files.forEach(file => {
      const reader = new FileReader()

      reader.onload = () => {
        if(reader.readyState === 2){
          setImagePreview(oldImg => [...oldImg, reader.result])
          setImages(oldImg => [...oldImg, file])
        }
      }

      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData()

    formData.append('name', name)
    formData.append('price', price)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('seller', seller)
    formData.append('stock', stock)
    formData.append('isImagesCleared', imagesCleared)

    images.forEach(img => {
      formData.append('images', img)
    })

    dispatch(editProduct(productId, formData))
  }

  const handleClearImage = () => {
    setImagePreview([])
    setImages([])
    setImagesCleared(true)
  }

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar/>
      </div>
      <div className="col-12 col-md-10">
        {
          loading ? <Loader/> : (
              <div className="wrapper my-5"> 
                <form onSubmit={handleSubmit} className="shadow-lg" encType="multipart/form-data">
                    <h1 className="mb-4">Update Product</h1>

                    <div className="form-group">
                      <label htmlFor="name_field">Name</label>
                      <input 
                        type="text" 
                        id="name_field" 
                        className="form-control" 
                        value={name}
                        onChange={(event) => setName(event.target.value)} 
                      />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price_field">Price</label>
                        <input 
                          type="text" 
                          id="price_field" 
                          className="form-control"
                          value={price}
                          onChange={(event) => setPrice(event.target.value)}   
                        />
                    </div>

                    <div className="form-group">
                    <label htmlFor="description_field">Description</label>
                    <textarea  
                      className="form-control" 
                      id="description_field" 
                      value={description}
                      rows="8"
                      onChange={(event)=>setDescription(event.target.value)}
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="category_field">Category</label>
                    <select onChange={(event) => setCategory(event.target.value)} value={category} className="form-control" id="category_field">
                        {
                          categories.map((each, index) => (
                            <option key={index} value={each}>{each}</option>
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
                      onChange={(event) => setStock(event.target.value)} 
                    />
                    </div>

                    <div className="form-group">
                        <label htmlFor="seller_field">Seller Name</label>
                        <input 
                          type="text" 
                          id="seller_field" 
                          className="form-control"
                          value={seller}
                          onChange={(event) => setSeller(event.target.value)}  
                        />
                    </div>
                      
                    <div className="form-group">
                        <label>Images</label>
                            <div className="custom-file">
                                <input onChange={handleImagesChange} type="file" name="product_images" className="custom-file-input" id="customFile" multiple="" />
                                <label className="custom-file-label" htmlFor="customFile">
                                    Choose Images
                                </label>
                            </div>
                            { 
                            imagePriview.length > 0 && <span className='mr-2' style={{cursor : 'pointer'}} onClick={handleClearImage}><i className='fa fa-trash'></i></span> 
                            }
                            {
                              imagePriview.map((img, index) => (
                                <img 
                                  key={index}
                                  className='mt-3 mr-2'
                                  src={img} 
                                  alt="Product Privew"
                                  width="55"
                                  height="52"
                                />
                              ))
                            }
                    </div>

          
                    <button id="login_button" type="submit" className="btn btn-block py-3">
                      UPDATE
                    </button>
                </form>
              </div>
          )
        }
          
      </div>
    </div>
    
  )
}

export default EditProduct