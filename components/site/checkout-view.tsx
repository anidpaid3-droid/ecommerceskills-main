'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Lock } from 'lucide-react'
import { toast } from 'sonner'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { COUPONS, effectivePrice, formatPrice, placeOrder, useHydrated } from '@/lib/store'
import { useCartCourses } from './cart-view'

const COUNTRIES = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'India', 'Other']

export function CheckoutView() {
  const router = useRouter()
  const hydrated = useHydrated()
  const { items, subtotal } = useCartCourses()
  const [couponInput, setCouponInput] = useState('')
  const [coupon, setCoupon] = useState<string | undefined>()
  const [submitting, setSubmitting] = useState(false)

  const rate = coupon ? (COUPONS[coupon] ?? 0) : 0
  const discount = Math.round(subtotal * rate * 100) / 100
  const total = subtotal - discount

  function applyCoupon() {
    const code = couponInput.trim().toUpperCase()
    if (COUPONS[code]) {
      setCoupon(code)
      toast.success(`Coupon ${code} applied`)
    } else {
      toast.error('That coupon code is not valid')
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setSubmitting(true)
    try {
      const id = placeOrder({
        name: String(form.get('name') ?? '').trim(),
        email: String(form.get('email') ?? '').trim(),
        country: String(form.get('country') ?? ''),
        coupon,
      })
      router.push(`/order/${id}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
      setSubmitting(false)
    }
  }

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-semibold">Nothing to check out</h1>
        <p className="mt-3 text-muted-foreground">Add a course to your cart to continue.</p>
        <Link href="/courses" className={buttonVariants({ size: 'lg', className: 'mt-6 h-11 px-5' })}>
          Browse courses
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">Checkout</h1>
      <form onSubmit={onSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-8">
          <fieldset className="rounded-xl border border-border bg-card p-6">
            <legend className="px-1 font-serif text-xl font-semibold">Your details</legend>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2 sm:col-span-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" required autoComplete="name" className="h-10" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required autoComplete="email" className="h-10" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="country">Country</Label>
                <select
                  id="country"
                  name="country"
                  required
                  defaultValue="United States"
                  className="h-10 rounded-lg border border-input bg-transparent px-3 text-sm"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-xl border border-border bg-card p-6">
            <legend className="px-1 font-serif text-xl font-semibold">Payment</legend>
            <div className="mt-4 flex items-start gap-3 rounded-lg bg-accent p-4 text-sm text-accent-foreground">
              <Lock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <p>
                Demo store: no card details are collected and no real payment is processed. Placing the order records it
                in the admin panel.
              </p>
            </div>
          </fieldset>
        </div>

        <aside className="h-fit rounded-xl border border-border bg-card p-6 lg:sticky lg:top-24">
          <h2 className="font-serif text-xl font-semibold">Order summary</h2>
          <ul className="mt-5 flex flex-col gap-4">
            {items.map((c) => (
              <li key={c.id} className="flex gap-3">
                <div className="aspect-[16/10] w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image || '/placeholder.svg'} alt="" className="size-full object-cover" />
                </div>
                <p className="flex-1 text-sm leading-snug font-medium">{c.title}</p>
                <p className="text-sm">{formatPrice(effectivePrice(c))}</p>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex gap-2 border-t border-border pt-5">
            <Label htmlFor="coupon" className="sr-only">
              Coupon code
            </Label>
            <Input
              id="coupon"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="Coupon code"
              className="h-10"
            />
            <Button type="button" variant="outline" className="h-10" onClick={applyCoupon}>
              Apply
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Try LEARN10 or WELCOME20</p>
          <dl className="mt-5 flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">{`Discount (${coupon})`}</dt>
                <dd className="text-primary">{`-${formatPrice(discount)}`}</dd>
              </div>
            )}
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          <Button type="submit" size="lg" className="mt-6 h-11 w-full" disabled={submitting}>
            {submitting ? 'Placing order…' : `Place order · ${formatPrice(total)}`}
          </Button>
        </aside>
      </form>
    </div>
  )
}
