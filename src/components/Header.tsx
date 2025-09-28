import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/lib/assets';

export default function Header() {
  return (
    <header className="py-5 px-5 md:px-12 lg:px-20 shadow-sm border-b">
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
        
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Home
          </Link>
          <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors font-medium">
            Subscribe
          </button>
        </div>
      </div>
    </header>
  );
}
