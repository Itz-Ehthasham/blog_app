import { NextResponse } from "next/server";
import connectDB from "../../../../../config/db.js";
import Blog from "../../../../../models/BlogModel.js";
import User from "../../../../../models/UserModel.js";

export async function POST(request) {
  try {
    await connectDB();
    const { title, description, category, content, tags, userId, image } = await request.json();
    
    // Validate required fields
    if (!title || !description || !category || !content || !userId) {
      return NextResponse.json(
        { success: false, message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Create blog post
    const blogData = {
      title,
      description,
      category,
      author: user.firstName,
      author_img: "/assets/profile_icon.png", // Default author image
      image: image && image.trim() ? image.trim() : `/assets/blog_pic_${Math.floor(Math.random() * 16) + 1}.png`, // Use provided or random
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      content: {
        introduction: content.substring(0, 200) + "...", // First 200 chars as intro
        sections: [
          {
            title: "Main Content",
            content: content
          }
        ],
        conclusion: "Thank you for reading this blog post. Hope you found it informative!"
      },
      readTime: `${Math.ceil(content.length / 200)} min read` // Rough estimate
    };

    const blog = await Blog.create(blogData);
    
    // Update user's blog count
    await User.findByIdAndUpdate(userId, { 
      $inc: { blogCount: 1 } 
    });

    return NextResponse.json({ 
      success: true, 
      message: "Blog post created successfully!",
      data: {
        id: blog._id,
        title: blog.title,
        slug: blog.slug
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Blog creation error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
