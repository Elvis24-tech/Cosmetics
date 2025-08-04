import React, { useState } from 'react';

const MpesaButton = () => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handlePay = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/pay/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, amount }),
      });

      const data = await response.json();
      if (data.CustomerMessage) {
        setMessage(data.CustomerMessage);
      } else {
        setMessage('Payment failed. Try again.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error connecting to server');
    }
  };

  return (
    <div className="p-4 border rounded shadow max-w-md mx-auto mt-10">
      <h2 className="text-lg font-bold mb-2 text-pink-600">Pay with M-Pesa</h2>
      <input
        type="text"
        placeholder="Phone (e.g. 2547XXXXXXXX)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full mb-2 px-3 py-2 border rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full mb-2 px-3 py-2 border rounded"
      />
      <button
        onClick={handlePay}
        className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
      >
        Pay Now
      </button>
      {message && <p className="mt-4 text-green-700">{message}</p>}
    </div>
  );
};

export default MpesaButton;
