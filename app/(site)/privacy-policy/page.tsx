import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Policies',
  description: 'Privacy, terms of use, refund and cookie policies.',
}

// Ekhane bodlale pura page e update hoye jabe
const BRAND = 'E-commerce'
const LAST_UPDATED = 'November 1, 2026'
const REFUND_DAYS = 7

const SECTIONS = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    intro: `${BRAND} respects your privacy. This section explains what we collect, why we collect it and how you stay in control.`,
    items: [
      {
        heading: 'Information we collect',
        body: 'Your name, email address and the courses you view, buy or complete. Payments are handled by our payment provider, so we never store your full card details.',
      },
      {
        heading: 'How we use it',
        body: 'To create your account, deliver your courses, process orders, send receipts and updates, and improve the learning experience.',
      },
      {
        heading: 'Sharing',
        body: 'We do not sell your personal data. We only share it with trusted services that help us run the platform, such as payment and hosting providers.',
      },
      {
        heading: 'Your rights',
        body: 'You can ask to access, correct or delete your data at any time by contacting us.',
      },
    ],
  },
  {
    id: 'terms',
    title: 'Terms of Use',
    intro: 'By creating an account or buying a course you agree to the terms below.',
    items: [
      {
        heading: 'Your account',
        body: 'Keep your login details private. You are responsible for all activity under your account.',
      },
      {
        heading: 'Course access',
        body: 'Courses are licensed for your personal, non-commercial learning. Lifetime access means access for as long as the course is available on the platform.',
      },
      {
        heading: 'Intellectual property',
        body: `All videos, text and materials belong to ${BRAND} or its instructors. Please do not copy, resell or share them publicly.`,
      },
      {
        heading: 'Acceptable use',
        body: 'Do not misuse the platform, attempt to break its security, or share your account with others.',
      },
      {
        heading: 'Changes',
        body: 'We may update these terms from time to time. Continued use of the platform means you accept the updated version.',
      },
    ],
  },
  {
    id: 'refund',
    title: 'Refund Policy',
    intro: 'We want you to be happy with every course you buy.',
    items: [
      {
        heading: 'Refund window',
        body: `You can request a full refund within ${REFUND_DAYS} days of purchase, as long as you have completed less than 30% of the course.`,
      },
      {
        heading: 'How to request',
        body: 'Send us a message from the contact page with your order number and a short reason. We usually reply within 2 business days.',
      },
      {
        heading: 'Processing time',
        body: 'Approved refunds go back to your original payment method and can take 5 to 10 business days to appear.',
      },
    ],
  },
  {
    id: 'cookies',
    title: 'Cookie Policy',
    intro: 'Cookies are small files that help the site work properly.',
    items: [
      {
        heading: 'Essential cookies',
        body: 'Needed for login, your cart and checkout. The site cannot work without them.',
      },
      {
        heading: 'Analytics cookies',
        body: 'Help us understand which pages are useful so we can improve them. They do not identify you personally.',
      },
      {
        heading: 'Managing cookies',
        body: 'You can block or delete cookies in your browser settings. Some features may stop working if you do.',
      },
    ],
  },
]

export default function PolicyPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <header className="max-w-2xl">
        <p className="text-sm font-medium text-primary">Legal</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Policies
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Plain-language policies for using {BRAND}. Last updated {LAST_UPDATED}.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Policy sections" className="lg:sticky lg:top-28 lg:self-start">
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
              <h2 className="text-lg font-semibold">Questions about these policies?</h2>
              <p className="mt-1 text-sm opacity-80">Our team is happy to help.</p>
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