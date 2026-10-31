'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { Logo } from './logo'

const BRAND = 'E-commerce_Skills'

const COLUMNS = [
  {
    title: 'Learn',
    links: [
      { href: '/courses', label: 'All courses' },
      { href: '/categories', label: 'Categories' },
      { href: '/blog', label: 'Blog' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { href: '/categories/development', label: 'Development' },
      { href: '/categories/design', label: 'Design' },
      { href: '/categories/marketing', label: 'Marketing' },
      { href: '/categories/data-science', label: 'Data Science' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About us' },
      { href: '/contact', label: 'Contact' },
    ],
  },
]

const LEGAL = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim()) return
    // TODO: pore /api/subscribe e POST kore MongoDB te save korbo
    setDone(true)
    setEmail('')
  }

  if (done) {
    return (
      <p className="flex items-center gap-2 text-sm font-medium text-sidebar-foreground">
        <Check className="size-4 text-sidebar-primary" aria-hidden="true" />
        Thanks for subscribing. Check your inbox soon.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="h-10 flex-1 rounded-lg border border-sidebar-border bg-sidebar-foreground/10 px-3 text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/50 focus:outline-none focus:ring-2 focus:ring-sidebar-primary"
      />
      <button
        type="submit"
        className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-sidebar-primary px-4 text-sm font-medium text-sidebar-primary-foreground transition-opacity hover:opacity-90"
      >
        Subscribe
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>
    </form>
  )
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-sidebar text-sidebar-foreground">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Newsletter */}
        <div className="flex flex-col gap-6 border-b border-sidebar-border py-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h2 className="text-xl font-semibold tracking-tight">Learn something new every week</h2>
            <p className="mt-2 text-sm leading-relaxed text-sidebar-foreground/70">
              Get new courses, study tips and special offers in your inbox. No spam, unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm />
        </div>

        {/* Links */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2">
            <Logo className="text-sidebar-foreground [&>span]:bg-sidebar-primary [&>span]:text-sidebar-primary-foreground" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sidebar-foreground/70">
              Practical online courses taught by people who do the work every day. Learn at your own pace, keep
              lifetime access.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-semibold">{col.title}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-sidebar-foreground/70 transition-colors hover:text-sidebar-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-sidebar-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-sidebar-foreground/60 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <p>{`© ${new Date().getFullYear()} ${BRAND}. All rights reserved.`}</p>
          <ul className="flex items-center gap-5">
            {LEGAL.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-sidebar-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}