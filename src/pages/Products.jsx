import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [addedProductIds, setAddedProductIds] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/products/');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedProductIds((prev) => [...prev, product.id]);
    setTimeout(() => {
      setAddedProductIds((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-pink-600">All Products</h2>
        <button
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {products.map((product) => {
          const isAdded = addedProductIds.includes(product.id);
          return (
            <div key={product.id} className="border p-4 rounded-lg shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-bold mt-3">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="mt-1 font-semibold">Ksh {product.price}</p>

              <div className="mt-2 flex gap-2">
                <button
                  className={`px-4 py-1 rounded text-white ${
                    isAdded
                      ? 'bg-green-700 cursor-default'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                  onClick={() => !isAdded && handleAddToCart(product)}
                >
                  {isAdded ? '✔ Added' : 'Add to Cart'}
                </button>

                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  View
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
