import React from 'react';

const Input = ({ placeholder, value, onChange, type = 'text', className }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`border p-2 rounded w-full ${className}`}
  />
);

export default Input;
