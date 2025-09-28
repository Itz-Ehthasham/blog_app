# BloggerApp - Full-Stack Blog Platform

A modern, brutalist-style blog application built with Next.js 15, TypeScript, MongoDB, and Tailwind CSS. Features a complete user registration system, blog creation capabilities, and a high-contrast black & white design.

## 📖 Project Overview

BloggerApp is a full-featured blogging platform that allows users to:
- **Browse** and search through blog posts with advanced filtering
- **Create accounts** with just their name and email (completely free)
- **Write and publish** their own blog posts with rich content
- **View detailed** blog posts with related articles and social sharing
- **Experience** a unique brutalist design aesthetic

The application implements a complete REST API, user authentication, and a responsive dark theme interface.

## 🚀 Local Setup Instructions

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account or local MongoDB instance
- Git installed

### Step 1: Clone and Install
```bash
# Clone the repository
git clone <your-repo-url>
cd blog_app

# Install dependencies
npm install
```

### Step 2: Environment Configuration
Create a `.env.local` file in the project root:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-app
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Step 3: Database Setup
```bash
# Seed the database with sample data
npm run seed
```

### Step 4: Run the Application
```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## 📦 Dependencies

### Core Dependencies
```json
{
  "next": "15.5.4",
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "mongoose": "^8.18.2",
  "typescript": "^5",
  "tailwindcss": "^4"
}
```

### Additional Dependencies
- **axios**: HTTP client for API requests
- **react-toastify**: User notification system
- **@eslint/eslintrc**: Code linting and formatting
- **@types/node**: TypeScript definitions for Node.js
- **@types/react**: TypeScript definitions for React

### Development Dependencies
- **eslint**: Code quality and style enforcement
- **eslint-config-next**: Next.js specific ESLint rules
- **@tailwindcss/postcss**: PostCSS integration for Tailwind

## 🗄️ Database Configuration

### MongoDB Atlas Setup
1. **Create Account**: Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create Cluster**: Set up a free cluster
3. **Database Access**: Create a database user with read/write permissions
4. **Network Access**: Add your IP address (or 0.0.0.0/0 for development)
5. **Connection String**: Copy your connection string and add it to `.env.local`

### Local MongoDB Setup (Alternative)
```bash
# Install MongoDB locally
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Windows
# Download from https://www.mongodb.com/try/download/community

# Ubuntu/Debian
sudo apt-get install mongodb

# Start MongoDB service
mongod --dbpath /path/to/data/directory
```

Then use `MONGODB_URI=mongodb://localhost:27017/blog-app` in your `.env.local`

### Database Schema
The application uses two main collections:
- **blogs**: Blog posts with content, metadata, and author information
- **users**: User accounts with email and basic profile data

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/signup/     # User registration endpoint
│   │   ├── blogs/           # Blog CRUD operations
│   │   │   ├── route.js     # GET /api/blogs (paginated)
│   │   │   ├── [slug]/      # GET /api/blogs/[slug]
│   │   │   └── create/      # POST /api/blogs/create
│   │   └── posts/           # Legacy endpoint
│   ├── add-blog/            # Blog creation page
│   ├── blog/[slug]/         # Dynamic blog post pages
│   ├── blogs/               # All blogs listing page
│   └── test-blogs-api/      # API testing page
├── components/
│   ├── BlogCard.tsx         # Blog post card with modal
│   ├── BlogDetailModal.tsx  # Blog preview modal
│   ├── Header.tsx           # Navigation with user actions
│   ├── HeroSection.tsx      # Homepage hero section
│   └── [other components]
├── hooks/
│   └── useBlogData.ts       # Data fetching and state management
├── lib/
│   └── assets.ts            # Static data and TypeScript interfaces
├── models/
│   ├── BlogModel.js         # Mongoose blog schema
│   └── UserModel.js         # Mongoose user schema
└── config/
    └── db.js                # MongoDB connection configuration
```

## 🔌 API Endpoints

### Blog Endpoints
```
GET    /api/blogs              # Paginated blog list
GET    /api/blogs/[slug]       # Single blog post
POST   /api/blogs/create       # Create new blog post
```

### User Endpoints
```
POST   /api/auth/signup        # User registration
```

### API Response Format
```json
{
  "success": true,
  "data": [...],
  "page": 1,
  "limit": 10,
  "total": 25,
  "pages": 3,
  "hasMore": true
}
```

## 🎨 Design Features

- **Brutalist Design**: High contrast black & white theme
- **Custom Shadows**: `-7px -7px 0` shadow effects throughout
- **Bold Typography**: Uppercase text with heavy font weights
- **Grayscale Images**: All images filtered for aesthetic consistency
- **Responsive Design**: Mobile-first approach with breakpoints
- **Interactive Elements**: Hover effects and smooth transitions

## 📱 Available Pages

- **Homepage** (`/`): Hero section, latest posts, and featured content
- **All Blogs** (`/blogs`): Complete blog listing with search/filter
- **Blog Post** (`/blog/[slug]`): Individual post with full content
- **Add Blog** (`/add-blog`): User registration and blog creation
- **API Test** (`/test-blogs-api`): Endpoint testing interface

## 🧪 Testing

Visit `/test-blogs-api` to test API endpoints:
- Test paginated blog listing
- Test single blog post retrieval
- Verify response formats and error handling

## 🚀 Production Deployment

### Build Commands
```bash
# Create production build
npm run build

# Start production server
npm start

# Lint code before deployment
npm run lint
```

### Environment Variables for Production
```env
MONGODB_URI=your_production_mongodb_uri
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NODE_ENV=production
```

## 📚 AI Tool Usage Disclosure

**This project extensively utilized AI assistance for development, particularly:**

### Primary AI Tool Used
- **Warp AI Terminal**: Used throughout the project for backend setup, MongoDB integration, API development, and troubleshooting. The terminal AI assist was instrumental in:
  - Setting up MongoDB Atlas connection
  - Creating optimized database queries with indexes
  - Implementing REST API endpoints with proper error handling
  - Debugging Next.js 15 async/await parameter handling
  - Database schema design and optimization

### Development Process
- **Concept & Design**: The overall concept and brutalist design aesthetic were original ideas
- **Implementation Assistance**: AI tools were heavily used for technical implementation, helping to:
  - Write boilerplate code and API routes
  - Implement TypeScript interfaces and type safety
  - Create responsive CSS layouts with Tailwind
  - Set up database models and relationships
  - Handle edge cases and error scenarios

### Inspiration Sources
- **Design Themes**: Inspired by brutalist web design trends and high-contrast interfaces found online
- **Technical Patterns**: Drew from modern React and Next.js best practices available in documentation and community resources
- **UI Components**: Inspired by various design systems but implemented with custom styling

### Time Impact
**AI assistance was crucial for completing this project within the given timeframe.** Without AI tools, particularly Warp's terminal assistant, the MongoDB integration, API optimization, and full-stack functionality would have taken significantly longer to implement correctly.

### Learning Outcome
While AI tools provided significant implementation support, the project served as an excellent learning experience for:
- Modern full-stack development patterns
- MongoDB database design and optimization
- Next.js 15 app router and server components
- TypeScript in a real-world application context
- REST API design and implementation

---

**Built with ❤️ and ⚡ AI assistance** | **MongoDB Powered** 🍃 | **Next.js 15** ⚛️ | **Production Ready** 🚀
