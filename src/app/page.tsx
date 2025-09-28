'use client';

import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import LatestPostSection from '@/components/LatestPostSection';
import SearchSection from '@/components/SearchSection';
import FeaturedPostsSection from '@/components/FeaturedPostsSection';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useBlogData, useFilteredPosts } from '@/hooks/useBlogData';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // mongo dbbbbbb
  const { posts, loading, error } = useBlogData();
  
  //  filtering and searching
  const filteredPosts = useFilteredPosts(posts, searchTerm, selectedCategory);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  // Get featured posts 
  const featuredPosts = filteredPosts.slice(0, 6);
  const latestPost = posts[0];

  // Show loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <div className="bg-white border-4 border-black shadow-custom p-12">
            <h2 className="text-2xl font-black text-black uppercase tracking-wider mb-4">ERROR LOADING POSTS</h2>
            <p className="text-black font-bold uppercase tracking-wide mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-black text-white px-6 py-3 font-black uppercase tracking-wider border-4 border-white shadow-custom-white hover:bg-gray-900 transition-all duration-200"
            >
              TRY AGAIN
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-black">
      <HeroSection />
      
      {latestPost && (
        <LatestPostSection latestPost={latestPost} />
      )}
      
      <SearchSection 
        onSearch={handleSearch}
        onFilter={handleFilter}
        currentCategory={selectedCategory}
      />
      
      <FeaturedPostsSection 
        featuredPosts={featuredPosts}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onClearFilters={handleClearFilters}
        totalPosts={posts.length}
      />
    </main>
  );
}
