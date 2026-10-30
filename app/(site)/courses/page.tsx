import type { Metadata } from 'next'
import { CatalogView } from '@/components/site/catalog-view'

export const metadata: Metadata = { title: 'All courses' }

export default function CoursesPage() {
  return <CatalogView />
}
