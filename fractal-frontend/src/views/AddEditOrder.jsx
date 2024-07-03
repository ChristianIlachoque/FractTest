import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useOrderStore } from '../hooks/useOrderStore';
import { useProductStore } from '../hooks/useProductStore';
import { ProductModal } from '../components/ProductModal';

export const AddEditOrder = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [order, setOrder] = useState({
        id: "",
        date: new Date().toISOString().split('T')[0],
        number: "",
        status: "",
        products: [],
        finalPrice: 0
    });
    const { startSavingOrder, startUpdatingOrder, startGetOrderById, currentOrder } = useOrderStore();
    const [productSelecet, setProductSelected] = useState();
    const { startLoadingProducts } = useProductStore();

    const handleAddProduct = () => {
        setIsProductModalOpen(true);
    }
    const handleEditProduct = (product) => {
        setProductSelected(product);
        setIsProductModalOpen(true);
    }
    const handleRemoveProduct = (id) => {
        setOrder({
            ...order,
            products: order.products.filter(p => p.id != id)
        })
    }
    const handleSaveProduct = (product) => {
        setOrder({
            ...order,
            products: [...order.products, product],
        })
    }

    const handleSaveChangesProduct = (product) => {
        setOrder({
            ...order,
            products: order.products.map(p => {
                if (p.id == product.id) {
                    return {
                        ...p,
                        name: product.name,
                        price: product.price,
                        quantity: product.quantity,
                    }
                }
                return p;
            }),
        })
    }

    const handleSaveOrder = async () => {
        const dataOrder = {
            number: Number(order.number),
            date: new Date().toISOString().split('T')[0],
            status: order.status,
            products: order.products.map(p => ({
                productId: Number(p.id),
                quantity: Number(p.quantity)
            }))
        }
        if (id) {
            if(currentOrder.status == "COMPLETED") {
                return
            };
            await startUpdatingOrder(id, dataOrder);
        } else {
            await startSavingOrder(dataOrder);
        }
        navigate("/")
    }


    useEffect(() => {
        startLoadingProducts();
        if (id) {
            startGetOrderById(id);
        }
    }, []);


    useEffect(() => {
        if (currentOrder) {
            setOrder({
                id: currentOrder.id || "",
                date: currentOrder.date || new Date().toISOString().split('T')[0],
                number: currentOrder.number || "",
                status: currentOrder.status || "",
                products: currentOrder.products || [],
                finalPrice: currentOrder.finalPrice || 0,
            });
        }
    }, [currentOrder])

    const handleStatusChange = (e) => {
        setOrder({ ...order, status: e.target.value });
    };

    return (
        <div className='container' >
            <h1>{id ? 'Edit Order' : 'Add Order'}</h1>
            <form>
                <label>Order #</label>
                <input
                    className='form-control'
                    type="text"
                    value={order.number}
                    onChange={(e) => setOrder({ ...order, number: e.target.value })}
                />
                <label>Date</label>
                <input className='form-control' type="text" value={order?.date?.split('T')[0]} disabled />
                <label># Products</label>
                <input className='form-control' type="text" value={order?.products?.length} disabled />
                <label>Final Price</label>
                <input className='form-control' type="text" value={id ? order?.products?.reduce((acc, p) => acc + p.price * p.quantity, 0) : order?.products?.reduce((acc, p) => acc + p.price * p.quantity, 0)} disabled />
                <label>Status</label>
                <select className='form-select' value={order.status} onChange={handleStatusChange}>
                    <option value="">Seleccione estado</option>
                    <option value={"PENDING"}>PENDING</option>
                    <option value={"IN_PROGRESS"}>IN_PROGRESS</option>
                    <option value={"COMPLETED"}>COMPLETED</option>
                </select>
            </form>
            <br />
            <button className='btn btn-success' onClick={handleAddProduct}>Add Product</button>
            <br />
            <br />
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {order?.products?.map((product) => (
                        <tr key={product.id}>
                            <td scope="row">{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{id ? product.price * product.quantity : product.price * product.quantity}</td>
                            <td className="d-flex gap-2">
                                <button className='btn btn-warning' onClick={() => handleEditProduct(product)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <div className="d-flex justify-content-around">
                <button className='btn btn-primary' onClick={handleSaveOrder} disabled={currentOrder.status == "COMPLETED"}>{id ? 'Save Order' : 'Create Order'}</button>
                <Link className="btn btn-info" to={"/"}>Cancel</Link>
            </div>

            <ProductModal isOpen={isProductModalOpen}
                onRequestClose={() => {
                    setIsProductModalOpen(false);
                    //setProductSelected(null);
                }}
                onSave={handleSaveProduct}
                onSaveChanges={handleSaveChangesProduct}
                product={productSelecet}
            />
        </div >
    );
};
