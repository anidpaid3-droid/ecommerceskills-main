'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BarChart3, Check, ChevronRight, Clock, PlayCircle, Star, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { addToCart, effectivePrice, formatPrice, useHydrated, useStore } from '@/lib/store'
import { AddToCartButton } from './add-to-cart-button'
import { CourseCard } from './course-card'
import { NotFoundState } from './page-header'

export function CourseDetailView({ slug }: { slug: string }) {
  const router = useRouter()
  const { courses, categories } = useStore()
  const hydrated = useHydrated()
  const course = courses.find((c) => c.slug === slug && c.published)

  if (!course) {
    if (!hydrated) return <div className="min-h-[60vh]" />
    return <NotFoundState title="Course not found" href="/courses" linkLabel="Browse all courses" />
  }

  const category = categories.find((c) => c.id === course.categoryId)
  const price = effectivePrice(course)
  const onSale = price < course.price
  const related = courses
    .filter((c) => c.published && c.id !== course.id && c.categoryId === course.categoryId)
    .concat(courses.filter((c) => c.published && c.id !== course.id && c.categoryId !== course.categoryId))
    .slice(0, 3)

  return (
    <>
      <section className="bg-sidebar text-sidebar-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:px-6 lg:grid-cols-[1fr_380px] lg:py-16">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-sidebar-foreground/70">
              <Link href="/courses" className="hover:text-sidebar-foreground">
                Courses
              </Link>
              {category && (
                <>
                  <ChevronRight className="size-3.5" aria-hidden="true" />
                  <Link href={`/categories/${category.slug}`} className="hover:text-sidebar-foreground">
                    {category.name}
                  </Link>
                </>
              )}
            </nav>
            <h1 className="mt-5 font-serif text-4xl leading-tight font-semibold tracking-tight text-balance md:text-5xl">
              {course.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-sidebar-foreground/80">{course.subtitle}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-sidebar-foreground/80">
              <li className="flex items-center gap-1.5">
                <Star className="size-4 fill-highlight text-highlight" aria-hidden="true" />
                <span className="font-medium text-sidebar-foreground">{course.rating.toFixed(1)}</span> rating
              </li>
              <li className="flex items-center gap-1.5">
                <Users className="size-4" aria-hidden="true" />
                {`${course.students.toLocaleString('en-US')} students`}
              </li>
              <li className="flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden="true" />
                {course.duration}
              </li>
              <li className="flex items-center gap-1.5">
                <BarChart3 className="size-4" aria-hidden="true" />
                {course.level}
              </li>
            </ul>
            <p className="mt-6 text-sm text-sidebar-foreground/70">
              Taught by <span className="font-medium text-sidebar-foreground">{course.instructor}</span>
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:px-6 lg:grid-cols-[1fr_380px]">
        <div className="order-2 flex flex-col gap-12 py-12 lg:order-1">
          <section aria-labelledby="learn-heading" className="rounded-xl border border-border bg-card p-6 md:p-8">
            <h2 id="learn-heading" className="font-serif text-2xl font-semibold">
              {"What you'll learn"}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {course.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {o}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="about-heading">
            <h2 id="about-heading" className="font-serif text-2xl font-semibold">
              About this course
            </h2>
            <div className="mt-4 flex flex-col gap-4 leading-relaxed text-muted-foreground">
              {course.description.split(/\n{2,}/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="curriculum-heading">
            <h2 id="curriculum-heading" className="font-serif text-2xl font-semibold">
              Curriculum
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {`${course.curriculum.length} modules · ${course.lessons} lessons · ${course.duration} total`}
            </p>
            <ol className="mt-5 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
              {course.curriculum.map((mod, i) => (
                <li key={`${mod}-${i}`} className="flex items-center gap-4 px-5 py-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-foreground">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium">{mod}</span>
                  <PlayCircle className="size-4 text-muted-foreground" aria-hidden="true" />
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="order-1 lg:order-2">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl shadow-foreground/5 lg:sticky lg:top-24 lg:-mt-72">
            <div className="aspect-[16/10] bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={course.image || '/placeholder.svg'} alt={`${course.title} course cover`} className="size-full object-cover" />
            </div>
            <div className="flex flex-col gap-4 p-6">
              <p className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-semibold">{formatPrice(price)}</span>
                {onSale && (
                  <>
                    <span className="text-muted-foreground line-through">{formatPrice(course.price)}</span>
                    <span className="rounded-full bg-highlight px-2 py-0.5 text-xs font-semibold text-highlight-foreground">
                      {`${Math.round((1 - price / course.price) * 100)}% off`}
                    </span>
                  </>
                )}
              </p>
              <AddToCartButton courseId={course.id} size="lg" className="h-11 w-full" />
              <Button
                variant="outline"
                size="lg"
                className="h-11 w-full"
                onClick={() => {
                  addToCart(course.id)
                  router.push('/checkout')
                }}
              >
                Buy now
              </Button>
              <ul className="flex flex-col gap-2.5 border-t border-border pt-4 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <Check className="size-4 text-primary" aria-hidden="true" />
                  Lifetime access
                </li>
                <li className="flex gap-2">
                  <Check className="size-4 text-primary" aria-hidden="true" />
                  Certificate of completion
                </li>
                <li className="flex gap-2">
                  <Check className="size-4 text-primary" aria-hidden="true" />
                  30-day money-back guarantee
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 id="related-heading" className="font-serif text-2xl font-semibold">
            You might also like
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CourseCard key={c.id} course={c} category={categories.find((cat) => cat.id === c.categoryId)} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
