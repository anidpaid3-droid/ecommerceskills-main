'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { formatDate, formatPrice, useStore } from '@/lib/store'
import { AdminPageHeader } from './admin-ui'

export function AdminDashboard() {
  const { courses, posts, orders, messages, categories } = useStore()
  const paid = orders.filter((o) => o.status === 'paid')
  const revenue = paid.reduce((sum, o) => sum + o.total, 0)
  const sold = paid.reduce((sum, o) => sum + o.items.length, 0)

  const stats = [
    { label: 'Revenue', value: formatPrice(revenue) },
    { label: 'Orders', value: String(orders.length) },
    { label: 'Courses sold', value: String(sold) },
    { label: 'Published courses', value: `${courses.filter((c) => c.published).length} / ${courses.length}` },
  ]

  const salesByCourse = new Map<string, number>()
  paid.forEach((o) => o.items.forEach((i) => salesByCourse.set(i.title, (salesByCourse.get(i.title) ?? 0) + i.price)))
  const top = [...salesByCourse.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)
  const max = top[0]?.[1] ?? 1

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="An overview of your store."
        actions={
          <>
            <Link href="/admin/posts/new" className={buttonVariants({ variant: 'outline' })}>
              New post
            </Link>
            <Link href="/admin/courses/new" className={buttonVariants()}>
              <Plus aria-hidden="true" />
              New course
            </Link>
          </>
        }
      />
      <dl className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5">
            <dt className="text-sm text-muted-foreground">{s.label}</dt>
            <dd className="mt-2 font-serif text-3xl font-semibold">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="font-medium">Recent orders</h2>
            <Link href="/admin/orders" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          {orders.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">
              No orders yet. Place one from the storefront to see it here.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {orders.slice(0, 6).map((o) => (
                <li key={o.id} className="flex items-center justify-between gap-4 px-5 py-3 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{o.name}</p>
                    <p className="text-muted-foreground">{`${o.id} · ${formatDate(o.createdAt)}`}</p>
                  </div>
                  <p className="font-medium">{formatPrice(o.total)}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-medium">Top-selling courses</h2>
          {top.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">Sales data will appear after the first order.</p>
          ) : (
            <ul className="mt-5 flex flex-col gap-4">
              {top.map(([title, total]) => (
                <li key={title} className="flex flex-col gap-1.5 text-sm">
                  <div className="flex justify-between gap-3">
                    <span className="truncate">{title}</span>
                    <span className="font-medium">{formatPrice(total)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${(total / max) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
          <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5 text-sm">
            <div>
              <dt className="text-muted-foreground">Categories</dt>
              <dd className="font-medium">{categories.length}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Posts</dt>
              <dd className="font-medium">{posts.length}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Messages</dt>
              <dd className="font-medium">{messages.length}</dd>
            </div>
          </dl>
        </section>
      </div>
    </>
  )
}
