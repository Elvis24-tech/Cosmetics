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
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">Add New Product</h2>
      {success && <p className="text-green-600 mb-4">Product added successfully!</p>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md" encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={form.stock}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
        <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
