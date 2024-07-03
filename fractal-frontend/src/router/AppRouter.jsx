import { Navigate, Route, Routes } from "react-router-dom"
import { MyOrders } from "../views/MyOrders"
import { AddEditOrder } from "../views/AddEditOrder"
import { Products } from "../views/Products"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/add-order/:id?" element={<AddEditOrder />} />
            <Route path="/products" element={<Products />} />
            <Route path="/*" element={<Navigate to="/my-orders" />} />
        </Routes>
    )
}