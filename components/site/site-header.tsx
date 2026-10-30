'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, ShoppingBag } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Logo } from './logo'
import { useHydrated, useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/courses', label: 'Courses' },
  { href: '/categories', label: 'Categories' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { cart } = useStore()
  const hydrated = useHydrated()
  const count = hydrated ? cart.length : 0

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                pathname.startsWith(item.href) && 'text-foreground',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="hidden rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            Admin
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex size-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-muted"
            aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
          >
            <ShoppingBag className="size-4" aria-hidden="true" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-highlight text-[11px] font-semibold text-highlight-foreground">
                {count}
              </span>
            )}
          </Link>
          <Sheet>
            <SheetTrigger
              className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-4" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-6">
              <SheetTitle className="font-serif text-xl">Menu</SheetTitle>
              <nav aria-label="Mobile" className="mt-6 flex flex-col gap-1">
                {[...NAV, { href: '/cart', label: 'Cart' }, { href: '/admin', label: 'Admin' }].map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-md px-3 py-2.5 text-base hover:bg-muted">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
