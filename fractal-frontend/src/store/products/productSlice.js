import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        isLoadingProducts: true,
        products: []
    },
    reducers: {
        onAddNewProduct: (state, { payload = {} }) => {
            state.products.push(payload);
        },
        onUpdateProduct: (state, { payload = {} }) => {
            state.products = state.products.map(product => {
                if (product.id === payload.id) {
                    return {
                        ...product,
                        "name": payload.name,
                        "price": payload.price
                    }
                }
                return product;
            })
        },
        onDeleteProduct: (state, { payload }) => {
            state.products = state.products.filter(product => product.id !== payload)
        },
        onLoadProducts: (state, { payload = [] }) => {
            state.isLoadingProducts = false;
            payload.forEach(product => {
                const exists = state.products.some(dbProduct => dbProduct.id === product.id);
                if (!exists) {
                    state.products.push(product);
                }
            });
        },
    }
})

export const {
    onLoadProducts,
    onDeleteProduct,
    onAddNewProduct,
    onUpdateProduct,
} = productSlice.actions;