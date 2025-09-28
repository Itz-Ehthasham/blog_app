import { NextResponse } from "next/server";
import connectDB from "../../../../config/db.js";
import Blog from "../../../../models/BlogModel.js";

export async function GET() {
  try {
    await connectDB();
    console.log("API route hit: GET /api/posts");
    
    const posts = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json({ 
      success: true, 
      data: posts 
    });
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const post = await Blog.create(body);
    return NextResponse.json({ 
      success: true, 
      data: post 
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create post:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create post' },
      { status: 500 }
    );
  }
}