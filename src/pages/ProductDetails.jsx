import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
// (Optional) Import a placeholder image for products that don't have one.
// import placeholderImage from '../assets/placeholder.png'; 

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Please log in to add items to cart.');
      login();
      return;
    }

    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <p className="text-center p-6">Loading product...</p>;
  if (!product) return <p className="text-center p-6">Product not found.</p>;

  // --- CHANGE IS HERE ---
  // Determine the image source. Use the full URL from the API if it exists.
  // Otherwise, you can use a placeholder. For now, we'll leave it blank ('').
  const imageUrl = product.image_url ? product.image_url : ''; // Or use placeholderImage

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        className="mb-4 bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
        onClick={() => navigate('/products')}
      >
        ← Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Use the new imageUrl variable. This will be the full Cloudinary URL. */}
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-auto object-cover rounded shadow" // Added object-cover for better image scaling
        />
        <div>
          <h2 className="text-3xl font-bold text-pink-700">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl mt-4 font-semibold">Ksh {product.price}</p>
          <p className="text-yellow-500 mt-2">⭐ {product.rating || '4.5'} / 5</p>

          <button
            className={`mt-4 px-6 py-2 rounded text-white ${
              added ? 'bg-green-700 cursor-default' : 'bg-green-500 hover:bg-green-600'
            }`}
            onClick={!added ? handleAddToCart : undefined}
          >
            {added ? '✔ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;