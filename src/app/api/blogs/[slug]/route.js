import { NextResponse } from "next/server";
import connectDB from "../../../../../config/db.js";
import Blog from "../../../../../models/BlogModel.js";

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { slug } = params;

    const post = await Blog.findOne({ slug })
      .select('title description slug date category author author_img image readTime tags content createdAt')
      .lean();

    if (!post) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Failed to fetch blog:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}
