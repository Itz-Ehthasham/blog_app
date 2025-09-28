import { NextRequest, NextResponse } from 'next/server';
import { blog_data } from '@/lib/assets';

// GET /api/posts - Fetch all blog posts
export async function GET(request: NextRequest) {
  try {
    

    // For now, return static data with optional query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = searchParams.get('limit');

    let filteredPosts = [...blog_data];

    // Filter by category
    if (category && category !== 'All') {
      filteredPosts = filteredPosts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search term
    if (search) {
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply limit
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum)) {
        filteredPosts = filteredPosts.slice(0, limitNum);
      }
    }

    return NextResponse.json({
      success: true,
      data: filteredPosts,
      count: filteredPosts.length
    });

  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch posts',
        data: []
      },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // TODO: Add validation and MongoDB insertion
    // const client = new MongoClient(process.env.MONGODB_URI!);
    // await client.connect();
    // const db = client.db('bloggerapp');
    // const result = await db.collection('posts').insertOne({
    //   ...body,
    //   date: Date.now(),
    //   createdAt: new Date()
    // });
    // await client.close();

    // For now, just validate the required fields
    const requiredFields = ['title', 'description', 'category', 'author', 'image'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Post created successfully (demo mode)',
      data: { ...body, id: Date.now(), date: Date.now() }
    });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create post' 
      },
      { status: 500 }
    );
  }
}