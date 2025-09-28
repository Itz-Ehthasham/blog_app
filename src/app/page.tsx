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
    <main className="bg-black">
      {/* Hero Section */}
      <section className="bg-black py-20 border-b-4 border-white">
        <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight uppercase tracking-wider">
              WELCOME TO 
              <span className="block mt-4 bg-white text-black px-8 py-4 inline-block border-4 border-black shadow-custom-lg transform -rotate-2">BLOGGERAPP</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 font-bold uppercase tracking-wide">
              DISCOVER AMAZING STORIES, INSIGHTS, AND IDEAS FROM OUR COMMUNITY OF PASSIONATE WRITERS
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/blogs" 
                className="bg-white text-black px-10 py-5 font-black text-xl uppercase tracking-wider border-4 border-black shadow-custom-lg hover:bg-gray-200 transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1"
              >
                EXPLORE ALL POSTS
              </a>
              <button className="bg-black text-white px-10 py-5 font-black text-xl uppercase tracking-wider border-4 border-white shadow-custom-white hover:bg-gray-900 transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1">
                SUBSCRIBE NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Latest Post */}
      {latestPost && (
        <section className="py-20 bg-black border-b-4 border-white">
          <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-wider">LATEST FEATURED POST</h2>
              <p className="text-xl text-gray-300 uppercase tracking-wide font-bold">DON&apos;T MISS OUR MOST RECENT ARTICLE</p>
            </div>
            
            <div className="bg-black border-4 border-white shadow-custom-white overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 border-r-4 border-white">
                  <Image 
                    src={latestPost.image} 
                    alt={latestPost.title}
                    width={600}
                    height={400}
                    className="w-full h-64 md:h-full object-cover filter grayscale"
                  />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="mb-6">
                    <span className="bg-white text-black text-sm px-4 py-2 font-black uppercase tracking-wider border-2 border-black shadow-custom-sm">
                      {latestPost.category}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black text-white mb-6 leading-tight uppercase">
                    {latestPost.title}
                  </h3>
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    {latestPost.description}
                  </p>
                  <div className="flex items-center justify-between border-t-2 border-white pt-6">
                    <div className="flex items-center gap-4">
                      <div className="border-2 border-white">
                        <Image 
                          src={latestPost.author_img} 
                          alt={latestPost.author}
                          width={48}
                          height={48}
                          className="w-12 h-12 filter grayscale"
                        />
                      </div>
                      <div>
                        <p className="font-black text-white uppercase text-lg">{latestPost.author}</p>
                        <p className="text-sm text-gray-400 uppercase font-bold">{new Date(latestPost.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <a 
                      href={`/blog/${latestPost.slug}`}
                      className="bg-white text-black px-6 py-3 font-black uppercase tracking-wider border-4 border-black shadow-custom hover:bg-gray-200 transition-all duration-200"
                    >
                      READ MORE
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Quick Search Section */}
      <section className="py-20 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-black mb-6 uppercase tracking-wider">FIND WHAT INTERESTS YOU</h2>
            <p className="text-xl text-gray-800 uppercase tracking-wide font-bold">SEARCH THROUGH OUR ARTICLES OR BROWSE BY CATEGORY</p>
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
      <section className="py-20 bg-black border-b-4 border-white">
        <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20">
          <div className="flex items-center justify-between mb-16 flex-col md:flex-row gap-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-wider">FEATURED POSTS</h2>
              <p className="text-xl text-gray-300 uppercase tracking-wide font-bold">HANDPICKED ARTICLES JUST FOR YOU</p>
            </div>
            <a 
              href="/blogs"
              className="bg-white text-black px-6 py-4 font-black text-lg uppercase tracking-wider border-4 border-black shadow-custom hover:bg-gray-200 transition-all duration-200 flex items-center gap-3"
            >
              VIEW ALL POSTS
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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
