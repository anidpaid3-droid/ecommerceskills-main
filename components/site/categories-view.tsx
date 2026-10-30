'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useStore } from '@/lib/store'
import { PageHeader } from './page-header'

export function CategoriesView() {
  const { categories, courses } = useStore()

  return (
    <>
      <PageHeader
        eyebrow="Categories"
        title="Find your next skill"
        description="Courses are organized into focused tracks so you can go deep on what matters to you."
      />
      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3 md:px-6">
        {categories.map((cat) => {
          const items = courses.filter((c) => c.published && c.categoryId === cat.id)
          const cover = items[0]?.image
          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg hover:shadow-foreground/5"
            >
              <div className="aspect-[16/9] overflow-hidden bg-accent">
                {cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cover} alt="" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl font-semibold">{cat.name}</h2>
                  <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary" aria-hidden="true" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
                <p className="mt-auto pt-2 text-xs font-medium text-primary">
                  {`${items.length} ${items.length === 1 ? 'course' : 'courses'}`}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
