'use client'

import Link from 'next/link'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { effectivePrice, formatPrice, removeFromCart, useHydrated, useStore } from '@/lib/store'
import type { Course } from '@/lib/types'

export function useCartCourses() {
  const { cart, courses } = useStore()
  const items = cart
    .map((id) => courses.find((c) => c.id === id && c.published))
    .filter((c): c is Course => Boolean(c))
  const subtotal = items.reduce((sum, c) => sum + effectivePrice(c), 0)
  const savings = items.reduce((sum, c) => sum + (c.price - effectivePrice(c)), 0)
  return { items, subtotal, savings }
}

export function CartView() {
  const hydrated = useHydrated()
  const { items, subtotal, savings } = useCartCourses()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">Your cart</h1>
      {!hydrated ? (
        <Skeleton className="mt-8 h-40 w-full rounded-xl" />
      ) : items.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <ShoppingBag className="size-10 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-4 font-serif text-2xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Find a course you love and add it here.</p>
          <Link href="/courses" className={buttonVariants({ size: 'lg', className: 'mt-6 h-11 px-5' })}>
            Browse courses
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-border rounded-xl border border-border bg-card">
            {items.map((course) => {
              const price = effectivePrice(course)
              return (
                <li key={course.id} className="flex gap-4 p-4 sm:p-5">
                  <Link href={`/courses/${course.slug}`} className="block aspect-[16/10] w-28 shrink-0 overflow-hidden rounded-lg bg-muted sm:w-40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={course.image || '/placeholder.svg'} alt="" className="size-full object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <Link href={`/courses/${course.slug}`} className="font-serif text-lg leading-snug font-semibold hover:text-primary">
                      {course.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">{`By ${course.instructor} · ${course.duration}`}</p>
                    <button
                      type="button"
                      onClick={() => removeFromCart(course.id)}
                      className="mt-auto inline-flex w-fit items-center gap-1.5 pt-2 text-sm text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-3.5" aria-hidden="true" />
                      Remove
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(price)}</p>
                    {price < course.price && (
                      <p className="text-sm text-muted-foreground line-through">{formatPrice(course.price)}</p>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
          <aside className="h-fit rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24">
            <h2 className="font-serif text-xl font-semibold">Summary</h2>
            <dl className="mt-5 flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{`${items.length} ${items.length === 1 ? 'course' : 'courses'}`}</dt>
                <dd>{formatPrice(subtotal + savings)}</dd>
              </div>
              {savings > 0 && (
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Sale savings</dt>
                  <dd className="text-primary">{`-${formatPrice(savings)}`}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
                <dt>Total</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
            </dl>
            <Link href="/checkout" className={buttonVariants({ size: 'lg', className: 'mt-6 h-11 w-full' })}>
              Proceed to checkout
            </Link>
            <Link href="/courses" className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}
