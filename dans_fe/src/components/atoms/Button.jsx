import React from 'react';

const Button = ({ label, onClick, type = 'button', className }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}
  >
    {label}
  </button>
);

export default Button;
