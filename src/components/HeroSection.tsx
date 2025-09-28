export default function HeroSection() {
  return (
    <section className="bg-black py-20 border-b-4 border-white">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight uppercase tracking-wider">
            WELCOME TO 
            <span className="block mt-6 bg-white text-black px-8 py-6 inline-block border-4 border-black shadow-custom-lg transform -rotate-2">
              BLOGGER<span className="bg-black text-white px-3 py-2 ml-2">APP</span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 font-bold uppercase tracking-wide">
            DISCOVER AMAZING STORIES, INSIGHTS, AND IDEAS FROM OUR COMMUNITY OF PASSIONATE WRITERS
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/blogs" 
              className="bg-white text-black px-10 py-5 font-black text-xl uppercase tracking-wider border-4 border-black shadow-custom-lg hover:bg-gray-200 transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1"
            >
              EXPLORE ALL POSTS
            </a>
            <button className="bg-black text-white px-10 py-5 font-black text-xl uppercase tracking-wider border-4 border-white shadow-custom-white hover:bg-gray-900 transition-all duration-200 transform hover:-translate-x-1 hover:-translate-y-1">
              SUBSCRIBE NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}