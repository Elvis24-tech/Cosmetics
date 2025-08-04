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
import { useAuth } from './context/AuthContext'; 

function App() {
  const { isAdmin } = useAuth(); 

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
          <Route
            path="/admin"
            element={isAdmin ? <AdminPage /> : <Navigate to="/" replace />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
