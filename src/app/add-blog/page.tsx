'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  firstName: string;
  email: string;
  username: string;
}

export default function AddBlogPage() {
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const router = useRouter();

  // Blog form state
  const [blogTitle, setBlogTitle] = useState('');
  const [blogDescription, setBlogDescription] = useState('');
  const [blogCategory, setBlogCategory] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogTags, setBlogTags] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [blogLoading, setBlogLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email })
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.data);
        setMessage(data.message);
        setMessageType('success');
        // Store user in localStorage for persistence
        localStorage.setItem('blogUser', JSON.stringify(data.data));
      } else {
        setMessage(data.message);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('blogUser');
    setFirstName('');
    setEmail('');
    setMessage('');
    // Clear blog form
    setBlogTitle('');
    setBlogDescription('');
    setBlogCategory('');
    setBlogContent('');
    setBlogTags('');
    setBlogImage('');
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setBlogLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/blogs/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: blogTitle,
          description: blogDescription,
          category: blogCategory,
          content: blogContent,
          tags: blogTags,
          userId: user.id,
          image: blogImage
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessage(`Blog "${data.data.title}" created successfully!`);
        setMessageType('success');
        // Clear form
        setBlogTitle('');
        setBlogDescription('');
        setBlogCategory('');
        setBlogContent('');
        setBlogTags('');
        setBlogImage('');
        // Redirect to the new blog post after 2 seconds
        setTimeout(() => {
          router.push(`/blog/${data.data.slug}`);
        }, 2000);
      } else {
        setMessage(data.message);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
      setMessageType('error');
    } finally {
      setBlogLoading(false);
    }
  };

  // Check for existing user on page load
  useEffect(() => {
    const savedUser = localStorage.getItem('blogUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (user) {
    return (
      <main className="min-h-screen bg-black text-white py-12">
        <div className="max-w-4xl mx-auto px-5 md:px-12 lg:px-20">
          {/* Header */}
          <div className="flex justify-between items-center mb-12 border-4 border-white p-6 shadow-custom-white">
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-wider mb-2">
                CREATE YOUR BLOG
              </h1>
              <p className="text-xl text-gray-300 font-bold uppercase">
                Welcome back, {user.firstName}! (@{user.username})
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-black px-6 py-3 font-bold uppercase tracking-wider border-2 border-black shadow-custom-sm hover:bg-gray-200 transition-all duration-200"
            >
              Logout
            </button>
          </div>

          {/* Blog Creation Form */}
          <div className="border-4 border-white p-8 shadow-custom-white">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase">NEW BLOG POST</h2>
            
            {message && (
              <div className={`p-4 border-4 mb-6 ${
                messageType === 'success' 
                  ? 'border-green-500 bg-green-900/20 text-green-400' 
                  : 'border-red-500 bg-red-900/20 text-red-400'
              }`}>
                <p className="font-bold uppercase">{message}</p>
              </div>
            )}

            <form onSubmit={handleBlogSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-bold mb-2 uppercase tracking-wide">
                  Title *
                </label>
                <input
                  type="text"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  className="w-full p-4 border-4 border-black bg-white text-black font-bold uppercase tracking-wide focus:outline-none focus:shadow-custom-lg"
                  placeholder="ENTER YOUR BLOG TITLE"
                  required
                  disabled={blogLoading}
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2 uppercase tracking-wide">
                  Description *
                </label>
                <textarea
                  rows={4}
                  value={blogDescription}
                  onChange={(e) => setBlogDescription(e.target.value)}
                  className="w-full p-4 border-4 border-black bg-white text-black font-bold uppercase tracking-wide focus:outline-none focus:shadow-custom-lg resize-none"
                  placeholder="BRIEF DESCRIPTION OF YOUR BLOG POST"
                  required
                  disabled={blogLoading}
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2 uppercase tracking-wide">
                  Category *
                </label>
                <select
                  value={blogCategory}
                  onChange={(e) => setBlogCategory(e.target.value)}
                  className="w-full p-4 border-4 border-black bg-white text-black font-bold uppercase tracking-wide focus:outline-none focus:shadow-custom-lg"
                  required
                  disabled={blogLoading}
                >
                  <option value="">SELECT CATEGORY</option>
                  <option value="Technology">TECHNOLOGY</option>
                  <option value="Lifestyle">LIFESTYLE</option>
                  <option value="Startup">STARTUP</option>
                  <option value="Business">BUSINESS</option>
                  <option value="Design">DESIGN</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-bold mb-2 uppercase tracking-wide">
                  Content *
                </label>
                <textarea
                  rows={10}
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  className="w-full p-4 border-4 border-black bg-white text-black font-bold uppercase tracking-wide focus:outline-none focus:shadow-custom-lg resize-none"
                  placeholder="WRITE YOUR BLOG CONTENT HERE..."
                  required
                  disabled={blogLoading}
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2 uppercase tracking-wide">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={blogTags}
                  onChange={(e) => setBlogTags(e.target.value)}
                  className="w-full p-4 border-4 border-black bg-white text-black font-bold uppercase tracking-wide focus:outline-none focus:shadow-custom-lg"
                  placeholder="TAG1, TAG2, TAG3"
                  disabled={blogLoading}
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2 uppercase tracking-wide">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  value={blogImage}
                  onChange={(e) => setBlogImage(e.target.value)}
                  className="w-full p-4 border-4 border-black bg-white text-black font-bold uppercase tracking-wide focus:outline-none focus:shadow-custom-lg"
                  placeholder="https://example.com/your-image.png"
                  disabled={blogLoading}
                />
                <p className="text-gray-400 text-xs mt-2 uppercase">If not provided, a default image will be used.</p>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={blogLoading}
                  className="bg-white text-black px-8 py-4 font-black uppercase tracking-wider border-4 border-black shadow-custom hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {blogLoading ? 'PUBLISHING...' : 'PUBLISH BLOG'}
                </button>
                <button
                  type="button"
                  disabled={blogLoading}
                  className="bg-black text-white px-8 py-4 font-black uppercase tracking-wider border-4 border-white shadow-custom-white hover:bg-gray-900 transition-all duration-200 disabled:opacity-50"
                >
                  SAVE DRAFT
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white py-12">
      <div className="max-w-4xl mx-auto px-5 md:px-12 lg:px-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 uppercase tracking-wider">
            CREATE YOUR OWN BLOG
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-bold uppercase tracking-wide mb-8">
            SHARE YOUR IDEAS WITH THE WORLD. START YOUR BLOGGING JOURNEY TODAY.
          </p>
        </div>

        {/* Signup Form */}
        <div className="max-w-2xl mx-auto">
          <div className="border-4 border-white p-8 shadow-custom-white">
            <h2 className="text-3xl font-bold text-white mb-6 uppercase text-center">
              GET STARTED
            </h2>
            
            {message && (
              <div className={`p-4 border-4 mb-6 ${
                messageType === 'success' 
                  ? 'border-green-500 bg-green-900/20 text-green-400' 
                  : 'border-red-500 bg-red-900/20 text-red-400'
              }`}>
                <p className="font-bold uppercase">{message}</p>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label htmlFor="firstName" className="block text-white font-bold mb-2 uppercase tracking-wide">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-4 border-4 border-black bg-white text-black font-bold uppercase tracking-wide focus:outline-none focus:shadow-custom-lg"
                  placeholder="ENTER YOUR FIRST NAME"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-bold mb-2 uppercase tracking-wide">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 border-4 border-black bg-white text-black font-bold uppercase tracking-wide focus:outline-none focus:shadow-custom-lg"
                  placeholder="ENTER YOUR EMAIL"
                  required
                  disabled={loading}
                />
                <p className="text-green-400 text-sm mt-2 font-bold uppercase tracking-wide">
                  ✓ IT'S COMPLETELY FREE
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black p-4 font-black text-xl uppercase tracking-wider border-4 border-black shadow-custom hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'CREATING ACCOUNT...' : 'START BLOGGING'}
              </button>
            </form>

            <div className="mt-8 p-4 border-2 border-gray-600 bg-gray-900/50">
              <h3 className="text-white font-bold mb-2 uppercase">What you get:</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>✓ Create unlimited blog posts</li>
                <li>✓ Share your content with readers</li>
                <li>✓ Build your online presence</li>
                <li>✓ No hidden fees or charges</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
