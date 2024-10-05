import PropTypes from 'prop-types'


// eslint-disable-next-line no-unused-vars
const Product = ({ id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images, addToCart, removeFromCart, isAddedToCart }) => {
    // id, title, description, price, discountPercentage, rating, stock, brand category, thumbnail, images
    return (
        <>
            <div className="col-lg-4" style={{ padding: '1rem' }}>
                <div className="card" style={{ width: '18rem', marginLeft: '3rem', height: '43rem' }}>
                    <img src={thumbnail} className="card-img-top" alt={title} style={{ height: '250px', objectFit: 'contain', width: 'auto' }} />
                    <div className="card-body" style={{ textAlign: 'left', padding: '1rem 0', position: 'relative' }}>
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <div style={{ position: 'absolute', bottom: '0rem', width: '100%' }}>
                            <p className="card-text"><b>Brand:</b> {brand}</p>
                            <p className="card-text"><b>Rating:</b> {rating}</p>
                            <p className="card-text"><b>Stock:</b> {stock}</p>
                            <p className="card-text"><b>Price: $</b><span style={{ textDecoration: 'line-through' }}>{price}</span>&nbsp;${price - (price * (discountPercentage / 100)).toFixed(0)}</p>
                            {(isAddedToCart) ? <button onClick={() => removeFromCart(id)} type="button" className="btn btn-danger" style={{ float: 'right' }}>
                                Remove from cart</button> : <button onClick={() => addToCart(id)} type="button" className="btn btn-danger" style={{ float: 'right' }}>
                                Add to cart</button>}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Product.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    discountPercentage: PropTypes.number,
    rating: PropTypes.number,
    stock: PropTypes.number,
    brand: PropTypes.string,
    category: PropTypes.string,
    thumbnail: PropTypes.string,
    images: PropTypes.array,
    addToCart: PropTypes.func,
    removeFromCart: PropTypes.func,
    isAddedToCart: PropTypes.bool
}

export default Product