import { useState } from 'react';
import data from '../../product.json'
import Product from './Product.jsx'
import { useRef } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Products = () => {


    const navigate = useNavigate();

    const copyOfData = [...data.products];
    const [displayData, setDisplayData] = useState(data.products)

    const category = [...new Set(copyOfData.map(element => element.category))]

    const categoryRef = useRef(null)

    const onFilterChange = () => {
        if (categoryRef.current.value !== 'default') {
            const filteredData = copyOfData.filter(element => element.category === categoryRef.current.value);
            setDisplayData(filteredData)
        } else {
            setDisplayData(copyOfData)
        }
    }

    const cartData = useSelector((state) => state.CartReducer);
    // console.log(cartData)

    const dispatch = useDispatch();


    const addToCart = (id) => {
        const selectedProduct = copyOfData.find(element => element.id === id);
        dispatch({ type: 'product_add_to_cart', product: selectedProduct })
    }

    const removeFromCart = (id) => {
        dispatch({ type: 'remove_from_cart', productId: id })
    }

    return (
        <>
            {/* <h1>Products page</h1> */}
            <div className="main-div" style={{ marginTop: '8px' }}>
                <div className="container" >
                    <div className="row">
                        <div className="col-lg-12">
                            <div style={{ border: '1px solid' }}>
                                <div className="col-lg-12" style={{ display: 'flex' }}>
                                    <div className="col-lg-6">
                                        <select ref={categoryRef} onChange={() => onFilterChange()}
                                            style={{ display: 'block', width: '18rem', marginLeft: '4rem', padding: 8, marginTop: '1rem' }}>
                                            <option value={'default'}>--Select Category--</option>
                                            {category.map(element => (
                                                <option value={element} key={element}>{element}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-lg-6">
                                        <button type="button" className="btn btn-danger"
                                            disabled={cartData.totalProducts === 0}
                                            style={{ float: 'right', marginTop: '1rem', marginRight: '3rem' }}
                                            onClick={() => navigate('/cart')}>Cart ({cartData.totalProducts})
                                        </button>
                                    </div>
                                </div>

                                <div className="products" style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {displayData.map((element) => (
                                        <Product
                                            key={element.id}
                                            {...element}
                                            addToCart={addToCart}
                                            removeFromCart={removeFromCart}
                                            isAddedToCart={Boolean(cartData.products.find(e => e.id === element.id))} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Products.propTypes = {
    openCart: PropTypes.func
}

export default Products