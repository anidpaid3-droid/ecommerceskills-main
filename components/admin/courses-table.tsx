'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { buttonVariants } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteCourse, effectivePrice, formatPrice, useStore } from '@/lib/store'
import { AdminPageHeader, ConfirmDelete, StatusBadge } from './admin-ui'

export function CoursesTable() {
  const { courses, categories } = useStore()
  const categoryName = new Map(categories.map((c) => [c.id, c.name]))

  return (
    <>
      <AdminPageHeader
        title="Courses"
        description="Upload new courses and edit existing ones."
        actions={
          <Link href="/admin/courses/new" className={buttonVariants()}>
            <Plus aria-hidden="true" />
            Upload course
          </Link>
        }
      />
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-5">Course</TableHead>
              <TableHead className="hidden xl:table-cell">Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="pr-5 text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="pl-5">
                  <div className="flex items-center gap-3">
                    <div className="aspect-[16/10] w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                      {course.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={course.image || '/placeholder.svg'} alt="" className="size-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <Link href={`/admin/courses/${course.id}`} className="block max-w-64 truncate font-medium hover:text-primary">
                        {course.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">{course.instructor}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden xl:table-cell">{categoryName.get(course.categoryId) ?? '—'}</TableCell>
                <TableCell>
                  {formatPrice(effectivePrice(course))}
                  {course.salePrice != null && course.salePrice < course.price && (
                    <span className="ml-1.5 text-xs text-muted-foreground line-through">{formatPrice(course.price)}</span>
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <StatusBadge published={course.published} />
                </TableCell>
                <TableCell className="pr-5 text-right">
                  <Link href={`/admin/courses/${course.id}`} className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                    Edit
                  </Link>
                  <ConfirmDelete
                    label={`"${course.title}"`}
                    onConfirm={() => {
                      deleteCourse(course.id)
                      toast.success('Course deleted')
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
            {courses.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                  No courses yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
