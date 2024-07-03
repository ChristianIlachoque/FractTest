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
            // payload.forEach(order => {
            //     const exists = state.orders.some(dbOrder => dbOrder.id === order.id);
            //     if (!exists) {
            //         state.orders.push(order);
            //     }
            // });
            state.orders = payload.map(p => p);
        },
        onGetOrderById: (state, { payload = {} }) => {
            state.currentOrder = payload;
        },
        onAddNewOrder: (state, { payload }) => {
            state.orders.push(payload);
        },
        onUpdateOrder: (state, { payload }) => {
            // state.orders = state.orders.map(order => {
            //     if (order.id === payload.id && payload.other) {
            //         return {
            //             ...order,
            //             "round_was_raffled": payload.round_was_raffled,
            //             "is_blocked": payload.is_blocked
            //         }
            //     } else if (order.id === payload.id) {

            //         return payload;
            //     }
            //     return order;
            // })
        },
        onDeleteOrder: (state, { payload }) => {
            state.orders = state.orders.filter(order => order.id !== payload)
        },
    }
})

export const {
    onLoadOrders,
    onAddNewOrder,
    onUpdateOrder,
    onDeleteOrder,
    onGetOrderById,
    currentOrder,
} = orderSlice.actions;