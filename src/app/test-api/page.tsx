'use client';

import { useState, useEffect } from 'react';

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  slug: string;
  readTime?: string;
  createdAt: string;
}

export default function TestAPIPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const data = await response.json();
        
        if (data.success) {
          setPosts(data.data);
        } else {
          setError(data.message || 'Failed to fetch posts');
        }
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-4xl font-bold mb-8">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-4xl font-bold mb-8 text-red-500">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">MongoDB API Test</h1>
      <p className="text-green-400 mb-6">✅ Successfully connected to MongoDB!</p>
      
      <h2 className="text-2xl font-bold mb-4">Posts from Database ({posts.length})</h2>
      
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="border border-white p-4">
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-gray-300 mb-2">{post.description}</p>
            <div className="flex gap-4 text-sm text-gray-400">
              <span>Category: {post.category}</span>
              <span>Author: {post.author}</span>
              <span>Slug: {post.slug}</span>
              {post.readTime && <span>Read Time: {post.readTime}</span>}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Created: {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 border border-green-500 bg-green-900/20">
        <h3 className="text-green-400 font-bold mb-2">✅ What's Working:</h3>
        <ul className="text-sm space-y-1">
          <li>• MongoDB connection established</li>
          <li>• Database seeded with sample data</li>
          <li>• API routes functioning correctly</li>
          <li>• Data fetching and transformation working</li>
        </ul>
      </div>
    </div>
  );
}
