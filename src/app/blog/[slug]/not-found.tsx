import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <main className="min-h-screen bg-black text-white py-12">
      <div className="max-w-4xl mx-auto px-5 md:px-12 lg:px-20">
        <div className="text-center">
          <div className="border-4 border-white p-16 shadow-custom-white">
            <div className="text-white mb-8">
              <svg className="mx-auto h-20 w-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            
            <h1 className="text-6xl font-black text-white mb-6 uppercase tracking-wider">
              404 ERROR
            </h1>
            
            <h2 className="text-2xl font-bold text-white mb-6 uppercase">
              BLOG POST NOT FOUND
            </h2>
            
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              THE BLOG POST YOU'RE LOOKING FOR DOESN'T EXIST OR HAS BEEN MOVED. 
              DON'T WORRY, WE HAVE PLENTY OF OTHER GREAT CONTENT FOR YOU TO EXPLORE.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="bg-white text-black px-8 py-4 font-black uppercase tracking-wider border-4 border-black shadow-custom hover:bg-gray-200 transition-all duration-200"
              >
                GO TO HOME
              </Link>
              
              <Link 
                href="/blogs"
                className="bg-black text-white px-8 py-4 font-black uppercase tracking-wider border-4 border-white shadow-custom-white hover:bg-gray-900 transition-all duration-200"
              >
                VIEW ALL BLOGS
              </Link>
            </div>
            
            <div className="mt-12 p-4 border-2 border-gray-600 bg-gray-900/50">
              <h3 className="text-white font-bold mb-2 uppercase">Explore More:</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>✓ Latest featured posts on our homepage</li>
                <li>✓ Browse posts by category</li>
                <li>✓ Search for specific topics</li>
                <li>✓ Create your own blog post</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
