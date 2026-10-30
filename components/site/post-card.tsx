import Link from 'next/link'
import type { Post } from '@/lib/types'
import { formatDate } from '@/lib/store'

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group flex flex-col gap-4">
      <Link href={`/blog/${post.slug}`} className="block aspect-[3/2] overflow-hidden rounded-xl bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element -- admin uploads may be data URLs */}
        <img
          src={post.image || '/placeholder.svg'}
          alt=""
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="rounded-full bg-accent px-2.5 py-1 font-medium text-accent-foreground">{post.tag}</span>
        <span>{formatDate(post.createdAt)}</span>
        <span aria-hidden="true">·</span>
        <span>{post.readTime}</span>
      </div>
      <h3 className="font-serif text-xl leading-snug font-semibold text-balance">
        <Link href={`/blog/${post.slug}`} className="hover:text-primary">
          {post.title}
        </Link>
      </h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
    </article>
  )
}
