import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Add New Product</h2>
          <p className="text-gray-600 mb-4">Create and list a new product in your store.</p>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
            Add Product
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Manage Products</h2>
          <p className="text-gray-600 mb-4">Edit or delete existing products.</p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Manage Products
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">View Orders</h2>
          <p className="text-gray-600 mb-4">See recent customer orders and update statuses.</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            View Orders
          </button>
        </div>
      </div>

      {/* Future stats section */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">Quick Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Total Products</p>
            <p className="text-2xl font-bold text-pink-500">20</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <p className="text-2xl font-bold text-yellow-500">0</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">Completed Sales</p>
            <p className="text-2xl font-bold text-green-500">92</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
