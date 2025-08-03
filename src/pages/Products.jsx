import React from 'react';
import products from '../data/productData';
import { useCart } from '../components/context/CartContext';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

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
        {products.map((product) => (
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
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                onClick={() => {
                  console.log("Adding to cart:", product.name);
                  addToCart(product);
                }}
              >
                Add to Cart
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                onClick={() => {
                  console.log("Viewing product:", product.id);
                  navigate(`/products/${product.id}`);
                }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
