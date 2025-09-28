# BloggerApp - Black & White Theme

A modern, brutalist-style blog application built with Next.js 15, TypeScript, and Tailwind CSS.

## 🎨 Design Features

- **Black & White Theme**: High contrast brutalist design
- **Custom Shadows**: `-7px -7px 0` shadow effects throughout
- **Bold Typography**: Uppercase text with heavy font weights
- **Grayscale Images**: All images filtered to grayscale
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
src/
├── app/
│   ├── api/posts/          # API routes for blog posts
│   ├── blog/[slug]/        # Dynamic blog post pages
│   ├── blogs/              # All blogs listing page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage (refactored)
├── components/
│   ├── BlogCard.tsx        # Individual blog post card
│   ├── FeaturedPostsSection.tsx  # Featured posts grid
│   ├── Header.tsx          # Navigation header
│   ├── HeroSection.tsx     # Homepage hero
│   ├── LatestPostSection.tsx     # Latest post featured
│   ├── LoadingSpinner.tsx  # Loading state component
│   ├── SearchAndFilter.tsx # Search & filter functionality
│   └── SearchSection.tsx   # Search section wrapper
├── hooks/
│   └── useBlogData.ts      # Custom hooks for data management
└── lib/
    └── assets.ts           # Blog data and types
```

## 🔧 Refactoring Changes

### ✅ **Completed**

1. **Component Separation**: Broke down monolithic `page.tsx` into modular components
2. **Custom Hooks**: Created `useBlogData` and `useFilteredPosts` for state management
3. **Error Handling**: Added proper loading and error states
4. **API Structure**: Prepared `/api/posts` route for MongoDB integration
5. **TypeScript**: Full type safety with interfaces and proper typing

### 🔄 **Components Created**

- `HeroSection`: Homepage banner with branding
- `LatestPostSection`: Featured latest post display
- `SearchSection`: Search and filter interface
- `FeaturedPostsSection`: Posts grid with filtering
- `LoadingSpinner`: Loading state UI

### 📊 **Data Management**

- **Custom Hooks**: `useBlogData()` for fetching and `useFilteredPosts()` for filtering
- **API Ready**: `/api/posts` endpoint prepared for MongoDB
- **Error States**: Comprehensive error handling and user feedback
- **Loading States**: Smooth loading transitions

## 🗄️ MongoDB Integration

### 🚀 **Ready for Integration**

The application is structured for easy MongoDB integration:

1. **API Route**: `/api/posts/route.ts` contains TODO markers for MongoDB code
2. **Custom Hook**: `useBlogData.ts` ready to switch from static to API data
3. **Environment**: Add `.env.local` with `MONGODB_URI`

### 📝 **To Add MongoDB**

1. Install dependencies:
   ```bash
   npm install mongodb
   ```

2. Create `.env.local`:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

3. Uncomment MongoDB code in:
   - `/src/app/api/posts/route.ts`
   - `/src/hooks/useBlogData.ts`

## 🚀 **Development**

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server  
npm start

# Lint code
npm run lint
```

## 📱 **Pages**

- **Homepage** (`/`): Hero, latest post, search, featured posts
- **All Blogs** (`/blogs`): Complete blog listing with search/filter
- **Blog Post** (`/blog/[slug]`): Individual post with related articles

## 🎨 **Custom CSS Classes**

```css
.shadow-custom      /* -7px -7px 0 #000000 */
.shadow-custom-white /* -7px -7px 0 #ffffff */
.shadow-custom-sm   /* -3px -3px 0 #000000 */
.shadow-custom-lg   /* -10px -10px 0 #000000 */
.border-thick       /* 3px solid border */
```

## 📊 **Performance**

- **Static Generation**: All blog posts pre-generated at build time
- **Optimized Images**: Next.js Image component with proper sizing
- **Code Splitting**: Automatic route-based code splitting
- **TypeScript**: Compile-time error checking

---

**Ready for MongoDB integration** 🍃 **Clean, modular architecture** 🏗️ **Production-ready** 🚀
