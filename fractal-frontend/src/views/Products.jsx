import { useEffect, useState } from "react"
import { useProductStore } from "../hooks/useProductStore"
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

export const Products = () => {
    const { products, startLoadingProducts, startDeletingProduct, startSavingProduct, startUpdatintProduct } = useProductStore();
    const [form, setForm] = useState({ name: "", price: 0 });
    const [editingProductId, setEditingProductId] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingProductId) {
            await startUpdatintProduct({ ...form, id: editingProductId });
        } else {
            await startSavingProduct(form);
        }
        setForm({ name: "", price: 0 });
        setEditingProductId(null);
    }
    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleDelete = async (id) => {
        Swal.fire({
            title: `<strong>Delete Product</strong>`,
            icon: "warning",
            html: `
              Are you sure to delete this product?
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
                await startDeletingProduct(id);
                //startLoadingProducts();
            }
        });
    }

    const handleEdit = (product) => {
        setForm({
            name: product.name,
            price: product.price
        });
        setEditingProductId(product.id);
    };
    useEffect(() => {
        startLoadingProducts();
    }, [])

    return (
        <div className="container">
            <h1>Products</h1>
            <form className="mb-2" onSubmit={handleSubmit}>
                <label className="form-label">Name</label>
                <input className="form-control" type="text" name="name" value={form.name} onChange={handleFormChange} />
                <label className="form-label">Price</label>
                <input className="form-control" type="number" name="price" value={form.price} onChange={handleFormChange} />
                <button className="btn btn-success mt-2" type="submit">Create</button>
            </form>
            {
                products.length == 0 ? (<div> No items</div>) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products?.map(product => (
                                    <tr key={product.id}>
                                        <th scope="row">{product.id}</th>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td className="d-flex gap-2">
                                            <button className="btn btn-warning" onClick={() => { handleEdit(product) }}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => { handleDelete(product.id) }}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )
            }
            <div className="d-flex justify-content-center">
                <Link className="btn btn-info" to={"/"}>Go back</Link>
            </div>

        </div>
    )
}