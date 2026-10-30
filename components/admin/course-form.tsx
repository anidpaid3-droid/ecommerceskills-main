'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { saveCourse, slugify, uid, useHydrated, useStore } from '@/lib/store'
import type { Course, Level } from '@/lib/types'
import { AdminPageHeader, ImageUpload } from './admin-ui'

const LEVELS: Level[] = ['Beginner', 'Intermediate', 'Advanced']
const selectClass = 'h-10 rounded-lg border border-input bg-transparent px-3 text-sm'

function emptyCourse(categoryId: string): Course {
  return {
    id: '',
    slug: '',
    title: '',
    subtitle: '',
    description: '',
    price: 49,
    categoryId,
    image: '',
    instructor: '',
    level: 'Beginner',
    duration: '',
    lessons: 0,
    rating: 5,
    students: 0,
    outcomes: [],
    curriculum: [],
    featured: false,
    published: true,
    createdAt: new Date().toISOString(),
  }
}

export function CourseForm({ id }: { id?: string }) {
  const { courses, categories } = useStore()
  const hydrated = useHydrated()
  const existing = id ? courses.find((c) => c.id === id) : undefined

  if (!hydrated) return <div className="min-h-[60vh]" />
  if (id && !existing) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">Course not found.</p>
        <Link href="/admin/courses" className="mt-4 inline-block text-primary hover:underline">
          Back to courses
        </Link>
      </div>
    )
  }

  return <CourseFormInner key={id ?? 'new'} initial={existing ?? emptyCourse(categories[0]?.id ?? '')} />
}

function CourseFormInner({ initial }: { initial: Course }) {
  const router = useRouter()
  const { categories, courses } = useStore()
  const isNew = !initial.id
  const [course, setCourse] = useState<Course>(initial)
  const [outcomes, setOutcomes] = useState(initial.outcomes.join('\n'))
  const [curriculum, setCurriculum] = useState(initial.curriculum.join('\n'))
  const [onSale, setOnSale] = useState(initial.salePrice != null)

  function update<K extends keyof Course>(key: K, value: Course[K]) {
    setCourse((c) => ({ ...c, [key]: value }))
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const slug = slugify(course.slug || course.title)
    if (!slug) return toast.error('Please add a title')
    if (courses.some((c) => c.slug === slug && c.id !== course.id)) {
      return toast.error('Another course already uses this URL slug')
    }
    if (!course.categoryId) return toast.error('Create a category first')
    if (onSale && (course.salePrice == null || course.salePrice >= course.price)) {
      return toast.error('Sale price must be lower than the regular price')
    }
    const lines = (v: string) => v.split('\n').map((l) => l.trim()).filter(Boolean)
    try {
      saveCourse({
        ...course,
        id: course.id || uid('course'),
        slug,
        salePrice: onSale ? course.salePrice : undefined,
        outcomes: lines(outcomes),
        curriculum: lines(curriculum),
      })
      toast.success(isNew ? 'Course uploaded' : 'Course updated')
      router.push('/admin/courses')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save course')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Link href="/admin/courses" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Courses
      </Link>
      <AdminPageHeader
        title={isNew ? 'Upload course' : 'Edit course'}
        actions={
          <>
            {!isNew && course.published && (
              <Link href={`/courses/${initial.slug}`} target="_blank" className={buttonVariants({ variant: 'outline' })}>
                View live
              </Link>
            )}
            <Button type="submit">{isNew ? 'Publish course' : 'Save changes'}</Button>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6">
            <h2 className="font-medium">Details</h2>
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" required value={course.title} onChange={(e) => update('title', e.target.value)} className="h-10" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="slug">URL slug</Label>
              <Input
                id="slug"
                value={course.slug}
                placeholder={slugify(course.title) || 'auto-generated-from-title'}
                onChange={(e) => update('slug', e.target.value)}
                className="h-10"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input id="subtitle" value={course.subtitle} onChange={(e) => update('subtitle', e.target.value)} className="h-10" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={6}
                value={course.description}
                onChange={(e) => update('description', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Separate paragraphs with a blank line.</p>
            </div>
          </section>

          <section className="grid gap-5 rounded-xl border border-border bg-card p-6 md:grid-cols-2">
            <h2 className="font-medium md:col-span-2">Content</h2>
            <div className="flex flex-col gap-2">
              <Label htmlFor="outcomes">{"What you'll learn"}</Label>
              <Textarea id="outcomes" rows={7} value={outcomes} onChange={(e) => setOutcomes(e.target.value)} placeholder="One outcome per line" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="curriculum">Curriculum modules</Label>
              <Textarea id="curriculum" rows={7} value={curriculum} onChange={(e) => setCurriculum(e.target.value)} placeholder="One module per line" />
            </div>
          </section>

          <section className="grid gap-5 rounded-xl border border-border bg-card p-6 sm:grid-cols-2 lg:grid-cols-3">
            <h2 className="font-medium sm:col-span-2 lg:col-span-3">Course info</h2>
            <div className="flex flex-col gap-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Input id="instructor" required value={course.instructor} onChange={(e) => update('instructor', e.target.value)} className="h-10" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="level">Level</Label>
              <select id="level" value={course.level} onChange={(e) => update('level', e.target.value as Level)} className={selectClass}>
                {LEVELS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" placeholder="e.g. 12h 30m" value={course.duration} onChange={(e) => update('duration', e.target.value)} className="h-10" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="lessons">Lessons</Label>
              <Input id="lessons" type="number" min={0} value={course.lessons} onChange={(e) => update('lessons', Number(e.target.value))} className="h-10" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="rating">Rating</Label>
              <Input id="rating" type="number" min={0} max={5} step={0.1} value={course.rating} onChange={(e) => update('rating', Number(e.target.value))} className="h-10" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="students">Students</Label>
              <Input id="students" type="number" min={0} value={course.students} onChange={(e) => update('students', Number(e.target.value))} className="h-10" />
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
            <h2 className="font-medium">Visibility</h2>
            <label className="flex items-center justify-between gap-4 text-sm">
              Published
              <Switch checked={course.published} onCheckedChange={(v) => update('published', v)} />
            </label>
            <label className="flex items-center justify-between gap-4 text-sm">
              Featured on homepage
              <Switch checked={course.featured} onCheckedChange={(v) => update('featured', v)} />
            </label>
            <div className="flex flex-col gap-2">
              <Label htmlFor="category">Category</Label>
              <select id="category" required value={course.categoryId} onChange={(e) => update('categoryId', e.target.value)} className={selectClass}>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
            <h2 className="font-medium">Pricing</h2>
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">Regular price (USD)</Label>
              <Input id="price" type="number" min={0} step={0.01} required value={course.price} onChange={(e) => update('price', Number(e.target.value))} className="h-10" />
            </div>
            <label className="flex items-center justify-between gap-4 text-sm">
              Put on sale
              <Switch
                checked={onSale}
                onCheckedChange={(v) => {
                  setOnSale(v)
                  if (v && course.salePrice == null) update('salePrice', Math.round(course.price * 0.7))
                }}
              />
            </label>
            {onSale && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="salePrice">Sale price (USD)</Label>
                <Input
                  id="salePrice"
                  type="number"
                  min={0}
                  step={0.01}
                  value={course.salePrice ?? ''}
                  onChange={(e) => update('salePrice', Number(e.target.value))}
                  className="h-10"
                />
              </div>
            )}
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <ImageUpload value={course.image} onChange={(v) => update('image', v)} />
          </section>
        </div>
      </div>
    </form>
  )
}
