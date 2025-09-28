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
    <div className="mb-12">
      {/* Search Bar */}
      <div className="mb-10">
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="SEARCH BLOG POSTS..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-6 py-5 pl-14 bg-black text-white border-4 border-white focus:outline-none focus:border-gray-300 shadow-custom-white text-lg placeholder-gray-400 font-bold uppercase tracking-wider"
          />
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <svg 
              className="h-6 w-6 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={3}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => handleCategoryFilter('All')}
          className={`px-6 py-3 text-sm font-bold uppercase tracking-wider border-4 transition-all duration-200 ${
            currentCategory === 'All'
              ? 'bg-white text-black border-black shadow-custom'
              : 'bg-black text-white border-white shadow-custom-white hover:bg-white hover:text-black hover:border-black hover:shadow-custom'
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryFilter(category)}
            className={`px-6 py-3 text-sm font-bold uppercase tracking-wider border-4 transition-all duration-200 ${
              currentCategory === category
                ? 'bg-white text-black border-black shadow-custom'
                : 'bg-black text-white border-white shadow-custom-white hover:bg-white hover:text-black hover:border-black hover:shadow-custom'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
