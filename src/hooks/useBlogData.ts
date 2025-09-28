import { useState, useEffect, useMemo } from 'react';
import { BlogPost, blog_data } from '@/lib/assets';

interface UseBlogDataReturn {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  setPosts: (posts: BlogPost[]) => void;
  refetch: () => Promise<void>;
}

export function useBlogData(): UseBlogDataReturn {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with actual MongoDB API call
      // const response = await fetch('/api/posts');
      // if (!response.ok) throw new Error('Failed to fetch posts');
      // const data = await response.json();
      // setPosts(data);
      
      // For now, use static data with simulated delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setPosts(blog_data);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setPosts([]); // Fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchBlogPosts();
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return {
    posts,
    loading,
    error,
    setPosts,
    refetch
  };
}

// Hook for filtering and searching posts
export function useFilteredPosts(posts: BlogPost[], searchTerm: string, selectedCategory: string) {
  return useMemo(() => {
    let filtered = posts;

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
  }, [posts, searchTerm, selectedCategory]);
}