'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BlogPost, assets } from '@/lib/assets';

interface BlogDetailModalProps {
  post: BlogPost;
  isOpen: boolean;
  onClose: () => void;
}

export default function BlogDetailModal({ post, isOpen, onClose }: BlogDetailModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Prevent scrolling on the body when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }

    // Clean up on component unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Format date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-6xl max-h-[95vh] mx-4 bg-black border-4 border-white shadow-custom-white overflow-hidden">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-4 border-b-4 border-white">
          <div className="flex items-center gap-3">
            <span className="inline-block bg-white text-black text-xs px-3 py-2 font-bold uppercase tracking-wider border-2 border-black shadow-custom-sm">
              {post.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="bg-white text-black p-2 border-2 border-black shadow-custom-sm hover:bg-gray-200 transition-all duration-200"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(95vh-80px)]">
          <div className="p-6">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight uppercase">
              {post.title}
            </h1>

            {/* Author Info and Meta */}
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-4 border-b-2 border-white">
              <div className="flex items-center gap-3">
                <div className="border-2 border-white">
                  <Image
                    src={post.author_img}
                    alt={post.author}
                    width={40}
                    height={40}
                    className="filter grayscale"
                  />
                </div>
                <div>
                  <p className="font-bold text-white uppercase">{post.author}</p>
                  <p className="text-xs text-gray-400 uppercase">{formatDate(post.date)}</p>
                </div>
              </div>
              
              {post.readTime && (
                <div className="text-xs text-gray-400 uppercase flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readTime}
                </div>
              )}
            </div>

            {/* Featured Image */}
            <div className="mb-6 border-4 border-white overflow-hidden shadow-custom-white">
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-48 md:h-64 object-cover filter grayscale"
              />
            </div>

            {/* Content */}
            <div className="text-white">
              <p className="text-lg leading-relaxed mb-6">
                {post.description}
              </p>
              
              {post.content ? (
                <>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {post.content.introduction}
                  </p>

                  {post.content.sections.slice(0, 2).map((section, index) => (
                    <div key={index}>
                      <h2 className="text-xl font-bold text-white mt-6 mb-3 uppercase border-l-4 border-white pl-4">
                        {section.title}
                      </h2>
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {section.content}
                      </p>
                    </div>
                  ))}

                  {post.content.sections.length > 2 && (
                    <div className="bg-gray-900 border-2 border-white p-4 mb-6">
                      <p className="text-white font-bold mb-2 uppercase">More sections available:</p>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {post.content.sections.slice(2).map((section, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-white block"></span>
                            {section.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>

                  <h2 className="text-xl font-bold text-white mt-6 mb-3 uppercase border-l-4 border-white pl-4">
                    Key Insights
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-white">
              <Link
                href={`/blog/${post.slug}`}
                className="bg-white text-black p-3 px-6 border-2 border-black shadow-custom-sm hover:bg-gray-200 transition-all duration-200 text-center font-bold uppercase"
                onClick={onClose}
              >
                Read Full Article
              </Link>
              
              <div className="flex items-center gap-3">
                <span className="text-white font-bold uppercase text-sm">Share:</span>
                <Link href="#" className="bg-white p-2 border-2 border-black shadow-custom-sm hover:bg-gray-200 transition-all duration-200">
                  <Image src={assets.facebook_icon} alt="Facebook" width={20} height={20} />
                </Link>
                <Link href="#" className="bg-white p-2 border-2 border-black shadow-custom-sm hover:bg-gray-200 transition-all duration-200">
                  <Image src={assets.twitter_icon} alt="Twitter" width={20} height={20} />
                </Link>
                <Link href="#" className="bg-white p-2 border-2 border-black shadow-custom-sm hover:bg-gray-200 transition-all duration-200">
                  <Image src={assets.email_icon} alt="Email" width={20} height={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
