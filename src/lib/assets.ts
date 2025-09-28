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
  content?: {
    introduction: string;
    sections: {
      title: string;
      content: string;
    }[];
    conclusion: string;
  };
  readTime?: string;
  tags?: string[];
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
    description: "Discover practical strategies to organize your daily routine, achieve work-life balance, and create sustainable habits that enhance your overall well-being and productivity.",
    image: "/assets/blog_pic_1.png",
    date: Date.now(),
    category: "Lifestyle",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("A detailed step by step guide to manage your lifestyle"),
    readTime: "8 min read",
    tags: ["lifestyle", "productivity", "wellness", "habits"],
    content: {
      introduction: "Managing your lifestyle effectively is crucial for achieving personal and professional success. This comprehensive guide will walk you through proven strategies to organize your daily routine, maintain work-life balance, and build sustainable habits that contribute to your overall well-being.",
      sections: [
        {
          title: "Setting Clear Priorities",
          content: "The foundation of effective lifestyle management begins with understanding what matters most to you. Start by identifying your core values and long-term goals. Create a priority matrix to categorize tasks and commitments based on their importance and urgency. This helps you allocate time and energy to activities that truly align with your objectives."
        },
        {
          title: "Creating Sustainable Daily Routines",
          content: "Consistency is key to lifestyle management. Develop morning and evening routines that set you up for success. Include activities that nourish your mind, body, and spirit. Start small with 2-3 key habits and gradually build upon them. Remember, the goal is progress, not perfection."
        },
        {
          title: "Time Management Strategies",
          content: "Effective time management involves more than just scheduling. Learn to batch similar tasks together, eliminate time-wasters, and create boundaries around your most productive hours. Use time-blocking techniques to dedicate specific periods to important activities without distractions."
        },
        {
          title: "Maintaining Work-Life Balance",
          content: "True work-life balance isn't about equal time distribution—it's about creating harmony between different aspects of your life. Set clear boundaries between work and personal time, learn to say no to commitments that don't serve your goals, and regularly reassess your priorities as your life evolves."
        }
      ],
      conclusion: "Lifestyle management is an ongoing process that requires patience, consistency, and self-compassion. Start with small changes, track your progress, and remember that the goal is to create a life that feels authentic and fulfilling to you. With the right strategies and mindset, you can build a lifestyle that supports your goals and enhances your overall quality of life."
    }
  },
  {
    id: 2,
    title: "How to create an effective startup roadmap or ideas",
    description: "Learn how to develop a comprehensive startup roadmap that guides your business from concept to launch, including market research, MVP development, and scaling strategies.",
    image: "/assets/blog_pic_2.png",
    date: Date.now(),
    category: "Startup",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("How to create an effective startup roadmap or ideas"),
    readTime: "12 min read",
    tags: ["startup", "business planning", "roadmap", "entrepreneurship"],
    content: {
      introduction: "Creating a startup roadmap is one of the most critical steps in transforming your business idea into a successful venture. A well-structured roadmap serves as your north star, guiding decision-making and helping you navigate the complexities of building a startup from the ground up.",
      sections: [
        {
          title: "Market Research and Validation",
          content: "Before diving into product development, conduct thorough market research to validate your idea. Identify your target audience, analyze competitors, and understand market dynamics. Use surveys, interviews, and focus groups to gather feedback on your concept. This research forms the foundation of your entire roadmap."
        },
        {
          title: "Defining Your MVP (Minimum Viable Product)",
          content: "Your MVP is the simplest version of your product that still provides value to users. Define core features that solve your target audience's primary pain points. Avoid feature creep in the early stages—focus on building something that works well rather than something that does everything."
        },
        {
          title: "Building Your Development Timeline",
          content: "Create realistic timelines for each phase of development. Break down your roadmap into sprints or milestones, typically spanning 2-4 weeks each. Include buffer time for unexpected challenges and iterations based on user feedback. Remember, flexibility is crucial in startup development."
        },
        {
          title: "Funding and Resource Planning",
          content: "Determine your funding needs for each stage of development. Whether bootstrapping, seeking angel investors, or applying for grants, align your financial strategy with your roadmap milestones. Plan for both best-case and worst-case scenarios to ensure sustainable growth."
        }
      ],
      conclusion: "An effective startup roadmap is a living document that evolves with your business. Regular reviews and updates ensure you stay aligned with market needs and business objectives. Remember, the goal isn't to predict the future perfectly, but to create a framework that guides smart decision-making and helps you adapt quickly to changing circumstances."
    }
  },
  {
    id: 3,
    title: "Learning new technology to boost your career in software",
    description: "Discover effective strategies for staying current with rapidly evolving technology trends, building relevant skills, and advancing your software development career in a competitive market.",
    image: "/assets/blog_pic_3.png",
    date: Date.now(),
    category: "Technology",
    author: "Alex Bennett",
    author_img: "/assets/profile_icon.png",
    slug: generateSlug("Learning new technology to boost your career in software"),
    readTime: "10 min read",
    tags: ["technology", "career development", "programming", "software engineering"],
    content: {
      introduction: "In the fast-paced world of software development, continuous learning isn't just beneficial—it's essential for career growth. With new frameworks, languages, and tools emerging constantly, developers must strategically approach their learning to stay competitive and advance their careers.",
      sections: [
        {
          title: "Identifying In-Demand Technologies",
          content: "Research job market trends, analyze job postings in your target companies, and follow industry reports to identify which technologies are gaining traction. Focus on technologies that align with your career goals and have strong long-term prospects rather than chasing every new trend."
        },
        {
          title: "Creating a Learning Strategy",
          content: "Develop a structured approach to learning that balances depth and breadth. Allocate specific time slots for learning, set measurable goals, and track your progress. Consider the 70-20-10 rule: 70% hands-on practice, 20% learning from others, and 10% formal training."
        },
        {
          title: "Building Projects and Portfolios",
          content: "Apply your new knowledge through practical projects that demonstrate your skills to potential employers. Create a diverse portfolio showcasing different technologies and problem-solving approaches. Document your learning journey and share insights through blogs or open-source contributions."
        },
        {
          title: "Networking and Community Engagement",
          content: "Engage with developer communities, attend conferences, and participate in online forums. Networking not only provides learning opportunities but also opens doors to new career prospects. Consider mentoring others as you learn—teaching reinforces your own understanding."
        }
      ],
      conclusion: "Technology learning is a marathon, not a sprint. Focus on building a strong foundation in core concepts while staying curious about emerging trends. The key is to remain adaptable and maintain a growth mindset. Remember, the most successful developers are those who can learn quickly and apply new knowledge effectively in real-world scenarios."
    }
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
