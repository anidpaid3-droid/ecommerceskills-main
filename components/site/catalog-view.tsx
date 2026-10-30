'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { effectivePrice, useHydrated, useStore } from '@/lib/store'
import type { Level } from '@/lib/types'
import { cn } from '@/lib/utils'
import { CourseCard } from './course-card'
import { NotFoundState, PageHeader } from './page-header'

const LEVELS: (Level | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced']
const SORTS = [
  { value: 'popular', label: 'Most popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Highest rated' },
] as const

export function CatalogView({ categorySlug }: { categorySlug?: string }) {
  const { courses, categories } = useStore()
  const hydrated = useHydrated()
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState<(typeof LEVELS)[number]>('All')
  const [sort, setSort] = useState<(typeof SORTS)[number]['value']>('popular')

  const category = categorySlug ? categories.find((c) => c.slug === categorySlug) : undefined
  const categoryById = useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = courses.filter(
      (c) =>
        c.published &&
        (!category || c.categoryId === category.id) &&
        (level === 'All' || c.level === level) &&
        (!q || `${c.title} ${c.subtitle} ${c.instructor}`.toLowerCase().includes(q)),
    )
    return [...list].sort((a, b) => {
      switch (sort) {
        case 'newest':
          return b.createdAt.localeCompare(a.createdAt)
        case 'price-asc':
          return effectivePrice(a) - effectivePrice(b)
        case 'price-desc':
          return effectivePrice(b) - effectivePrice(a)
        case 'rating':
          return b.rating - a.rating
        default:
          return b.students - a.students
      }
    })
  }, [courses, category, level, query, sort])

  if (categorySlug && !category) {
    if (!hydrated) return <div className="min-h-[60vh]" />
    return <NotFoundState title="Category not found" href="/categories" linkLabel="Browse all categories" />
  }

  return (
    <>
      <PageHeader
        eyebrow={category ? 'Category' : 'Catalog'}
        title={category ? category.name : 'All courses'}
        description={category ? category.description : 'Browse every course on Skillhouse. Filter by level or search by topic.'}
      >
        <nav aria-label="Categories" className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/courses"
            className={cn(
              'rounded-full border border-border bg-card px-3.5 py-1.5 text-sm transition-colors hover:border-primary',
              !category && 'border-primary bg-primary text-primary-foreground',
            )}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className={cn(
                'rounded-full border border-border bg-card px-3.5 py-1.5 text-sm transition-colors hover:border-primary',
                category?.id === cat.id && 'border-primary bg-primary text-primary-foreground',
              )}
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </PageHeader>

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses"
              aria-label="Search courses"
              className="h-10 bg-card pl-9"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div role="group" aria-label="Filter by level" className="flex rounded-lg border border-border bg-card p-1">
              {LEVELS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLevel(l)}
                  aria-pressed={level === l}
                  className={cn(
                    'rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors',
                    level === l && 'bg-accent font-medium text-accent-foreground',
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
            <label className="sr-only" htmlFor="sort">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="h-10 rounded-lg border border-input bg-card px-3 text-sm"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
          {`${results.length} ${results.length === 1 ? 'course' : 'courses'}`}
        </p>

        {results.length > 0 ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((course) => (
              <CourseCard key={course.id} course={course} category={categoryById.get(course.categoryId)} />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
            No courses match your filters.
          </div>
        )}
      </div>
    </>
  )
}
