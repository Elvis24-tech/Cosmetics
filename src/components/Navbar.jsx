import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navLinkClass = (path) =>
    `relative px-3 py-2 rounded transition duration-200 ${
      location.pathname === path
        ? 'text-pink-600 font-semibold'
        : 'text-gray-700 hover:text-pink-500'
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-pink-600 tracking-wide">
          Beauty Shop
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className={navLinkClass('/')}>Home</Link>
          <Link to="/products" className={navLinkClass('/products')}>Products</Link>
          <Link to="/cart" className={navLinkClass('/cart')}>
            Cart
            <span className="ml-1 bg-pink-500 text-white text-xs rounded-full px-2 py-0.5"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
