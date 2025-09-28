import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-6 px-5 md:px-12 lg:px-20 bg-black border-b-4 border-white">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <div className="bg-white p-4 border-4 border-black shadow-custom hover:shadow-custom-lg transition-all duration-200">
            <div className="font-black text-2xl md:text-3xl text-black uppercase tracking-wider">
              BLOGGER<span className="bg-black text-white px-2 py-1 ml-1">APP</span>
            </div>
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
          <Link 
            href="/add-blog"
            className="bg-white text-black px-6 py-3 font-bold uppercase tracking-wider border-thick border-black shadow-custom hover:bg-gray-200 transition-all duration-200"
          >
            Add Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
