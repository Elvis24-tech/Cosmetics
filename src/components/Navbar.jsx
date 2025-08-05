import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, LogIn, LogOut, LayoutDashboard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { cartItems } = useCart();
  const { loginAsBuyer, logout, isAuthenticated, isAdmin } = useAuth();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLink = (path, label) => (
    <Link
      to={path}
      className={`relative px-4 py-2 text-sm font-medium rounded-md transition duration-200 ${
        location.pathname === path
          ? 'bg-pink-500 text-white shadow'
          : 'text-gray-700 hover:bg-pink-100 hover:text-pink-600'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="bg-white border-b shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-pink-600 tracking-tight hover:text-pink-700">
          Beauty<span className="text-gray-800">Shop</span>
        </Link>

        <nav className="flex items-center gap-4">
          {navLink('/', 'Home')}
          {navLink('/products', 'Products')}

          {isAdmin && (
            navLink('/admin', (
              <span className="flex items-center gap-1">
                <LayoutDashboard size={18} />
                Admin
              </span>
            ))
          )}

          <Link
            to="/cart"
            className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition ${
              location.pathname === '/cart'
                ? 'bg-pink-500 text-white shadow'
                : 'text-gray-700 hover:text-pink-600 hover:bg-pink-100'
            }`}
          >
            <ShoppingCart size={18} />
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <button
              onClick={logout}
              className="flex items-center gap-1 text-sm text-red-600 hover:underline"
              title="Logout"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <button
              onClick={loginAsBuyer}
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
              title="Login"
            >
              <LogIn size={16} />
              Login
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
