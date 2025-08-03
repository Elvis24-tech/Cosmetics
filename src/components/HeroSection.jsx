import React from 'react';
import Button from './Button';

const HeroSection = () => {
  return (
    <section className="bg-pink-50 p-8 text-center rounded-md shadow">
      <h1 className="text-4xl font-bold text-pink-600 mb-4">Glow Up with Our Beauty Picks 💄</h1>
      <p className="text-gray-700 mb-6">Explore the latest in skincare, makeup, and more.</p>
      <Button label="Shop Now" to="/products" />
    </section>
  );
};

export default HeroSection;
