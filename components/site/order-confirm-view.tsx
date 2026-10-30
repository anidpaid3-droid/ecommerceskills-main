'use client'

import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate, formatPrice, useHydrated, useStore } from '@/lib/store'
import { NotFoundState } from './page-header'

export function OrderConfirmView({ id }: { id: string }) {
  const { orders, courses } = useStore()
  const hydrated = useHydrated()
  const order = orders.find((o) => o.id === id)

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    )
  }
  if (!order) return <NotFoundState title="Order not found" href="/courses" linkLabel="Browse courses" />

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:py-20">
      <div className="flex flex-col items-center text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-accent">
          <CheckCircle2 className="size-7 text-primary" aria-hidden="true" />
        </span>
        <h1 className="mt-6 font-serif text-4xl font-semibold tracking-tight text-balance">
          {`Thank you, ${order.name.split(' ')[0]}!`}
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          Your order is confirmed. A receipt has been sent to{' '}
          <span className="font-medium text-foreground">{order.email}</span>.
        </p>
      </div>

      <section aria-labelledby="order-heading" className="mt-10 rounded-xl border border-border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border p-5">
          <h2 id="order-heading" className="font-medium">
            {`Order ${order.id}`}
          </h2>
          <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
        </div>
        <ul className="divide-y divide-border">
          {order.items.map((item) => {
            const course = courses.find((c) => c.id === item.courseId)
            return (
              <li key={item.courseId} className="flex items-center gap-4 p-5">
                <div className="aspect-[16/10] w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={course?.image || '/placeholder.svg'} alt="" className="size-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  {course && (
                    <Link href={`/courses/${course.slug}`} className="text-sm text-primary hover:underline">
                      Start learning
                    </Link>
                  )}
                </div>
                <p className="text-sm">{formatPrice(item.price)}</p>
              </li>
            )
          })}
        </ul>
        <dl className="flex flex-col gap-2 border-t border-border p-5 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd>{formatPrice(order.subtotal)}</dd>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between">
              <dt className="text-muted-foreground">{`Discount (${order.coupon})`}</dt>
              <dd className="text-primary">{`-${formatPrice(order.discount)}`}</dd>
            </div>
          )}
          <div className="flex justify-between pt-2 text-base font-semibold">
            <dt>Total paid</dt>
            <dd>{formatPrice(order.total)}</dd>
          </div>
        </dl>
      </section>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/courses" className={buttonVariants({ size: 'lg', className: 'h-11 px-5' })}>
          Browse more courses
        </Link>
        <Link href="/" className={buttonVariants({ size: 'lg', variant: 'outline', className: 'h-11 px-5' })}>
          Back home
        </Link>
      </div>
    </div>
  )
}
