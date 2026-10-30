'use client'

import Link from 'next/link'
import { useState } from 'react'
import { formatDate, useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { PageHeader } from './page-header'
import { PostCard } from './post-card'

export function BlogListView() {
  const { posts } = useStore()
  const published = posts.filter((p) => p.published).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  const tags = ['All', ...Array.from(new Set(published.map((p) => p.tag)))]
  const [tag, setTag] = useState('All')
  const filtered = tag === 'All' ? published : published.filter((p) => p.tag === tag)
  const [lead, ...rest] = filtered

  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="Ideas for lifelong learners"
        description="Study tips, career advice and behind-the-scenes notes from our instructors."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={tag === t}
              onClick={() => setTag(t)}
              className={cn(
                'rounded-full border border-border bg-card px-3.5 py-1.5 text-sm transition-colors hover:border-primary',
                tag === t && 'border-primary bg-primary text-primary-foreground',
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {lead ? (
          <>
            <article className="group mt-10 grid items-center gap-8 md:grid-cols-2">
              <Link href={`/blog/${lead.slug}`} className="block aspect-[3/2] overflow-hidden rounded-2xl bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={lead.image || '/placeholder.svg'} alt="" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </Link>
              <div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-primary">{lead.tag}</span>
                  {` · ${formatDate(lead.createdAt)} · ${lead.readTime}`}
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight font-semibold text-balance md:text-4xl">
                  <Link href={`/blog/${lead.slug}`} className="hover:text-primary">
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{lead.excerpt}</p>
                <p className="mt-5 text-sm">{`By ${lead.author}`}</p>
              </div>
            </article>
            {rest.length > 0 && (
              <div className="mt-16 grid gap-10 border-t border-border pt-12 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="mt-10 rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
            No posts yet.
          </p>
        )}
      </div>
    </>
  )
}
