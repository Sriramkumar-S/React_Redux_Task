
import { useEffect, useRef } from 'react'
// import CartContext from '../../Context/CartContext'
import Carts from './Carts'

import { useDispatch, useSelector } from "react-redux"

const CartPage = () => {

    const cartData = useSelector((store) => store.CartReducer)
    const cartPageData = useSelector((store) => store.CartProductReducer)
    const dispatch = useDispatch()

    const sumOfPrice = cartData.products.reduce((acc, curr) => acc + curr.price, 0)

    const updatePrice = (initalQty, newQty, price) => {
        const totalPrice = (newQty > initalQty) ? (cartPageData.totalPrice + (price * newQty) - (initalQty * price)) : (cartPageData.totalPrice - (initalQty * price) + (price * newQty))
        // const totalPrice = (newQty > initalQty) ? (cartPageData.initialTotalPrice + (price * newQty)) : (cartPageData.initialTotalPrice + (price * newQty))
        dispatch({ type: 'set_total_price', totalPrice: totalPrice });
        dispatch({ type: 'set_initial_total_price', initialTotalPrice: cartPageData.initialTotalPrice })

        // const totalPrice = (newQty > initalQty) ? (initialTotalPrice + (price * newQty) - (initalQty * price)) : (initialTotalPrice - (initalQty * price) + (price * newQty))
        // setTotalPrice(totalPrice);
        // setInitialTotalPrice(totalPrice);
    }
    console.log(cartData, cartPageData, sumOfPrice)
    //     const productObj = useContext(CartContext)
    //     const [initialTotalPrice, setInitialTotalPrice] = useState(sumOfPrice)

    //     const [totalPrice, setTotalPrice] = useState(initialTotalPrice)

    const isRemovedUseRef = useRef(false);

    // useEffect(() => {
    //     setTotalPrice(initialTotalPrice)
    // }, [initialTotalPrice])

    // useEffect(() => {
    //     if (!isRemovedUseRef) {
    //         setInitialTotalPrice(sumOfPrice)
    //     }
    // }, [sumOfPrice])

    useEffect(() => {
        dispatch({ type: 'set_total_price', totalPrice: cartPageData.initialTotalPrice })

    }, [cartPageData.initialTotalPrice, dispatch])

    useEffect(() => {
        if (!isRemovedUseRef.current) {
            dispatch({ type: 'set_initial_total_price', initialTotalPrice: sumOfPrice })
        }

    }, [dispatch, sumOfPrice])

    const removeProduct = (id, price) => {
        dispatch({ type: 'set_initial_total_price', initialTotalPrice: cartPageData.totalPrice - price })
        isRemovedUseRef.current = true;
        dispatch({ type: 'remove_from_cart', productId: id })

        // setInitialTotalPrice(initialTotalPrice - price)
        // isRemovedUseRef.current = true;
        // productObj.removeFromCart(id)
    }

    return (
        <>
            <div className="main-div">
                <div className="container">
                    <div className="row">
                        {cartData.products.map(element => (
                            <Carts key={element.id} {...element} updatePrice={updatePrice} removeProduct={removeProduct} />
                        ))}
                        <div>
                            <p style={{ float: 'left' }}><b>SUB TOTAL:</b> <span style={{ marginLeft: '60rem' }}><b>$ {cartPageData.totalPrice.toFixed(2)}</b></span></p>
                            <p style={{ float: 'left' }}><b>SHIPPING:</b> <span style={{ marginLeft: '61rem' }}><b>FREE</b></span></p>
                        </div>
                        <hr />
                        <div>
                            <p style={{ float: 'left' }}><b>TOTAL:</b> <span style={{ marginLeft: '62rem' }}><b>$ {cartPageData.totalPrice.toFixed(2)}</b></span></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartPage