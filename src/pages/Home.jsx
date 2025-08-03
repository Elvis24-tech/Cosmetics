import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center bg-pink-50 min-h-screen">
      <section className="w-full bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 py-24 px-6 shadow-inner">
        <h1 className="text-5xl font-bold text-pink-800 mb-4">Glow Up with Our Beauty Essentials</h1>
        <p className="text-lg text-pink-700 max-w-2xl mx-auto mb-6">
          Discover a curated selection of skincare, makeup, and self-care products made for your unique beauty.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-full transition"
        >
          Shop Now
        </button>
      </section>
      <section className="w-full py-16 bg-white px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-pink-800">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">10K+</p>
            <p className="text-sm mt-1 text-gray-600">Happy Customers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">500+</p>
            <p className="text-sm mt-1 text-gray-600">Beauty Products</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-4xl font-bold">98%</p>
            <p className="text-sm mt-1 text-gray-600">Satisfaction Rate</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
