'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { BookOpen, ExternalLink, FolderTree, LayoutDashboard, Mail, Menu, Newspaper, Receipt } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen },
  { href: '/admin/categories', label: 'Categories', icon: FolderTree },
  { href: '/admin/posts', label: 'Blog posts', icon: Newspaper },
  { href: '/admin/orders', label: 'Orders', icon: Receipt },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
]

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <nav aria-label="Admin" className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              active && 'bg-sidebar-accent font-medium text-sidebar-accent-foreground',
            )}
          >
            <item.icon className="size-4" aria-hidden="true" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

function Brand() {
  return (
    <Link href="/admin" className="flex items-center gap-2 font-serif text-lg font-semibold text-sidebar-foreground">
      <span className="flex size-7 items-center justify-center rounded-md bg-highlight text-sm text-highlight-foreground">S</span>
      Skillhouse
      <span className="rounded bg-sidebar-accent px-1.5 py-0.5 font-sans text-[10px] font-medium tracking-wide uppercase">
        Admin
      </span>
    </Link>
  )
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-dvh bg-background">
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col gap-8 bg-sidebar p-5 lg:flex">
        <Brand />
        <NavLinks />
        <Link
          href="/"
          className="mt-auto flex items-center gap-2 text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground"
        >
          <ExternalLink className="size-4" aria-hidden="true" />
          View storefront
        </Link>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" aria-label="Open admin menu" />}>
              <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 border-none bg-sidebar p-5">
              <SheetHeader className="p-0 pb-6">
                <SheetTitle className="sr-only">Admin menu</SheetTitle>
                <Brand />
              </SheetHeader>
              <NavLinks onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <span className="font-serif font-semibold">Skillhouse Admin</span>
          <Link href="/" className="text-sm text-muted-foreground">
            Store
          </Link>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
