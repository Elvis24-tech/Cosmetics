import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-pink-100 text-center p-4 text-sm text-gray-600 mt-12">
      © {new Date().getFullYear()} Beauty Shop. All rights reserved.
    </footer>
  );
};

export default Footer;
