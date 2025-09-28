import Link from 'next/link';
import BlogCard from './BlogCard';
import { BlogPost } from '@/lib/assets';

interface FeaturedPostsSectionProps {
  featuredPosts: BlogPost[];
  searchTerm: string;
  selectedCategory: string;
  onClearFilters: () => void;
  totalPosts: number;
}

export default function FeaturedPostsSection({ 
  featuredPosts, 
  searchTerm, 
  selectedCategory, 
  onClearFilters,
  totalPosts
}: FeaturedPostsSectionProps) {
  return (
    <section className="py-20 bg-black border-b-4 border-white">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20">
        <div className="flex items-center justify-between mb-16 flex-col md:flex-row gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-wider">FEATURED POSTS</h2>
            <p className="text-xl text-gray-300 uppercase tracking-wide font-bold">HANDPICKED ARTICLES JUST FOR YOU</p>
          </div>
          <Link 
            href="/blogs"
            className="bg-white text-black px-6 py-4 font-black text-lg uppercase tracking-wider border-4 border-black shadow-custom hover:bg-gray-200 transition-all duration-200 flex items-center gap-3"
          >
            VIEW ALL POSTS
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Results Info */}
        {(searchTerm || selectedCategory !== 'All') && (
          <div className="mb-10">
            <div className="bg-white p-6 border-4 border-black shadow-custom">
              <p className="text-black font-black uppercase tracking-wider text-lg">
                {featuredPosts.length === 0 
                  ? 'NO POSTS FOUND MATCHING YOUR CRITERIA' 
                  : `SHOWING ${featuredPosts.length} ${featuredPosts.length === 1 ? 'POST' : 'POSTS'}`
                }
                {selectedCategory !== 'All' && ` IN ${selectedCategory.toUpperCase()}`}
                {searchTerm && ` MATCHING "${searchTerm.toUpperCase()}"`}
              </p>
              <button 
                onClick={onClearFilters}
                className="mt-4 bg-black text-white px-4 py-2 font-bold uppercase tracking-wider border-2 border-white shadow-custom-white hover:bg-gray-900 transition-all duration-200"
              >
                CLEAR FILTERS
              </button>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {featuredPosts.length > 0 ? (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white border-4 border-black shadow-custom p-16">
              <div className="text-black mb-8">
                <svg className="mx-auto h-20 w-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-black mb-6 uppercase tracking-wider">NO POSTS FOUND</h3>
              <p className="text-black mb-8 font-bold uppercase tracking-wide text-lg">
                TRY ADJUSTING YOUR SEARCH OR FILTER CRITERIA
              </p>
              <button 
                onClick={onClearFilters}
                className="bg-black text-white px-8 py-4 font-black uppercase tracking-wider border-4 border-white shadow-custom-white hover:bg-gray-900 transition-all duration-200"
              >
                SHOW FEATURED POSTS
              </button>
            </div>
          </div>
        )}

        {/* Show more button */}
        {featuredPosts.length > 0 && featuredPosts.length === 6 && !searchTerm && selectedCategory === 'All' && (
          <div className="text-center mt-16">
            <Link 
              href="/blogs"
              className="bg-white text-black px-8 py-4 font-black text-xl uppercase tracking-wider border-4 border-black shadow-custom hover:bg-gray-200 transition-all duration-200"
            >
              VIEW ALL {totalPosts} POSTS
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}