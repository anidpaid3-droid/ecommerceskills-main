import type { Metadata } from 'next'
import { CategoriesView } from '@/components/site/categories-view'

export const metadata: Metadata = { title: 'Categories' }

export default function CategoriesPage() {
  return <CategoriesView />
}
