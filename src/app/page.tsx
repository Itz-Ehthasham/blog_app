'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import BlogCard from '@/components/BlogCard';
import SearchAndFilter from '@/components/SearchAndFilter';
import { blog_data } from '@/lib/assets';

export default function Home() {
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

  // Get featured posts (latest 6 posts)
  const featuredPosts = filteredPosts.slice(0, 6);
  const latestPost = blog_data[0];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to 
              <span className="text-blue-600">BloggerApp</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Discover amazing stories, insights, and ideas from our community of passionate writers
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/blogs" 
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                Explore All Posts
              </a>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200 font-semibold text-lg">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Latest Post */}
      {latestPost && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Featured Post</h2>
              <p className="text-xl text-gray-600">Don&apos;t miss our most recent article</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image 
                    src={latestPost.image} 
                    alt={latestPost.title}
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                      {latestPost.category}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {latestPost.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {latestPost.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image 
                        src={latestPost.author_img} 
                        alt={latestPost.author}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{latestPost.author}</p>
                        <p className="text-sm text-gray-500">{new Date(latestPost.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <a 
                      href={`/blog/${latestPost.slug}`}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick Search Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find What Interests You</h2>
            <p className="text-xl text-gray-600">Search through our articles or browse by category</p>
          </div>
          
          {/* Search and Filter */}
          <SearchAndFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
            currentCategory={selectedCategory}
          />
        </div>
      </section>

      {/* Featured Posts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Posts</h2>
              <p className="text-xl text-gray-600">Handpicked articles just for you</p>
            </div>
            <a 
              href="/blogs"
              className="text-blue-600 hover:text-blue-800 font-semibold text-lg flex items-center gap-2 transition-colors"
            >
              View All Posts
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Results Info */}
          {(searchTerm || selectedCategory !== 'All') && (
            <div className="mb-8">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-blue-800 font-medium">
                  {featuredPosts.length === 0 
                    ? 'No posts found matching your criteria' 
                    : `Showing ${featuredPosts.length} ${featuredPosts.length === 1 ? 'post' : 'posts'}`
                  }
                  {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}

          {/* Blog Posts Grid */}
          {featuredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-gray-50 rounded-xl p-12 border border-gray-200">
                <div className="text-gray-400 mb-6">
                  <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No posts found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Show featured posts
                </button>
              </div>
            </div>
          )}

          {/* Show more button */}
          {featuredPosts.length > 0 && featuredPosts.length === 6 && !searchTerm && selectedCategory === 'All' && (
            <div className="text-center mt-12">
              <a 
                href="/blogs"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-sm hover:shadow"
              >
                View All {blog_data.length} Posts
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
