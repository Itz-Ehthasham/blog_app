'use client';

import { useState } from 'react';
import { getUniqueCategories } from '@/lib/assets';

interface SearchAndFilterProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (category: string) => void;
  currentCategory: string;
}

export default function SearchAndFilter({ onSearch, onFilter, currentCategory }: SearchAndFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = getUniqueCategories();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryFilter = (category: string) => {
    onFilter(category);
  };

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-6 py-4 pl-12 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-lg placeholder-gray-400"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg 
              className="h-6 w-6 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          onClick={() => handleCategoryFilter('All')}
          className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
            currentCategory === 'All'
              ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
              : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-200'
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryFilter(category)}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 ${
              currentCategory === category
                ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
