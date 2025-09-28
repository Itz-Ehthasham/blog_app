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
      
      // Try to fetch from MongoDB first using new paginated API
      try {
        const response = await fetch('/api/blogs?limit=50'); // Get up to 50 posts for homepage
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data && result.data.length > 0) {
            // Transform MongoDB data to match our BlogPost interface
            const transformedPosts = result.data.map((post: any) => ({
              id: post._id,
              title: post.title,
              description: post.description,
              image: post.image,
              date: new Date(post.date || post.createdAt).getTime(),
              category: post.category,
              author: post.author,
              author_img: post.author_img,
              slug: post.slug,
              content: post.content,
              readTime: post.readTime,
              tags: post.tags
            }));
            setPosts(transformedPosts);
            return;
          }
        }
      } catch (apiError) {
        console.warn('MongoDB API failed, falling back to static data:', apiError);
      }
      
      // Fallback to static data with simulated delay
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