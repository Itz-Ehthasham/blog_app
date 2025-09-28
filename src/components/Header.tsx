import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/lib/assets';

export default function Header() {
  return (
    <header className="py-4 px-5 md:px-12 lg:px-20 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <Image
            src={assets.logo}
            alt="Blog Logo"
            width={180}
            height={60}
            priority
            className="w-[130px] sm:w-auto"
          />
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            href="/" 
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link 
            href="/blogs" 
            className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
          >
            Blogs
          </Link>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow">
            Subscribe
          </button>
        </nav>
      </div>
    </header>
  );
}
