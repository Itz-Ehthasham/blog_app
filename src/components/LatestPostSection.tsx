import Image from 'next/image';
import { BlogPost } from '@/lib/assets';

interface LatestPostSectionProps {
  latestPost: BlogPost;
}

export default function LatestPostSection({ latestPost }: LatestPostSectionProps) {
  return (
    <section className="py-20 bg-black border-b-4 border-white">
      <div className="max-w-7xl mx-auto px-5 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-wider">LATEST FEATURED POST</h2>
          <p className="text-xl text-gray-300 uppercase tracking-wide font-bold">DON&apos;T MISS OUR MOST RECENT ARTICLE</p>
        </div>
        
        <div className="bg-black border-4 border-white shadow-custom-white overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 border-r-4 border-white">
              <Image 
                src={latestPost.image} 
                alt={latestPost.title}
                width={600}
                height={400}
                className="w-full h-64 md:h-full object-cover filter grayscale"
              />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <span className="bg-white text-black text-sm px-4 py-2 font-black uppercase tracking-wider border-2 border-black shadow-custom-sm">
                  {latestPost.category}
                </span>
              </div>
              <h3 className="text-2xl md:text-4xl font-black text-white mb-6 leading-tight uppercase">
                {latestPost.title}
              </h3>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                {latestPost.description}
              </p>
              <div className="flex items-center justify-between border-t-2 border-white pt-6">
                <div className="flex items-center gap-4">
                  <div className="border-2 border-white">
                    <Image 
                      src={latestPost.author_img} 
                      alt={latestPost.author}
                      width={48}
                      height={48}
                      className="w-12 h-12 filter grayscale"
                    />
                  </div>
                  <div>
                    <p className="font-black text-white uppercase text-lg">{latestPost.author}</p>
                    <p className="text-sm text-gray-400 uppercase font-bold">{new Date(latestPost.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <a 
                  href={`/blog/${latestPost.slug}`}
                  className="bg-white text-black px-6 py-3 font-black uppercase tracking-wider border-4 border-black shadow-custom hover:bg-gray-200 transition-all duration-200"
                >
                  READ MORE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}