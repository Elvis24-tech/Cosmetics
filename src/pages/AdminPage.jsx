import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    products: 0,
    pendingOrders: 0,
    completedSales: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/products/'),
          axios.get('http://127.0.0.1:8000/api/orders/'),
        ]);

        const totalProducts = productsRes.data.length;

        const orders = ordersRes.data;
        const pendingOrders = orders.filter(order => order.status === 'Pending').length;
        const completedSales = orders.filter(order => order.status === 'Completed').length;

        setStats({
          products: totalProducts,
          pendingOrders,
          completedSales,
        });
      } catch (err) {
        console.error('Failed to fetch admin stats:', err);
      }
    };

    fetchStats();
  }, []);

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-8">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-10 text-center">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Add Product */}
        <div className="bg-white rounded-2xl shadow-xl p-6 transition hover:scale-[1.02] hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Add New Product</h2>
          <p className="text-gray-600 mb-4">Create and list a new product in your store.</p>
          <button
            onClick={() => navigate('/admin/add-product')}
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg transition"
          >
            Add Product
          </button>
        </div>

        {/* Manage Products */}
        <div className="bg-white rounded-2xl shadow-xl p-6 transition hover:scale-[1.02] hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Manage Products</h2>
          <p className="text-gray-600 mb-4">Edit or delete existing products.</p>
          <button
            onClick={() => navigate('/admin/manage-products')}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition"
          >
            Manage Products
          </button>
        </div>

        {/* View Orders */}
        <div className="bg-white rounded-2xl shadow-xl p-6 transition hover:scale-[1.02] hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">View Orders</h2>
          <p className="text-gray-600 mb-4">See recent customer orders and update statuses.</p>
          <button
            onClick={() => navigate('/admin/orders')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition"
          >
            View Orders
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div>
        <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Quick Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-gray-500 text-sm mb-2">Total Products</p>
            <p className="text-4xl font-bold text-pink-500">{stats.products}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-gray-500 text-sm mb-2">Pending Orders</p>
            <p className="text-4xl font-bold text-yellow-500">{stats.pendingOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-gray-500 text-sm mb-2">Completed Sales</p>
            <p className="text-4xl font-bold text-green-500">{stats.completedSales}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
