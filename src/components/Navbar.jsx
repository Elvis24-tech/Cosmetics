import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-10">
      <Link to="/" className="text-2xl font-bold text-pink-600">Beauty Shop</Link>
      <div className="space-x-4">
        <Link to="/" className="hover:text-pink-500">Home</Link>
        <Link to="/products" className="hover:text-pink-500">Products</Link>
        <Link to="/cart" className="hover:text-pink-500">Cart</Link>
      </div>
    </nav>
  );
};

export default Navbar;
