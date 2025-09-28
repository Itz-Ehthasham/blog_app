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
    <div className="bg-black border-4 border-white shadow-custom-white hover:shadow-custom-lg transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden border-b-4 border-white">
        <Image
          src={post.image}
          alt={post.title}
          width={400}
          height={250}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white text-black text-xs px-3 py-2 font-bold uppercase tracking-wider border-2 border-black shadow-custom-sm">
            {post.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors leading-tight uppercase">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h2>
        
        <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">
          {post.description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t-2 border-white">
          <div className="flex items-center gap-3">
            <div className="border-2 border-white">
              <Image
                src={post.author_img}
                alt={post.author}
                width={32}
                height={32}
                className="filter grayscale"
              />
            </div>
            <div>
              <p className="text-sm text-white font-bold uppercase">{post.author}</p>
              <p className="text-xs text-gray-400 uppercase">{formatDate(post.date)}</p>
            </div>
          </div>
          
          <Link 
            href={`/blog/${post.slug}`} 
            className="bg-white text-black p-3 border-2 border-black shadow-custom-sm hover:bg-gray-200 transition-all duration-200"
          >
            <Image
              src={assets.arrow}
              alt="Read more"
              width={18}
              height={18}
              className="filter invert"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
