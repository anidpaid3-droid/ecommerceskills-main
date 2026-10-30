'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { formatDate, useHydrated, useStore } from '@/lib/store'
import { NotFoundState } from './page-header'
import { PostCard } from './post-card'

export function BlogPostView({ slug }: { slug: string }) {
  const { posts } = useStore()
  const hydrated = useHydrated()
  const post = posts.find((p) => p.slug === slug && p.published)

  if (!post) {
    if (!hydrated) return <div className="min-h-[60vh]" />
    return <NotFoundState title="Post not found" href="/blog" linkLabel="Back to the blog" />
  }

  const more = posts.filter((p) => p.published && p.id !== post.id).slice(0, 2)

  return (
    <article>
      <header className="mx-auto max-w-3xl px-4 pt-12 md:px-6 md:pt-16">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden="true" />
          All posts
        </Link>
        <p className="mt-8 text-sm text-muted-foreground">
          <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">{post.tag}</span>
          <span className="ml-3">{`${formatDate(post.createdAt)} · ${post.readTime}`}</span>
        </p>
        <h1 className="mt-5 font-serif text-4xl leading-tight font-semibold tracking-tight text-balance md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <p className="mt-6 flex items-center gap-3 text-sm">
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground"
          >
            {post.author.charAt(0)}
          </span>
          <span>
            <span className="block font-medium">{post.author}</span>
            <span className="text-muted-foreground">Skillhouse instructor</span>
          </span>
        </p>
      </header>
      <div className="mx-auto mt-10 max-w-5xl px-4 md:px-6">
        <div className="aspect-[2/1] overflow-hidden rounded-2xl bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.image || '/placeholder.svg'} alt="" className="size-full object-cover" />
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-6 px-4 text-lg leading-relaxed md:px-6">
        {post.content.split(/\n{2,}/).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <aside className="mx-auto mt-16 max-w-2xl px-4 md:px-6">
        <div className="flex flex-col items-start gap-4 rounded-2xl bg-primary p-8 text-primary-foreground">
          <h2 className="font-serif text-2xl font-semibold">Ready to put this into practice?</h2>
          <p className="text-primary-foreground/80">Pick a course and start learning today with lifetime access.</p>
          <Link href="/courses" className={buttonVariants({ variant: 'secondary', size: 'lg', className: 'h-11 px-5' })}>
            Browse courses
          </Link>
        </div>
      </aside>

      {more.length > 0 && (
        <section aria-labelledby="more-heading" className="mx-auto mt-16 max-w-5xl px-4 md:px-6">
          <h2 id="more-heading" className="font-serif text-2xl font-semibold">
            Keep reading
          </h2>
          <div className="mt-6 grid gap-10 md:grid-cols-2">
            {more.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
