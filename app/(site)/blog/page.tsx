import type { Metadata } from 'next'
import { BlogListView } from '@/components/site/blog-list-view'

export const metadata: Metadata = { title: 'Blog' }

export default function BlogPage() {
  return <BlogListView />
}
