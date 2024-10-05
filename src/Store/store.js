import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./Reducers/cartReducer";
import CartProductReducer from "./Reducers/CartProductReducer";

const storeToStorageMiddleware = (props) => {
    return (next) => {
        return (event) => {
            const result = next(event);

            console.log(props.getState());

            localStorage.setItem("store", JSON.stringify(props.getState()));

            return result;
        };
    };
};

const loadFromStorage = () => {
    if (localStorage.getItem("store") !== null) {
        return JSON.parse(localStorage.getItem("store"));
    }
};

const store = configureStore({
    reducer: {
        CartReducer,
        CartProductReducer
    },
    devTools: true,
    middleware: (defaultMiddlewaresFn) => {
        return [...defaultMiddlewaresFn(), storeToStorageMiddleware];
    },
    preloadedState: loadFromStorage(),
})

export default store