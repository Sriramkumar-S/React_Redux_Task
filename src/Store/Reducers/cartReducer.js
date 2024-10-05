const initialState = {
    products: [],
    totalProducts: 0,
};

const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "product_add_to_cart":
            return {
                ...state,
                products: [...state.products, action.product],
                totalProducts: state.totalProducts + 1,
            };
        case "remove_from_cart":
            {
                const tempProducts = [...state.products].filter(element => element.id !== action.productId)
                return {
                    ...state,
                    products: tempProducts,
                    totalProducts: state.totalProducts - 1
                };
            }
        case "cart_reset":
            return initialState;
        default:
            return state;
    }
};

export default CartReducer;