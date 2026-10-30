import { CourseForm } from '@/components/admin/course-form'

export const metadata = { title: 'Edit course' }

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <CourseForm id={id} />
}
