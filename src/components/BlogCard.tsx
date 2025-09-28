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
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group hover:border-blue-100">
      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
            {post.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        
        <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed">
          {post.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center gap-3">
            <Image
              src={post.author_img}
              alt={post.author}
              width={28}
              height={28}
              className="rounded-full"
            />
            <div>
              <p className="text-sm text-gray-800 font-medium">{post.author}</p>
              <p className="text-xs text-gray-500">{formatDate(post.date)}</p>
            </div>
          </div>
          
          <Link 
            href={`/blog/${post.slug}`} 
            className="text-blue-600 hover:text-blue-800 transition-colors p-2 hover:bg-blue-50 rounded-lg"
          >
            <Image
              src={assets.arrow}
              alt="Read more"
              width={18}
              height={18}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
