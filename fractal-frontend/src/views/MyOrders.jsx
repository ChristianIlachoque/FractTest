import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { Link, useNavigate } from "react-router-dom";
import { useOrderStore } from "../hooks/useOrderStore";

export const MyOrders = () => {
    const { orders, startDeletingOrder, startLoadingOrders } = useOrderStore();

    useEffect(() => {
        startLoadingOrders()
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: `<strong>Delete Orden</strong>`,
            icon: "warning",
            html: `
              Are you sure to delete this order?
            `,
            showCloseButton: false,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: `
              Yes
            `,
            confirmButtonAriaLabel: "Thumbs up, great!",
            cancelButtonText: `
              No
            `,
            cancelButtonAriaLabel: "Thumbs down",
            preConfirm: async () => {
                await startDeletingOrder(id);
            }
        });
    };

    return (
        <div className="container">
            <h1>My Orders</h1>
            <Link className="btn btn-success" to="/add-order">
                Add New Order
            </Link>

            {
                orders.length == 0 ? (<div>No Items</div>) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Order #</th>
                                <th scope="col">Date</th>
                                <th scope="col"># Products</th>
                                <th scope="col">Final Price</th>
                                <th scope="col">Options</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map(order => (
                                    <tr key={order.id}>
                                        <td scope="row">{order.id}</td>
                                        <td>{order.number}</td>
                                        <td>{order.date.substring(0, 10)}</td>
                                        <td>{order.products.length}</td>
                                        <td>{order.products.reduce((total, p) => ((p.price * p.quantity) + total), 0)}</td>
                                        <td className="d-flex gap-2">
                                            <Link
                                                className="btn btn-warning"
                                                style={{
                                                    pointerEvents: order.status === 'COMPLETED' ? 'none' : 'auto', backgroundColor: order.status === 'COMPLETED' ? '#ffffdf' : '#ffc107'
                                                }} to={`/add-order/${order.id}`}
                                            >
                                                Edit
                                            </Link>
                                            <button className="btn btn-danger" onClick={() => handleDelete(order.id)}>Delete</button>
                                        </td>
                                        <td>{order.status}</td>
                                    </tr>
                                )
                                )}
                        </tbody>
                    </table>
                )
            }

        </div>
    );
}