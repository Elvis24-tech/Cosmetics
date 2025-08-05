import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/products/');
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/products/${id}/`);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-green-600">Manage Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">Price: KES {product.price}</p>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProducts;
