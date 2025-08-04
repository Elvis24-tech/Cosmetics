import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);         // Call context addToCart
    setIsAdded(true);           // Set feedback state

    setTimeout(() => {
      setIsAdded(false);        // Clear feedback after 2 sec
    }, 2000);
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded"
      />
      <h3 className="mt-2 text-lg font-semibold text-pink-700">{product.name}</h3>
      <p className="text-gray-600 text-sm">{product.description.slice(0, 50)}...</p>
      <p className="text-pink-600 font-bold mt-1">Ksh {product.price}</p>

      <div className="mt-3 flex justify-between gap-2">
        <button
          onClick={handleAddToCart}
          className={`text-sm px-3 py-1 rounded ${
            isAdded ? 'bg-green-700' : 'bg-green-500 hover:bg-green-600'
          } text-white transition`}
        >
          {isAdded ? '✔ Added' : 'Add to Cart'}
        </button>

        <Link
          to={`/products/${product.id}`}
          className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
