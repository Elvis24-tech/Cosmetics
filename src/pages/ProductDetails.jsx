import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/productData';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  if (!product) return <p className="text-center p-6">Product not found.</p>;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        className="mb-4 bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
        onClick={() => navigate('/products')}
      >
        ← Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <img src={product.image} alt={product.name} className="w-full rounded shadow" />
        <div>
          <h2 className="text-3xl font-bold text-pink-700">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl mt-4 font-semibold">Ksh {product.price}</p>
          <p className="text-yellow-500 mt-2">⭐ {product.rating} / 5</p>

          <button
            className={`mt-4 px-6 py-2 rounded text-white ${
              added ? 'bg-green-700 cursor-default' : 'bg-green-500 hover:bg-green-600'
            }`}
            onClick={!added ? handleAddToCart : undefined}
          >
            {added ? '✔ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
