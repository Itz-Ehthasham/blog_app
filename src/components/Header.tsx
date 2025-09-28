import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/lib/assets';

export default function Header() {
  return (
    <header className="py-6 px-5 md:px-12 lg:px-20 bg-black border-b-4 border-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <div className="bg-white p-2 border-thick border-black shadow-custom">
            <Image
              src={assets.logo}
              alt="Blog Logo"
              width={150}
              height={50}
              priority
              className="w-[120px] sm:w-[150px] filter invert"
            />
          </div>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link 
            href="/" 
            className="text-white hover:text-gray-300 font-bold text-lg transition-colors duration-200 uppercase tracking-wide"
          >
            Home
          </Link>
          <Link 
            href="/blogs" 
            className="text-white hover:text-gray-300 font-bold text-lg transition-colors duration-200 uppercase tracking-wide"
          >
            Blogs
          </Link>
          <button className="bg-white text-black px-6 py-3 font-bold uppercase tracking-wider border-thick border-black shadow-custom hover:bg-gray-200 transition-all duration-200">
            Subscribe
          </button>
        </nav>
      </div>
    </header>
  );
}
