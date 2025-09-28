import { NextResponse } from "next/server";
import connectDB from "../../../../config/db.js";
import Blog from "../../../../models/BlogModel.js";

// GET /api/blogs?page=1&limit=10&search=foo&category=Tech
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '10', 10), 1), 50);
    const search = (searchParams.get('search') || '').trim();
    const category = (searchParams.get('category') || '').trim();

    const filter = {};
    if (search) {
      // Simple case-insensitive match on title (could be improved with text index)
      filter.title = { $regex: search, $options: 'i' };
    }
    if (category) {
      filter.category = category;
    }

    const skip = (page - 1) * limit;

    const [total, posts] = await Promise.all([
      Blog.countDocuments(filter),
      Blog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('title description slug date category author author_img image readTime tags createdAt')
        .lean()
    ]);

    const pages = Math.ceil(total / limit) || 1;

    return NextResponse.json({
      success: true,
      data: posts,
      page,
      limit,
      total,
      pages,
      hasMore: page < pages
    });
  } catch (error) {
    console.error('Failed to list blogs:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to list blogs' },
      { status: 500 }
    );
  }
}
