import { CatalogView } from '@/components/site/catalog-view'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <CatalogView categorySlug={slug} />
}
