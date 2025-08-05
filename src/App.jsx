import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminPage from './pages/AdminPage';
import AdminAddProduct from './pages/admin/AdminAddProduct';
import ManageProducts from './pages/admin/ManageProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminLogin from './pages/AdminLogin'; 
import { useAuth } from './context/AuthContext';

function App() {
  const { isAdmin, isAuthenticated } = useAuth();
  const requireAdmin = (element) => {
    if (!isAuthenticated) return <Navigate to="/admin-login" replace />;
    if (!isAdmin) return <Navigate to="/" replace />;
    return element;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={requireAdmin(<AdminPage />)} />
          <Route path="/admin/add-product" element={requireAdmin(<AdminAddProduct />)} />
          <Route path="/admin/manage-products" element={requireAdmin(<ManageProducts />)} />
          <Route path="/admin/orders" element={requireAdmin(<AdminOrders />)} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
