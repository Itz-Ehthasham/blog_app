import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, blog_data, assets, BlogPost } from '@/lib/assets';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export function generateStaticParams() {
  return blog_data.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | BloggerApp`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  let post = getBlogPostBySlug(slug);

  // If not found in static data, try fetching from MongoDB using new slug API
  if (!post) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs/${slug}`, {
        cache: 'no-store'
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          const mongoPost = data.data;
          post = {
            id: mongoPost._id,
            title: mongoPost.title,
            description: mongoPost.description,
            image: mongoPost.image,
            date: new Date(mongoPost.date || mongoPost.createdAt).getTime(),
            category: mongoPost.category,
            author: mongoPost.author,
            author_img: mongoPost.author_img,
            slug: mongoPost.slug,
            content: mongoPost.content,
            readTime: mongoPost.readTime,
            tags: mongoPost.tags
          } as BlogPost;
        }
      }
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
    }
  }

  if (!post) {
    notFound();
  }

  // Format date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get related posts (same category, excluding current post)
  const relatedPosts = blog_data
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <article className="py-12 bg-black text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-5 md:px-12 lg:px-20">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white font-medium">{post.title}</span>
          </div>
        </nav>

        {/* Article Header */}
        <header className="mb-8 border-4 border-white p-6 shadow-custom-white">
          <div className="mb-4">
            <span className="inline-block bg-white text-black text-xs px-3 py-2 font-bold uppercase tracking-wider border-2 border-black shadow-custom-sm">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight uppercase">
            {post.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4 border-t-2 border-white pt-6">
            <div className="flex items-center gap-3">
              <div className="border-2 border-white">
                <Image
                  src={post.author_img}
                  alt={post.author}
                  width={42}
                  height={42}
                  className="filter grayscale"
                />
              </div>
              <div>
                <p className="font-bold text-white uppercase">{post.author}</p>
                <p className="text-xs text-gray-400 uppercase">{formatDate(post.date)}</p>
                {post.readTime && (
                  <p className="text-xs text-gray-500 uppercase flex items-center gap-1 mt-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readTime}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-white text-black p-3 border-2 border-black shadow-custom-sm hover:bg-gray-200 transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="bg-white text-black p-3 border-2 border-black shadow-custom-sm hover:bg-gray-200 transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8 border-4 border-white overflow-hidden shadow-custom-white">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover filter grayscale"
          />
        </div>

        {/* Article Content */}
        <div className="border-4 border-white p-8 mb-12 shadow-custom-white prose prose-invert max-w-none">
          <p className="text-xl text-white leading-relaxed mb-8">
            {post.description}
          </p>
          
          {post.content ? (
            <>
              <p className="text-gray-300 leading-relaxed mb-8">
                {post.content.introduction}
              </p>

              {post.content.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-bold text-white mt-8 mb-4 uppercase border-l-4 border-white pl-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}

              <h2 className="text-2xl font-bold text-white mt-8 mb-4 uppercase border-l-4 border-white pl-4">Conclusion</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                {post.content.conclusion}
              </p>
              
              {post.tags && post.tags.length > 0 && (
                <div className="border-t-2 border-white pt-6 mt-8">
                  <h3 className="text-lg font-bold text-white mb-4 uppercase">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white text-black text-xs px-3 py-2 font-bold uppercase tracking-wider border-2 border-black shadow-custom-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-gray-300 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4 uppercase border-l-4 border-white pl-4">Key Insights</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4 uppercase border-l-4 border-white pl-4">Conclusion</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
              </p>
            </>
          )}
        </div>

        {/* Social Share */}
        <div className="border-4 border-white p-6 mb-12 shadow-custom-white">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white uppercase">Share this article</h3>
            <div className="flex items-center gap-3">
              <Link href="#" className="bg-white p-3 border-2 border-black shadow-custom-sm hover:bg-gray-200 transition-all duration-200">
                <Image src={assets.facebook_icon} alt="Share on Facebook" width={24} height={24} />
              </Link>
              <Link href="#" className="bg-white p-3 border-2 border-black shadow-custom-sm hover:bg-gray-200 transition-all duration-200">
                <Image src={assets.twitter_icon} alt="Share on Twitter" width={24} height={24} />
              </Link>
              <Link href="#" className="bg-white p-3 border-2 border-black shadow-custom-sm hover:bg-gray-200 transition-all duration-200">
                <Image src={assets.email_icon} alt="Share via Email" width={24} height={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-12 border-4 border-white p-6 shadow-custom-white">
            <h3 className="text-2xl font-bold text-white mb-6 uppercase">Related Articles</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-black border-4 border-white shadow-custom-white hover:shadow-custom-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="overflow-hidden border-b-4 border-white">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-white line-clamp-2 group-hover:text-gray-300 transition-colors leading-tight uppercase">
                      {relatedPost.title}
                    </h4>
                    <p className="text-xs text-gray-400 uppercase mt-2">{formatDate(relatedPost.date)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 bg-white text-black p-3 px-6 border-2 border-black shadow-custom-sm hover:bg-gray-200 transition-all duration-200"
          >
            <Image src={assets.arrow} alt="Back" width={16} height={16} className="rotate-180 filter invert" />
            <span className="font-bold uppercase">Back to all posts</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
