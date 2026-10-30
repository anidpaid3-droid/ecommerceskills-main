'use client'

import Link from 'next/link'
import { ArrowRight, Award, Infinity as InfinityIcon, PlayCircle } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useStore } from '@/lib/store'
import { CourseCard } from './course-card'
import { PostCard } from './post-card'

const PERKS = [
  { icon: PlayCircle, title: 'Learn by building', body: 'Every course is project-based so you finish with real work to show.' },
  { icon: InfinityIcon, title: 'Lifetime access', body: 'Buy once and revisit lessons and updates whenever you need them.' },
  { icon: Award, title: 'Certificate included', body: 'Earn a shareable certificate when you complete a course.' },
]

export function HomeView() {
  const { courses, categories, posts } = useStore()
  const published = courses.filter((c) => c.published)
  const featured = (published.filter((c) => c.featured).length ? published.filter((c) => c.featured) : published).slice(0, 3)
  const latestPosts = posts.filter((p) => p.published).slice(0, 3)
  const categoryById = new Map(categories.map((c) => [c.id, c]))

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:px-6 md:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-highlight" aria-hidden="true" />
            {`${published.length} courses · new ones every month`}
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] font-semibold tracking-tight text-balance md:text-6xl">
            Learn the skills that move your career forward.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Practical online courses in development, design, marketing and more, taught by practitioners who do the work
            every day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/courses" className={buttonVariants({ size: 'lg', className: 'h-11 px-5' })}>
              Browse courses
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/about" className={buttonVariants({ size: 'lg', variant: 'outline', className: 'h-11 px-5' })}>
              How it works
            </Link>
          </div>
          <dl className="mt-10 flex gap-8">
            {[
              ['48k+', 'learners'],
              ['4.8', 'average rating'],
              ['30+', 'instructors'],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-serif text-2xl font-semibold">{value}</dd>
                <dd className="text-sm text-muted-foreground">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted md:aspect-[4/4.5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero.png" alt="A student learning online at a sunlit desk" className="size-full object-cover" />
          </div>
          <div className="absolute -bottom-5 left-4 rounded-xl border border-border bg-card p-4 shadow-lg shadow-foreground/5 md:-left-6">
            <p className="text-xs text-muted-foreground">This week</p>
            <p className="font-serif text-lg font-semibold">1,240 lessons completed</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="categories-heading" className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 id="categories-heading" className="font-serif text-3xl font-semibold tracking-tight">
            Explore by category
          </h2>
          <Link href="/categories" className="text-sm font-medium text-primary hover:underline">
            All categories
          </Link>
        </div>
        <ul className="mt-6 flex flex-wrap gap-3">
          {categories.map((cat) => {
            const count = published.filter((c) => c.categoryId === cat.id).length
            return (
              <li key={cat.id}>
                <Link
                  href={`/categories/${cat.slug}`}
                  className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:bg-accent"
                >
                  {cat.name}
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{count}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <section aria-labelledby="featured-heading" className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="featured-heading" className="font-serif text-3xl font-semibold tracking-tight">
              Featured courses
            </h2>
            <p className="mt-2 text-muted-foreground">Hand-picked by our team this season.</p>
          </div>
          <Link href="/courses" className="hidden text-sm font-medium text-primary hover:underline sm:inline">
            View all
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => (
            <CourseCard key={course.id} course={course} category={categoryById.get(course.categoryId)} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="grid gap-6 rounded-2xl bg-primary p-8 text-primary-foreground md:grid-cols-3 md:p-12">
          {PERKS.map((perk) => (
            <div key={perk.title} className="flex flex-col gap-3">
              <perk.icon className="size-6 text-highlight" aria-hidden="true" />
              <h3 className="font-serif text-xl font-semibold">{perk.title}</h3>
              <p className="text-sm leading-relaxed text-primary-foreground/75">{perk.body}</p>
            </div>
          ))}
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section aria-labelledby="blog-heading" className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <div className="flex items-end justify-between gap-4">
            <h2 id="blog-heading" className="font-serif text-3xl font-semibold tracking-tight">
              From the blog
            </h2>
            <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
              Read more
            </Link>
          </div>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
