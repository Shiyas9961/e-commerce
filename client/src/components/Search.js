import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Search = () => {

    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const handleSearchClick = (e) => {
        e.preventDefault()
        if(keyword === '') return

        e.preventDefault()
        navigate(`/search/${keyword}`)
    }

    useEffect(() => {
        const clearKeyword = () => {
            if(location.pathname === '/'){
                setKeyword('')
            }
        }
        clearKeyword()
    },[location])

  return (
    <form onSubmit={handleSearchClick}>
        <div className="input-group">
            <input 
                type="text" 
                id="search_field" 
                className="form-control" 
                placeholder="Enter Product Name ..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />

            <div className="input-group-append">
                <button id="search_btn" className="btn btn">
                <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </form>
  )
}

export default Search