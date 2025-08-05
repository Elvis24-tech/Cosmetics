import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const location = useLocation();
  const initialAmount = location.state?.total || 0;

  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [amount, setAmount] = useState(initialAmount);

  const { clearCart } = useCart(); 

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback('');

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/mpesa/stkpush/', {
        phone: phone,
        amount: amount,
      });

      if (res.data.CustomerMessage) {
        setFeedback(res.data.CustomerMessage);
      } else {
        setFeedback('Payment initiated. Check your phone.');
      }
      setPhone('');
      setAmount(0);
      clearCart(); 
    } catch (err) {
      console.error(err);
      setFeedback('Failed to initiate payment. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Checkout</h2>

      {amount > 0 ? (
        <p className="text-center text-lg font-semibold mb-4 text-gray-800">
          Total Amount: KES {amount}
        </p>
      ) : (
        <p className="text-center text-md text-gray-500 italic mb-4">Payment complete</p>
      )}

      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number (e.g. 254712345678)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="2547XXXXXXXX"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading || amount === 0}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-300"
        >
          {loading ? 'Processing...' : 'Pay with M-Pesa'}
        </button>
      </form>

      {feedback && (
        <p className="mt-4 text-center text-sm text-blue-700 font-medium">
          {feedback}
        </p>
      )}
    </div>
  );
};

export default Checkout;
