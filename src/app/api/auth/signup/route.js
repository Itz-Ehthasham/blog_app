import { NextResponse } from "next/server";
import connectDB from "../../../../../config/db.js";
import User from "../../../../../models/UserModel.js";

export async function POST(request) {
  try {
    await connectDB();
    const { firstName, email } = await request.json();
    
    // Validate input
    if (!firstName || !email) {
      return NextResponse.json(
        { success: false, message: "First name and email are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered. Welcome back!" },
        { status: 200 }
      );
    }

    // Create new user
    const user = await User.create({ firstName, email });
    
    return NextResponse.json({ 
      success: true, 
      message: "Account created successfully!",
      data: {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
        username: user.username
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create account' },
      { status: 500 }
    );
  }
}
