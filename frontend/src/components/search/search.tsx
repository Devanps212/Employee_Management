import React from 'react';

interface SearchProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search by Name"
        value={searchQuery}
        onChange={onSearchChange}
        className="p-2 border border-gray-300 rounded-md w-full"
      />
    </div>
  );
};

export default Search;
