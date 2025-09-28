import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import BlogModel from '../models/BlogModel.js';

// Sample data to seed
const sampleBlogs = [
  {
    title: "Getting Started with Next.js 15",
    description: "Learn the fundamentals of Next.js 15 and build modern web applications with the latest features and improvements.",
    category: "Technology",
    author: "Alex Bennett",
    image: "/assets/blog_pic_1.png",
    author_img: "/assets/profile_icon.png",
    slug: "getting-started-with-next-js-15",
    readTime: "8 min read",
    tags: ["nextjs", "react", "web development"],
    content: {
      introduction: "Next.js 15 brings exciting new features that make building React applications even more powerful and efficient.",
      sections: [
        {
          title: "What's New in Next.js 15",
          content: "Next.js 15 introduces several groundbreaking features including improved App Router, enhanced performance optimizations, and better developer experience."
        },
        {
          title: "Setting Up Your First Project",
          content: "Getting started with Next.js 15 is easier than ever. We'll walk through creating a new project and exploring the updated project structure."
        }
      ],
      conclusion: "Next.js 15 represents a significant step forward in React framework evolution, offering developers more tools to build exceptional web experiences."
    }
  },
  {
    title: "The Future of AI in Web Development",
    description: "Explore how artificial intelligence is revolutionizing web development processes and what developers need to know.",
    category: "Technology",
    author: "Alex Bennett", 
    image: "/assets/blog_pic_2.png",
    author_img: "/assets/profile_icon.png",
    slug: "the-future-of-ai-in-web-development",
    readTime: "12 min read",
    tags: ["ai", "web development", "future tech"],
    content: {
      introduction: "Artificial Intelligence is transforming every aspect of web development, from code generation to user experience optimization.",
      sections: [
        {
          title: "AI-Powered Development Tools",
          content: "Modern AI tools are helping developers write better code faster, with intelligent suggestions and automated testing capabilities."
        },
        {
          title: "Impact on User Experience",
          content: "AI is enabling more personalized and intuitive user experiences through smart recommendations and adaptive interfaces."
        }
      ],
      conclusion: "As AI continues to evolve, web developers who embrace these technologies will be better positioned to create innovative and efficient web solutions."
    }
  },
  {
    title: "Building Scalable Startup Architecture",
    description: "Essential architectural decisions and patterns for building startup applications that can scale from MVP to millions of users.",
    category: "Startup",
    author: "Alex Bennett",
    image: "/assets/blog_pic_3.png", 
    author_img: "/assets/profile_icon.png",
    slug: "building-scalable-startup-architecture",
    readTime: "15 min read",
    tags: ["startup", "architecture", "scaling"],
    content: {
      introduction: "Building the right architecture from day one can make the difference between a startup that scales successfully and one that struggles with technical debt.",
      sections: [
        {
          title: "Choosing the Right Tech Stack",
          content: "Selecting technologies that balance rapid development with long-term scalability is crucial for startup success."
        },
        {
          title: "Database Design for Growth", 
          content: "Planning your data architecture to handle exponential growth while maintaining performance and consistency."
        }
      ],
      conclusion: "Thoughtful architectural decisions early on provide the foundation for sustainable growth and technical excellence as your startup scales."
    }
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('Connected to MongoDB');

    // Clear existing data
    await BlogModel.deleteMany({});
    console.log('Cleared existing blog data');

    // Insert sample data
    const createdBlogs = await BlogModel.insertMany(sampleBlogs);
    console.log(`Successfully seeded ${createdBlogs.length} blog posts`);

    // Display created posts
    createdBlogs.forEach((blog, index) => {
      console.log(`${index + 1}. ${blog.title} (${blog.slug})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
