import React, { useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

const SearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search jobs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button label="Search" onClick={handleSearch} />
    </div>
  );
};

export default SearchForm;
