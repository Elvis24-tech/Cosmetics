import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600">
      <p>&copy; 2025 Beauty Shop. All rights reserved.</p>
      <p className="mt-2">
        <Link to="/admin-login" className="text-blue-600 hover:underline">
          Admin Login
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
