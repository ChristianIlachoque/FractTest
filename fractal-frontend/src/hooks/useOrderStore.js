import { useDispatch, useSelector } from "react-redux";
import { onDeleteOrder, onLoadOrders, onGetOrderById, onAddNewOrder, onResetCurrentOrder } from "../store/orders/orderSlice";

const URL_BACKEND = import.meta.env.VITE_BACKEND_URL
const API_URL = `${URL_BACKEND}/api/order`
export const useOrderStore = () => {
    const dispatch = useDispatch();
    const { orders, currentOrder } = useSelector((state) => state.order);

    const startLoadingOrders = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            console.log("back", data)
            dispatch(onLoadOrders(data));
        } catch (error) {
            console.log("Error loading order")
        }
    }

    const startGetOrderById = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`);
            const data = await res.json();
            dispatch(onGetOrderById(data));
        } catch (error) {
            console.log("Error getting order")
        }
    }

    const startSavingOrder = async (order) => {
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
            const data = await res.json();
            dispatch(onAddNewOrder(data));
        } catch (error) {
            console.log("Error saving order");
        }
    }

    const startUpdatingOrder = async (id, order) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
            const data = await res.json();
            console.log("Se actualizo orden", data)
            //dispatch(onAddNewOrder(data));
        } catch (error) {
            console.log("Error saving order");
        }
    }

    const startDeletingOrder = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            dispatch(onDeleteOrder(id));
        } catch (error) {
            console.log("Error saving order");
        }
    }

    const startResetingCurrentOrder = async () => {
        dispatch(onResetCurrentOrder());
    }

    return {
        orders,
        startLoadingOrders,
        startDeletingOrder,
        startGetOrderById,
        startSavingOrder,
        startUpdatingOrder,
        currentOrder,
        startResetingCurrentOrder,
    }
}