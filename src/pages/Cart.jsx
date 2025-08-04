import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-pink-600 mb-6">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Your cart is empty.</p>
          <button
            className="mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            onClick={() => navigate('/products')}
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border p-4 rounded-lg shadow bg-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-pink-600 font-medium">Ksh {item.price}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-700 mb-2">
                  Ksh {(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 p-4 bg-pink-100 rounded-lg shadow">
            <h3 className="text-xl font-bold text-gray-800">Total:</h3>
            <p className="text-2xl font-bold text-pink-700">Ksh {total.toFixed(2)}</p>
          </div>

          <button
            className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 w-full mt-4 text-lg font-semibold"
            onClick={() => navigate('/checkout', { state: { total } })}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
