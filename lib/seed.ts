import type { StoreState } from './types'

export const seedState: StoreState = {
  categories: [
    { id: 'cat-dev', slug: 'development', name: 'Development', description: 'Build for the web with modern tools, from first HTML page to production apps.' },
    { id: 'cat-design', slug: 'design', name: 'Design', description: 'Interface, product and visual design taught by working designers.' },
    { id: 'cat-marketing', slug: 'marketing', name: 'Marketing', description: 'Grow audiences and revenue with strategy, content and analytics.' },
    { id: 'cat-photo', slug: 'photography', name: 'Photography', description: 'Master light, composition and editing with any camera.' },
    { id: 'cat-data', slug: 'data-science', name: 'Data Science', description: 'Analyze, visualize and model data with Python and SQL.' },
    { id: 'cat-business', slug: 'business', name: 'Business', description: 'Lead teams, run projects and build a business that lasts.' },
  ],
  courses: [
    {
      id: 'c-1', slug: 'modern-web-development', title: 'Modern Web Development', subtitle: 'From HTML basics to full-stack apps with React and Next.js.',
      description: 'A practical, project-driven path into web development. You will start with the foundations of HTML, CSS and JavaScript, then move into React, routing, data fetching and deployment. Every module ends with a small project so you leave with a portfolio, not just notes.\n\nThe course is designed for people who learn by building. No prior coding experience is required, just curiosity and a few hours a week.',
      price: 129, salePrice: 89, categoryId: 'cat-dev', image: '/images/course-webdev.png', instructor: 'Daniel Okafor', level: 'Beginner', duration: '24h 30m', lessons: 112, rating: 4.8, students: 12840,
      outcomes: ['Build responsive layouts with modern CSS', 'Write clean, modern JavaScript', 'Create interactive UIs with React', 'Deploy full-stack apps with Next.js'],
      curriculum: ['Getting started with the web', 'HTML and semantic structure', 'CSS layout with Flexbox and Grid', 'JavaScript fundamentals', 'React components and state', 'Next.js routing and data', 'Deploying your project'],
      featured: true, published: true, createdAt: '2026-08-01T10:00:00.000Z',
    },
    {
      id: 'c-2', slug: 'ui-design-foundations', title: 'UI Design Foundations', subtitle: 'Typography, color, layout and systems for beautiful interfaces.',
      description: 'Learn the principles behind interfaces that feel effortless. This course breaks down typography, color, spacing and hierarchy, then shows you how to turn those decisions into a reusable design system.\n\nYou will redesign three real products step by step and finish with a polished case study.',
      price: 99, categoryId: 'cat-design', image: '/images/course-design.png', instructor: 'Mira Castellanos', level: 'Beginner', duration: '14h 10m', lessons: 64, rating: 4.9, students: 8421,
      outcomes: ['Choose and pair typefaces with confidence', 'Build accessible color palettes', 'Design with grids and spacing scales', 'Create a reusable component library'],
      curriculum: ['How great interfaces work', 'Typography that reads well', 'Color and contrast', 'Layout, grids and spacing', 'Components and design systems', 'Portfolio case study'],
      featured: true, published: true, createdAt: '2026-08-05T10:00:00.000Z',
    },
    {
      id: 'c-3', slug: 'growth-marketing-playbook', title: 'Growth Marketing Playbook', subtitle: 'Acquisition, retention and analytics for modern teams.',
      description: 'A complete playbook for growing a product or business online. Cover positioning, content, paid channels, email and analytics, with templates you can reuse immediately.\n\nIdeal for founders, marketers and anyone responsible for growth.',
      price: 149, salePrice: 119, categoryId: 'cat-marketing', image: '/images/course-marketing.png', instructor: 'Priya Raman', level: 'Intermediate', duration: '18h 45m', lessons: 80, rating: 4.7, students: 5310,
      outcomes: ['Define a clear positioning statement', 'Plan a content engine that compounds', 'Run and measure paid experiments', 'Build retention with lifecycle email'],
      curriculum: ['Positioning and messaging', 'Content strategy', 'SEO essentials', 'Paid acquisition', 'Email and lifecycle', 'Analytics and experimentation'],
      featured: true, published: true, createdAt: '2026-08-10T10:00:00.000Z',
    },
    {
      id: 'c-4', slug: 'photography-masterclass', title: 'Photography Masterclass', subtitle: 'Shoot with intention and edit like a professional.',
      description: 'Understand your camera inside out and learn how to see light. From exposure and composition to editing in Lightroom, this masterclass takes you from automatic mode to a confident personal style.',
      price: 89, categoryId: 'cat-photo', image: '/images/course-photo.png', instructor: 'Jonas Lindqvist', level: 'Beginner', duration: '11h 20m', lessons: 52, rating: 4.8, students: 9702,
      outcomes: ['Master manual exposure', 'Compose stronger images', 'Work with natural and artificial light', 'Edit a consistent portfolio'],
      curriculum: ['Know your camera', 'Exposure triangle', 'Composition', 'Working with light', 'Editing workflow', 'Building a portfolio'],
      featured: false, published: true, createdAt: '2026-08-15T10:00:00.000Z',
    },
    {
      id: 'c-5', slug: 'python-for-data-analysis', title: 'Python for Data Analysis', subtitle: 'Pandas, visualization and real-world datasets.',
      description: 'Go from spreadsheets to Python. Learn to clean, analyze and visualize data with pandas and matplotlib, then answer real business questions with real datasets.',
      price: 139, salePrice: 99, categoryId: 'cat-data', image: '/images/course-data.png', instructor: 'Aiko Tanaka', level: 'Intermediate', duration: '20h 05m', lessons: 95, rating: 4.9, students: 7215,
      outcomes: ['Write Python for analysis', 'Clean messy data with pandas', 'Visualize insights clearly', 'Present findings to stakeholders'],
      curriculum: ['Python refresher', 'Pandas fundamentals', 'Cleaning and reshaping data', 'Visualization', 'Statistics essentials', 'Capstone analysis'],
      featured: true, published: true, createdAt: '2026-08-20T10:00:00.000Z',
    },
    {
      id: 'c-6', slug: 'leading-high-performing-teams', title: 'Leading High-Performing Teams', subtitle: 'Practical leadership for new and growing managers.',
      description: 'Everything nobody tells you when you become a manager. Learn how to run great one-on-ones, give feedback, set goals and build a team culture people want to be part of.',
      price: 119, categoryId: 'cat-business', image: '/images/course-business.png', instructor: 'Grace Whitfield', level: 'Advanced', duration: '9h 40m', lessons: 41, rating: 4.6, students: 3988,
      outcomes: ['Run effective one-on-ones', 'Give feedback that lands', 'Set clear goals and priorities', 'Grow and retain great people'],
      curriculum: ['The manager mindset', 'One-on-ones', 'Feedback and coaching', 'Goals and planning', 'Hiring and growth'],
      featured: false, published: true, createdAt: '2026-08-25T10:00:00.000Z',
    },
  ],
  posts: [
    {
      id: 'p-1', slug: 'build-a-study-habit-that-sticks', title: 'How to build a study habit that actually sticks', excerpt: 'Motivation fades. Systems last. Here is a simple weekly routine our most successful students swear by.',
      content: 'Most people start a course with a burst of energy and stall by week three. That is not a character flaw. It is a planning problem.\n\nStart small. Commit to twenty-five focused minutes, four days a week. Put those sessions on your calendar like meetings, and protect them.\n\nEnd every session by writing down the very next step. When you sit down next time, you will know exactly where to begin, which removes the hardest part of studying: getting started.\n\nFinally, review weekly. Ten minutes on Sunday to look at what you finished and plan what is next keeps momentum alive for months.',
      image: '/images/blog-habits.png', author: 'Priya Raman', tag: 'Learning', readTime: '5 min read', published: true, createdAt: '2026-10-12T09:00:00.000Z',
    },
    {
      id: 'p-2', slug: 'switching-careers-into-tech', title: 'Switching careers into tech: a realistic roadmap', excerpt: 'You do not need a degree to break into tech, but you do need a plan. Here is the one we recommend.',
      content: 'Career switchers bring something valuable: context from another industry. The trick is pairing that context with a credible new skill.\n\nPick one direction and go deep for three months. Development, design and data all have clear entry points, and our courses are structured around them.\n\nBuild in public. Share your projects, write about what you learn and ask for feedback. Hiring managers notice people who show their work.\n\nFinally, lean on your network. Your next job is more likely to come from a conversation than an application form.',
      image: '/images/blog-career.png', author: 'Daniel Okafor', tag: 'Careers', readTime: '7 min read', published: true, createdAt: '2026-10-05T09:00:00.000Z',
    },
    {
      id: 'p-3', slug: 'portfolio-that-gets-interviews', title: 'The portfolio that gets you interviews', excerpt: 'Three case studies beat thirty screenshots. Learn how to structure work that tells a story.',
      content: 'A portfolio is not a gallery. It is evidence of how you think.\n\nChoose three projects and tell the story of each: the problem, your process, the decisions you made and the result. Show the messy middle, not only the polished end.\n\nKeep it scannable. Recruiters spend under a minute on a first pass, so lead with a one-line summary and a strong hero image.\n\nAnd update it often. A portfolio that grows with you shows momentum, which is exactly what employers are looking for.',
      image: '/images/blog-portfolio.png', author: 'Mira Castellanos', tag: 'Design', readTime: '6 min read', published: true, createdAt: '2026-09-28T09:00:00.000Z',
    },
  ],
  orders: [],
  messages: [],
  cart: [],
}
