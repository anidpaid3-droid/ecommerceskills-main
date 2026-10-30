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
import { savePost, slugify, uid, useHydrated, useStore } from '@/lib/store'
import type { Post } from '@/lib/types'
import { AdminPageHeader, ImageUpload } from './admin-ui'

function emptyPost(): Post {
  return {
    id: '',
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: '',
    tag: 'Learning',
    readTime: '',
    published: true,
    createdAt: new Date().toISOString(),
  }
}

export function PostForm({ id }: { id?: string }) {
  const { posts } = useStore()
  const hydrated = useHydrated()
  const existing = id ? posts.find((p) => p.id === id) : undefined

  if (!hydrated) return <div className="min-h-[60vh]" />
  if (id && !existing) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">Post not found.</p>
        <Link href="/admin/posts" className="mt-4 inline-block text-primary hover:underline">
          Back to posts
        </Link>
      </div>
    )
  }
  return <PostFormInner key={id ?? 'new'} initial={existing ?? emptyPost()} />
}

function PostFormInner({ initial }: { initial: Post }) {
  const router = useRouter()
  const { posts } = useStore()
  const isNew = !initial.id
  const [post, setPost] = useState<Post>(initial)

  function update<K extends keyof Post>(key: K, value: Post[K]) {
    setPost((p) => ({ ...p, [key]: value }))
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const slug = slugify(post.slug || post.title)
    if (!slug) return toast.error('Please add a title')
    if (posts.some((p) => p.slug === slug && p.id !== post.id)) {
      return toast.error('Another post already uses this slug')
    }
    const words = post.content.trim().split(/\s+/).filter(Boolean).length
    try {
      savePost({
        ...post,
        id: post.id || uid('post'),
        slug,
        readTime: post.readTime.trim() || `${Math.max(1, Math.round(words / 200))} min read`,
      })
      toast.success(isNew ? 'Post published' : 'Post updated')
      router.push('/admin/posts')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save post')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Link href="/admin/posts" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Blog posts
      </Link>
      <AdminPageHeader
        title={isNew ? 'New post' : 'Edit post'}
        actions={
          <>
            {!isNew && initial.published && (
              <Link href={`/blog/${initial.slug}`} target="_blank" className={buttonVariants({ variant: 'outline' })}>
                View live
              </Link>
            )}
            <Button type="submit">{isNew ? 'Publish post' : 'Save changes'}</Button>
          </>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="p-title">Title</Label>
            <Input id="p-title" required value={post.title} onChange={(e) => update('title', e.target.value)} className="h-10" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="p-slug">URL slug</Label>
            <Input
              id="p-slug"
              value={post.slug}
              placeholder={slugify(post.title) || 'auto-generated-from-title'}
              onChange={(e) => update('slug', e.target.value)}
              className="h-10"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="p-excerpt">Excerpt</Label>
            <Textarea id="p-excerpt" rows={2} required value={post.excerpt} onChange={(e) => update('excerpt', e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="p-content">Content</Label>
            <Textarea id="p-content" rows={16} required value={post.content} onChange={(e) => update('content', e.target.value)} />
            <p className="text-xs text-muted-foreground">Separate paragraphs with a blank line.</p>
          </div>
        </section>
        <div className="flex flex-col gap-6">
          <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
            <label className="flex items-center justify-between gap-4 text-sm font-medium">
              Published
              <Switch checked={post.published} onCheckedChange={(v) => update('published', v)} />
            </label>
            <div className="flex flex-col gap-2">
              <Label htmlFor="p-author">Author</Label>
              <Input id="p-author" required value={post.author} onChange={(e) => update('author', e.target.value)} className="h-10" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="p-tag">Tag</Label>
              <Input id="p-tag" required value={post.tag} onChange={(e) => update('tag', e.target.value)} className="h-10" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="p-read">Read time</Label>
              <Input id="p-read" placeholder="Auto-calculated" value={post.readTime} onChange={(e) => update('readTime', e.target.value)} className="h-10" />
            </div>
          </section>
          <section className="rounded-xl border border-border bg-card p-6">
            <ImageUpload value={post.image} onChange={(v) => update('image', v)} />
          </section>
        </div>
      </div>
    </form>
  )
}
