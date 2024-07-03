import { useDispatch, useSelector } from "react-redux"
import { onAddNewProduct, onDeleteProduct, onLoadProducts, onUpdateProduct } from "../store/products/productSlice";

const URL_BACKEND = import.meta.env.VITE_BACKEND_URL
const API_URL = `${URL_BACKEND}/api/product`
export const useProductStore = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product);

    const startLoadingProducts = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            dispatch(onLoadProducts(data));
        } catch (error) {
            console.log("Error loading products")
        }
    }

    const startSavingProduct = async (product) => {
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            const data = await res.json();
            dispatch(onAddNewProduct(data));
        } catch (error) {
            console.log("Error saving product");
        }
    }

    const startUpdatintProduct = async (product) => {
        try {
            const res = await fetch(`${API_URL}/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            const data = await res.json();
            dispatch(onUpdateProduct(data));
        } catch (error) {
            console.log("Error saving product");
        }
    }

    const startDeletingProduct = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            dispatch(onDeleteProduct(id));
        } catch (error) {
            console.log("Error saving product");
        }
    }

    return {
        products,
        startLoadingProducts,
        startSavingProduct,
        startUpdatintProduct,
        startDeletingProduct
    }
}
