'use client';

import { useState } from 'react';

export default function TestBlogsAPI() {
  const [listResult, setListResult] = useState<{ status?: number; data?: unknown; error?: string } | null>(null);
  const [singleResult, setSingleResult] = useState<{ status?: number; data?: unknown; error?: string } | null>(null);
  const [testSlug, setTestSlug] = useState('getting-started-with-next-js-15');
  const [loading, setLoading] = useState(false);

  const testListAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/blogs?page=1&limit=5&search=&category=');
      const data = await response.json();
      setListResult({ status: response.status, data });
    } catch (error: unknown) {
      setListResult({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const testSingleAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blogs/${testSlug}`);
      const data = await response.json();
      setSingleResult({ status: response.status, data });
    } catch (error: unknown) {
      setSingleResult({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">API Endpoints Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Test GET /api/blogs */}
        <div className="border border-white p-6">
          <h2 className="text-2xl font-bold mb-4">GET /api/blogs (Paginated)</h2>
          <button
            onClick={testListAPI}
            disabled={loading}
            className="bg-white text-black px-4 py-2 font-bold mb-4 hover:bg-gray-200 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test List API'}
          </button>
          
          {listResult && (
            <div className="bg-gray-900 p-4 rounded">
              <p className="text-green-400 mb-2">Status: {listResult?.status || 'Error'}</p>
              <pre className="text-xs overflow-auto max-h-96">
                {JSON.stringify(listResult, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Test GET /api/blogs/[slug] */}
        <div className="border border-white p-6">
          <h2 className="text-2xl font-bold mb-4">GET /api/blogs/[slug]</h2>
          <input
            type="text"
            value={testSlug}
            onChange={(e) => setTestSlug(e.target.value)}
            className="w-full p-2 mb-4 text-black"
            placeholder="Enter blog slug"
          />
          <button
            onClick={testSingleAPI}
            disabled={loading}
            className="bg-white text-black px-4 py-2 font-bold mb-4 hover:bg-gray-200 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Single API'}
          </button>
          
          {singleResult && (
            <div className="bg-gray-900 p-4 rounded">
              <p className="text-green-400 mb-2">Status: {singleResult?.status || 'Error'}</p>
              <pre className="text-xs overflow-auto max-h-96">
                {JSON.stringify(singleResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 p-4 border border-green-500 bg-green-900/20">
        <h3 className="text-green-400 font-bold mb-2">✅ What&apos;s been implemented:</h3>
        <ul className="text-sm space-y-1">
          <li>• <strong>GET /api/blogs</strong> → Paginated list with search/filter support</li>
          <li>• <strong>GET /api/blogs/[slug]</strong> → Single blog post by slug</li>
          <li>• <strong>Optimized queries</strong> → Using .lean() and .select() for performance</li>
          <li>• <strong>Database indexes</strong> → Added on title, category, tags, createdAt, and unique slug</li>
          <li>• <strong>Image support</strong> → Added image URL field to blog creation form</li>
        </ul>
      </div>

      <div className="mt-4 p-4 border border-blue-500 bg-blue-900/20">
        <h3 className="text-blue-400 font-bold mb-2">📝 API Features:</h3>
        <ul className="text-sm space-y-1">
          <li>• <strong>Pagination:</strong> ?page=1&limit=10</li>
          <li>• <strong>Search:</strong> ?search=keyword</li>
          <li>• <strong>Filter:</strong> ?category=Technology</li>
          <li>• <strong>Response format:</strong> {`{ success, data, page, limit, total, pages, hasMore }`}</li>
        </ul>
      </div>
    </div>
  );
}
