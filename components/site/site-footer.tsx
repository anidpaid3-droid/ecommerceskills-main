import Link from 'next/link'
import { Logo } from './logo'

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
    title: 'Company',
    links: [
      { href: '/about', label: 'About us' },
      { href: '/contact', label: 'Contact' },
      { href: '/admin', label: 'Admin panel' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-sidebar text-sidebar-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <Logo className="text-sidebar-foreground [&>span]:bg-sidebar-primary [&>span]:text-sidebar-primary-foreground" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-sidebar-foreground/70">
            Practical online courses taught by people who do the work every day. Learn at your own pace, keep lifetime
            access.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h2 className="text-sm font-semibold">{col.title}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-sidebar-border">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-sidebar-foreground/60 md:px-6">
          {'© 2026 Skillhouse. All rights reserved.'}
        </p>
      </div>
    </footer>
  )
}
