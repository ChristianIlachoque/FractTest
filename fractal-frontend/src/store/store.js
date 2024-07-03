import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./products/productSlice";
import { orderSlice } from "./orders/orderSlice";

export const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        order: orderSlice.reducer
    }
})