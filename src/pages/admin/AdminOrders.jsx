import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/orders/');
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Customer Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 shadow rounded">
              <p className="font-semibold">Order #{order.id}</p>
              <p className="text-gray-600">Phone: {order.phone_number}</p>
              <p className="text-gray-600">Amount: KES {order.amount}</p>
              <p className="text-gray-600">Status: {order.status || 'Pending'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
