import { PostForm } from '@/components/admin/post-form'

export const metadata = { title: 'Edit post' }

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <PostForm id={id} />
}
