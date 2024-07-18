/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useProductStore } from "../hooks/useProductStore";

const customStyles = {
    content: {
        width: '600px',
        height: '480px',
        margin: 'auto',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        padding: '20px',
    },
};


export const ProductModal = ({ isOpen, onRequestClose, onSave, onSaveChanges, product }) => {
    const { products } = useProductStore();
    const [productData, setProductData] = useState({
        id: '',
        name: '',
        price: 0,
        quantity: 1,
        totalPrice: 0,
    });
    const [idProductEditing, setIdProductEditing] = useState(null);

    useEffect(() => {
        if (product) {
            setProductData(product);
            console.log("p m", product);
        }
    }, [product]);

    const handleSave = () => {
        onSave(productData);
        setProductData({
            id: '',
            name: '',
            price: 0,
            quantity: 1,
            totalPrice: 0,
        });
        onRequestClose();
    };

    const handleSaveChanges = () => {
        console.log("s c pr", productData);
        onSaveChanges(idProductEditing, productData);
        setProductData({
            id: '',
            name: '',
            price: 0,
            quantity: 1,
            totalPrice: 0,
        });
        setIdProductEditing(null);
        onRequestClose();
    }

    const onChangeProduct = (e) => {
        console.log("m change product", {
            ...productData,
            id: e.target.value,
            name: products.find(p => p.id == e.target.value).name,
            price: products.find(p => p.id == e.target.value).price
        })
        setIdProductEditing(productData.id);
        setProductData({
            ...productData,
            id: Number(e.target.value),
            name: products.find(p => p.id == e.target.value).name,
            price: products.find(p => p.id == e.target.value).price
        })
    }
    const onChangeQuantity = (e) => {
        setProductData({
            ...productData,
            quantity: e.target.value,
            totalPrice: e.target.value * productData.price
        })
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false} style={customStyles}>
            <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
            <form>
                <label className='form-label'>Name</label>
                <select className='form-select' onChange={onChangeProduct} value={productData.id}>
                    <option value="">Seleccione un Producto</option>
                    {
                        products.map(product => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                        ))
                    }
                </select>
                <label className='form-label'>Unit Price</label>
                <input
                    className="form-control"
                    type="number"
                    value={productData.price}
                    onChange={(e) => setProductData({ ...productData, price: parseFloat(e.target.value) })}
                    disabled
                />
                <label className='form-label'>Quantity</label>
                <input
                    className="form-control"
                    type="number"
                    value={productData.quantity}
                    onChange={onChangeQuantity}
                />
                <label className='form-label'>Total Price</label>
                <input
                    className="form-control"
                    type="number"
                    value={productData.price * productData.quantity}
                    disabled
                />
            </form>
            <br />
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary" onClick={product ? handleSaveChanges : handleSave}>{product ? "Save Changes" : "Save"}</button>
            </div>
        </Modal>
    );
};