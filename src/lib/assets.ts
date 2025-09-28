// Asset paths for Next.js public directory
export const assets = {
  facebook_icon: '/assets/facebook_icon.png',
  googleplus_icon: '/assets/googleplus_icon.png',
  twitter_icon: '/assets/twitter_icon.png',
  profile_icon: '/assets/profile_icon.png',
  logo: '/assets/logo.png',
  arrow: '/assets/arrow.png',
  logo_light: '/assets/logo_light.png',
  blog_icon: '/assets/blog_icon.png',
  add_icon: '/assets/add_icon.png',
  email_icon: '/assets/email_icon.png',
  upload_area: '/assets/upload_area.png'
};

// Blog post interface
export interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  date: number;
  category: string;
  author: string;
  author_img: string;
  slug?: string;
}

// Generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export const blog_data: BlogPost[] = [
  {
    id: 1,
    title: "A detailed step by step guide to manage your lifestyle",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
    image: "/assets/blog_pic_1.png",
    date: Date.now(),
    category: "Lifestyle",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("A detailed step by step guide to manage your lifestyle")
  },
  {
    id: 2,
    title: "How to create an effective startup roadmap or ideas",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
    image: "/assets/blog_pic_2.png",
    date: Date.now(),
    category: "Startup",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("How to create an effective startup roadmap or ideas")
  },
  {
    id: 3,
    title: "Learning new technology to boost your career in software",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
    image: "/assets/blog_pic_3.png",
    date: Date.now(),
    category: "Technology",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("Learning new technology to boost your career in software")
  },
  {
    id: 4,
    title: "Tips for getting the most out of apps and software",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
    image: "/assets/blog_pic_4.png",
    date: Date.now(),
    category: "Technology",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("Tips for getting the most out of apps and software")
  },
  {
    id: 5,
    title: "Enhancing your skills and capturing memorable moments",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
    image: "/assets/blog_pic_5.png",
    date: Date.now(),
    category: "Lifestyle",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("Enhancing your skills and capturing memorable moments")
  },
  {
    id: 6,
    title: "Maximizing returns by minimizing resources in your startup",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
    image: "/assets/blog_pic_6.png",
    date: Date.now(),
    category: "Startup",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("Maximizing returns by minimizing resources in your startup")
  },
  {
    id: 7,
    title: "Technology for Career advancement in development",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
    image: "/assets/blog_pic_7.png",
    date: Date.now(),
    category: "Technology",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("Technology for Career advancement in development")
  },
  {
    id: 8,
    title: "A comprehensive roadmap for effective lifestyle management",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
    image: "/assets/blog_pic_8.png",
    date: Date.now(),
    category: "Lifestyle",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("A comprehensive roadmap for effective lifestyle management")
  },
  {
    id: 9,
    title: "Achieving maximum returns with minimal resources",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
    image: "/assets/blog_pic_9.png",
    date: Date.now(),
    category: "Startup",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("Achieving maximum returns with minimal resources")
  },
  {
    id: 10,
    title: "Beyond the Ordinary: Crafting Your Exceptional Lifestyle",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
    image: "/assets/blog_pic_10.png",
    date: Date.now(),
    category: "Lifestyle",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("Beyond the Ordinary: Crafting Your Exceptional Lifestyle")
  },
  {
    id: 11,
    title: "Unveiling the Secrets of Successful Startups in Technology",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
    image: "/assets/blog_pic_11.png",
    date: Date.now(),
    category: "Startup",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("Unveiling the Secrets of Successful Startups in Technology")
  },
  {
    id: 12,
    title: "How to design an online Learning Platform today",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
    image: "/assets/blog_pic_12.png",
    date: Date.now(),
    category: "Technology",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("How to design an online Learning Platform today")
  },
  {
    id: 13,
    title: "Tomorrow's Algorithms: Shaping the Landscape of Future AI",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
    image: "/assets/blog_pic_13.png",
    date: Date.now(),
    category: "Startup",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("Tomorrow's Algorithms: Shaping the Landscape of Future AI")
  },
  {
    id: 14,
    title: "Balance & Bliss: Navigating Life's Journey with Style",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
    image: "/assets/blog_pic_14.png",
    date: Date.now(),
    category: "Lifestyle",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("Balance & Bliss: Navigating Life's Journey with Style")
  },
  {
    id: 15,
    title: "Exploring the Evolution of social networking in the Future",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
    image: "/assets/blog_pic_15.png",
    date: Date.now(),
    category: "Technology",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("Exploring the Evolution of social networking in the Future")
  },
  {
    id: 16,
    title: "Shaping the Future of startup ecosystem in the world",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the..",
    image: "/assets/blog_pic_16.png",
    date: Date.now(),
    category: "Startup",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("Shaping the Future of startup ecosystem in the world")
  }
];

// Get unique categories for filtering
export const getUniqueCategories = (): string[] => {
  const categories = blog_data.map(post => post.category);
  return Array.from(new Set(categories));
};

// Get blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blog_data.find(post => post.slug === slug);
};

// Get blog post by ID
export const getBlogPostById = (id: number): BlogPost | undefined => {
  return blog_data.find(post => post.id === id);
};
