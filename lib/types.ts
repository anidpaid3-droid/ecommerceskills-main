export type Level = 'Beginner' | 'Intermediate' | 'Advanced'

export interface Category {
  id: string
  slug: string
  name: string
  description: string
}

export interface Course {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  price: number
  salePrice?: number
  categoryId: string
  image: string
  instructor: string
  level: Level
  duration: string
  lessons: number
  rating: number
  students: number
  outcomes: string[]
  curriculum: string[]
  featured: boolean
  published: boolean
  createdAt: string
}

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  tag: string
  readTime: string
  published: boolean
  createdAt: string
}

export type OrderStatus = 'paid' | 'refunded'

export interface OrderItem {
  courseId: string
  title: string
  price: number
}

export interface Order {
  id: string
  name: string
  email: string
  country: string
  items: OrderItem[]
  subtotal: number
  discount: number
  total: number
  coupon?: string
  status: OrderStatus
  createdAt: string
}

export interface Message {
  id: string
  name: string
  email: string
  subject: string
  body: string
  createdAt: string
}

export interface StoreState {
  categories: Category[]
  courses: Course[]
  posts: Post[]
  orders: Order[]
  messages: Message[]
  cart: string[]
}
