'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'
import type { Category, Course } from '@/lib/types'
import { effectivePrice, formatPrice } from '@/lib/store'
import { AddToCartButton } from './add-to-cart-button'

export function CourseCard({ course, category }: { course: Course; category?: Category }) {
  const price = effectivePrice(course)
  const onSale = price < course.price

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg hover:shadow-foreground/5">
      <Link href={`/courses/${course.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element -- admin uploads may be data URLs */}
        <img
          src={course.image || '/placeholder.svg'}
          alt=""
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {onSale && (
          <span className="absolute top-3 left-3 rounded-full bg-highlight px-2.5 py-1 text-xs font-semibold text-highlight-foreground">
            Sale
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          {category ? (
            <Link href={`/categories/${category.slug}`} className="font-medium text-primary hover:underline">
              {category.name}
            </Link>
          ) : (
            <span />
          )}
          <span>{course.level}</span>
        </div>
        <h3 className="font-serif text-lg leading-snug font-semibold text-balance">
          <Link href={`/courses/${course.slug}`} className="hover:text-primary">
            {course.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{course.subtitle}</p>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="size-3.5 fill-highlight text-highlight" aria-hidden="true" />
          <span className="font-medium text-foreground">{course.rating.toFixed(1)}</span>
          <span>{`(${course.students.toLocaleString('en-US')} students)`}</span>
          <span aria-hidden="true">·</span>
          <span>{course.duration}</span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <p className="flex items-baseline gap-2">
            <span className="text-lg font-semibold">{formatPrice(price)}</span>
            {onSale && <span className="text-sm text-muted-foreground line-through">{formatPrice(course.price)}</span>}
          </p>
          <AddToCartButton courseId={course.id} size="sm" />
        </div>
      </div>
    </article>
  )
}
