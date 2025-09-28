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
    <main className="py-12 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 uppercase tracking-wider">
            ALL BLOG POSTS
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-bold uppercase tracking-wide">
            EXPLORE OUR COLLECTION OF ARTICLES, TUTORIALS, AND INSIGHTS ACROSS VARIOUS TOPICS
          </p>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter
          onSearch={handleSearch}
          onFilter={handleFilter}
          currentCategory={selectedCategory}
        />

        {/* Results Info */}
        <div className="mb-10">
          <div className="bg-white p-6 border-4 border-black shadow-custom">
            <p className="text-black font-black uppercase tracking-wider text-lg">
              {filteredPosts.length === 0 
                ? 'NO POSTS FOUND MATCHING YOUR CRITERIA' 
                : `SHOWING ${filteredPosts.length} OF ${blog_data.length} ${filteredPosts.length === 1 ? 'POST' : 'POSTS'}`
              }
              {selectedCategory !== 'All' && (
                <span className="text-black"> IN {selectedCategory.toUpperCase()}</span>
              )}
              {searchTerm && (
                <span className="text-black"> MATCHING &ldquo;{searchTerm.toUpperCase()}&rdquo;</span>
              )}
            </p>
            {(searchTerm || selectedCategory !== 'All') && (
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 bg-black text-white px-4 py-2 font-bold uppercase tracking-wider border-2 border-white shadow-custom-white hover:bg-gray-900 transition-all duration-200"
              >
                CLEAR ALL FILTERS
              </button>
            )}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white border-4 border-black shadow-custom p-16">
              <div className="text-black mb-8">
                <svg className="mx-auto h-20 w-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-black mb-6 uppercase tracking-wider">NO POSTS FOUND</h3>
              <p className="text-black mb-8 font-bold uppercase tracking-wide text-lg">
                WE COULDN&apos;T FIND ANY POSTS MATCHING YOUR SEARCH CRITERIA.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="bg-black text-white px-8 py-4 font-black uppercase tracking-wider border-4 border-white shadow-custom-white hover:bg-gray-900 transition-all duration-200"
              >
                SHOW ALL POSTS
              </button>
            </div>
          </div>
        )}

        {/* Load More Button (placeholder for future pagination) */}
        {filteredPosts.length > 0 && filteredPosts.length === blog_data.length && (
          <div className="text-center mt-16">
            <p className="text-white font-black uppercase tracking-wider text-xl">YOU&apos;VE REACHED THE END OF OUR BLOG POSTS!</p>
          </div>
        )}
      </div>
    </main>
  );
}
