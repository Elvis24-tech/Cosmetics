import React, { useState } from 'react';
import axios from 'axios';

const AdminAddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    stock: '',
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('stock', form.stock);
    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(true);
      setForm({ name: '', description: '', price: '', image: null, stock: '' });
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-8 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">Add New Product</h2>

      {success && (
        <div className="mb-4 px-3 py-1.5 rounded bg-green-100 text-green-700 border border-green-400 text-sm text-center">
          Product added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="2"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (KES)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-pink-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
          <div className="flex items-center space-x-3">
            <label className="bg-pink-500 text-white px-3 py-1.5 text-sm rounded cursor-pointer hover:bg-pink-600 transition duration-200">
              Choose File
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="hidden"
              />
            </label>
            {form.image && (
              <span className="text-xs text-gray-600 truncate max-w-[160px]">{form.image.name}</span>
            )}
          </div>
        </div>

        <div className="text-center pt-3">
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium px-5 py-2 rounded-md shadow-sm transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProduct;
