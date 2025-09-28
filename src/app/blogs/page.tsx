'use client';

import { useState, useMemo } from 'react';
import BlogCard from '@/components/BlogCard';
import SearchAndFilter from '@/components/SearchAndFilter';
import { blog_data } from '@/lib/assets';

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let filtered = blog_data;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Search by title
    if (searchTerm.trim()) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <main className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All Blog Posts
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our collection of articles, tutorials, and insights across various topics
          </p>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter
          onSearch={handleSearch}
          onFilter={handleFilter}
          currentCategory={selectedCategory}
        />

        {/* Results Info */}
        <div className="mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <p className="text-gray-700 font-medium">
              {filteredPosts.length === 0 
                ? 'No posts found matching your criteria' 
                : `Showing ${filteredPosts.length} of ${blog_data.length} ${filteredPosts.length === 1 ? 'post' : 'posts'}`
              }
              {selectedCategory !== 'All' && (
                <span className="text-blue-600"> in {selectedCategory}</span>
              )}
              {searchTerm && (
                <span className="text-blue-600"> matching &ldquo;{searchTerm}&rdquo;</span>
              )}
            </p>
            {(searchTerm || selectedCategory !== 'All') && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-2 text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12">
              <div className="text-gray-400 mb-6">
                <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No posts found</h3>
              <p className="text-gray-500 mb-6">
                We couldn&apos;t find any posts matching your search criteria.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Show all posts
              </button>
            </div>
          </div>
        )}

        {/* Load More Button (placeholder for future pagination) */}
        {filteredPosts.length > 0 && filteredPosts.length === blog_data.length && (
          <div className="text-center mt-12">
            <p className="text-gray-500">You&apos;ve reached the end of our blog posts!</p>
          </div>
        )}
      </div>
    </main>
  );
}
