import PropTypes from 'prop-types'
import { useRef, useState } from 'react';

const Carts = ({ id, title, description, price, rating, stock, brand, category, thumbnail, updatePrice, removeProduct }) => {

    const qty = [1, 2, 3, 4, 5];
    let initialQuantity = 1;

    const quantityRef = useRef(initialQuantity);

    const [productPrice, setPrice] = useState(price)
    const [quantity, setQuantity] = useState(1)

    const onQuantityChange = (qty) => {
        quantityRef.current = quantity;
        setQuantity(qty)
        setPrice(qty * price);

        updatePrice(quantityRef.current, Number(qty), price)
    }

    const removeFromCart = (id) => {
        // console.log(id)
        removeProduct(id, productPrice)
    }

    return (
        <>

            <div className="col-lg-12" >

                <div style={{ backgroundColor: 'silver', border: '1px solid', margin: '1rem 0', padding: '1rem', display: 'flex' }}>
                    <img src={thumbnail} alt={title} style={{ width: 350, height: 350, objectFit: 'contain', display: 'block' }} />
                    <div style={{ width: '30rem' }}>
                        <h5 style={{ textAlign: 'left', padding: '1rem' }}>{title}</h5>
                        <p style={{ textAlign: 'left', padding: '1rem' }}>{description}</p>
                        <p style={{ textAlign: 'left', padding: '1rem' }}><b>Category:</b> {category}</p>
                        <p style={{ textAlign: 'left', padding: '1rem' }}><b>Rating:</b> {rating}</p>
                        <p style={{ textAlign: 'left', padding: '1rem' }}><b>Brand:</b> {brand}</p>
                        <p style={{ textAlign: 'left', padding: '1rem' }}><b>Stock:</b> {stock}</p>
                    </div>
                    <div style={{ width: '20rem' }}>
                        <select value={quantity} onChange={(e) => onQuantityChange(e.target.value)}>
                            {qty.map(element => (
                                <option value={element} key={element}>{element}</option>
                            ))}
                        </select>
                        <p style={{ textAlign: 'left', padding: '1rem', display: 'inline-block', marginLeft: '4rem' }}><b>${productPrice}</b></p>
                        <button onClick={() => removeFromCart(id)} type="button" className="btn btn-danger"
                            style={{ float: 'right', marginTop: '16rem', marginRight: '1rem' }}>
                            Remove from cart
                        </button>
                    </div>
                </div>
                <hr />

            </div>
        </>
    )
}

Carts.propTypes = {
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
    updatePrice: PropTypes.func,
    removeProduct: PropTypes.func,
}

export default Carts