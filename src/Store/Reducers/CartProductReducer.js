const initialState = {
    initialTotalPrice: 0,
    totalPrice: 0,
    quantity: 1,
    productPrice: 0
};

const CartProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case "set_total_price":
            return {
                ...state,
                totalPrice: action.totalPrice,
            };
        case "set_initial_total_price":
            {
                return {
                    ...state,
                    initialTotalPrice: action.initialTotalPrice,
                };
            };
        case "set_quantity":
            {
                return {
                    ...state,
                    quantity: action.quantity,
                };
            };
        case "set_product_price":
            {
                return {
                    ...state,
                    productPrice: action.productPrice,
                };
            };
        case "cart_reset":
            return initialState;
        default:
            return state;
    }
};

export default CartProductReducer;