import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'What cookies we use, why we use them and how you can control them.',
}

// Ekhane bodlale pura page e update hoye jabe
const BRAND = 'E-commerce'
const LAST_UPDATED = 'November 3, 2026'

const COOKIE_TYPES = [
  {
    name: 'Essential',
    status: 'Always on',
    description:
      'Keep you signed in, remember your cart and make checkout work. The site cannot function properly without them.',
  },
  {
    name: 'Preferences',
    status: 'Optional',
    description: 'Remember choices such as your last viewed course so the site feels familiar when you return.',
  },
  {
    name: 'Analytics',
    status: 'Optional',
    description:
      'Show us which pages are useful and where visitors get stuck. This data is combined and does not identify you personally.',
  },
]

const SECTIONS = [
  {
    id: 'what-are-cookies',
    title: 'What are cookies?',
    intro: 'Cookies are small text files saved on your device when you visit a website.',
    items: [
      {
        heading: 'Why websites use them',
        body: 'They help a site remember who you are, keep you logged in and understand how the site is being used.',
      },
      {
        heading: 'Session and persistent cookies',
        body: 'Session cookies disappear when you close your browser. Persistent cookies stay on your device for a set period or until you delete them.',
      },
    ],
  },
  {
    id: 'how-we-use',
    title: 'How we use cookies',
    intro: `${BRAND} uses cookies only for the purposes below.`,
    items: [
      {
        heading: 'To run the store',
        body: 'Login, cart and checkout depend on cookies to work from one page to the next.',
      },
      {
        heading: 'To improve the experience',
        body: 'We look at how pages are used so we can fix confusing steps and improve our courses and layout.',
      },
      {
        heading: 'What we do not do',
        body: 'We do not sell your cookie data, and we do not use cookies to build a personal profile for third-party advertisers.',
      },
    ],
  },
  {
    id: 'third-party',
    title: 'Third-party cookies',
    intro: 'Some cookies are set by trusted services we use to run the platform.',
    items: [
      {
        heading: 'Payments',
        body: 'Our payment provider may set cookies to process your payment securely and prevent fraud.',
      },
      {
        heading: 'Analytics and video',
        body: 'Analytics and video hosting partners may set their own cookies. Their use is covered by their own privacy policies.',
      },
    ],
  },
  {
    id: 'manage',
    title: 'Managing your cookies',
    intro: 'You are always in control.',
    items: [
      {
        heading: 'Browser settings',
        body: 'Most browsers let you view, block or delete cookies from the privacy or security section of their settings. Steps differ slightly between Chrome, Safari, Firefox and Edge.',
      },
      {
        heading: 'What happens if you block them',
        body: 'The site will still open, but you may be logged out often, and your cart or checkout may stop working.',
      },
      {
        heading: 'Deleting existing cookies',
        body: 'You can clear cookies at any time from your browser. The next time you visit, only the cookies you allow will be saved.',
      },
    ],
  },
  {
    id: 'updates',
    title: 'Changes to this policy',
    intro: 'We may update this page when our service or the law changes.',
    items: [
      {
        heading: 'How you will know',
        body: 'The date at the top of this page shows when it was last updated. Please check back from time to time.',
      },
    ],
  },
]

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <header className="max-w-2xl">
        <p className="text-sm font-medium text-primary">Legal</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Cookie Policy
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          What cookies {BRAND} uses, why we use them and how you can control them. Last updated {LAST_UPDATED}.
        </p>
      </header>

      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {COOKIE_TYPES.map((type) => (
          <li key={type.name} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold tracking-tight text-foreground">{type.name}</h2>
              <span
                className={
                  type.status === 'Always on'
                    ? 'rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground'
                    : 'rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground'
                }
              >
                {type.status}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{type.description}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Cookie policy sections" className="lg:sticky lg:top-28 lg:self-start">
          <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-6">
          {SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 md:p-8"
            >
              <h2 id={`${section.id}-heading`} className="text-xl font-semibold tracking-tight text-foreground">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.intro}</p>

              <dl className="mt-6 flex flex-col gap-5">
                {section.items.map((item) => (
                  <div key={item.heading}>
                    <dt className="text-sm font-semibold text-foreground">{item.heading}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}

          <div className="flex flex-col gap-3 rounded-2xl bg-primary p-6 text-primary-foreground md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <h2 className="text-lg font-semibold">Questions about cookies?</h2>
              <p className="mt-1 text-sm opacity-80">
                Read our{' '}
                <Link href="/policy#privacy" className="underline underline-offset-2">
                  Privacy Policy
                </Link>{' '}
                or send us a message.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-background px-4 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}