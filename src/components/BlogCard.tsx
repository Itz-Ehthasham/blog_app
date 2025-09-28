import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/assets';
import { assets } from '@/lib/assets';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Format date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
            {post.category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={post.author_img}
              alt={post.author}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-sm text-gray-700 font-medium">{post.author}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
            <Link href={`/blog/${post.slug}`} className="hover:opacity-70 transition-opacity">
              <Image
                src={assets.arrow}
                alt="Read more"
                width={16}
                height={16}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
