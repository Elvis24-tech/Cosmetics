import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ label, to }) => {
  return (
    <Link
      to={to}
      className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
    >
      {label}
    </Link>
  );
};

export default Button;
