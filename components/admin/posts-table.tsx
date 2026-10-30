'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { buttonVariants } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deletePost, formatDate, useStore } from '@/lib/store'
import { AdminPageHeader, ConfirmDelete, StatusBadge } from './admin-ui'

export function PostsTable() {
  const { posts } = useStore()

  return (
    <>
      <AdminPageHeader
        title="Blog posts"
        description="Write, edit and publish articles."
        actions={
          <Link href="/admin/posts/new" className={buttonVariants()}>
            <Plus aria-hidden="true" />
            New post
          </Link>
        }
      />
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-5">Post</TableHead>
              <TableHead className="hidden md:table-cell">Tag</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="pr-5 text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="pl-5">
                  <div className="flex items-center gap-3">
                    <div className="aspect-[16/10] w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                      {post.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.image || '/placeholder.svg'} alt="" className="size-full object-cover" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <Link href={`/admin/posts/${post.id}`} className="block max-w-72 truncate font-medium hover:text-primary">
                        {post.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">{post.author}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{post.tag}</TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(post.createdAt)}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <StatusBadge published={post.published} />
                </TableCell>
                <TableCell className="pr-5 text-right">
                  <Link href={`/admin/posts/${post.id}`} className={buttonVariants({ variant: 'ghost', size: 'sm' })}>
                    Edit
                  </Link>
                  <ConfirmDelete
                    label={`"${post.title}"`}
                    onConfirm={() => {
                      deletePost(post.id)
                      toast.success('Post deleted')
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
            {posts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                  No posts yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
