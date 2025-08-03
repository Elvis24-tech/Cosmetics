import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
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
      <Link
        to={`/products/${product.id}`}
        className="inline-block mt-2 text-sm text-white bg-pink-500 px-3 py-1 rounded hover:bg-pink-600"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
