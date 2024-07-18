import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        isLoadingOrders: true,
        orders: [],
        isLoadingOrder: true,
        currentOrder: {}
    },
    reducers: {
        onLoadOrders: (state, { payload = [] }) => {
            state.isLoadingOrders = false;
            state.orders = payload.map(p => p);
        },
        onGetOrderById: (state, { payload = {} }) => {
            state.currentOrder = payload;
        },
        onAddNewOrder: (state, { payload }) => {
            state.orders.push(payload);
        },
        onDeleteOrder: (state, { payload }) => {
            state.orders = state.orders.filter(order => order.id !== payload)
        },
    }
})

export const {
    onLoadOrders,
    onAddNewOrder,
    onDeleteOrder,
    onGetOrderById,
    currentOrder,
} = orderSlice.actions;