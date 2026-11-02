import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Service Policy',
  description: 'How our courses are delivered, supported and maintained.',
}

// Ekhane bodlale pura page e update hoye jabe
const BRAND = 'E-commerce'
const LAST_UPDATED = 'November 3, 2026'
const SUPPORT_REPLY = '2 business days'

const HIGHLIGHTS = [
  { value: 'Instant', label: 'Course access after payment' },
  { value: 'Lifetime', label: 'Access to every purchased course' },
  { value: SUPPORT_REPLY, label: 'Typical support reply time' },
]

const SECTIONS = [
  {
    id: 'what-we-provide',
    title: 'What we provide',
    intro: `${BRAND} offers self-paced online courses taught by working practitioners.`,
    items: [
      {
        heading: 'Course content',
        body: 'Each course includes video lessons, written resources and downloadable materials, as described on its course page.',
      },
      {
        heading: 'Learning at your pace',
        body: 'There are no fixed deadlines. You can start, pause and resume whenever it suits you.',
      },
      {
        heading: 'Certificates',
        body: 'Where a course offers a certificate, it is issued after you complete all required lessons.',
      },
    ],
  },
  {
    id: 'delivery',
    title: 'Delivery and access',
    intro: 'Our courses are digital, so there is nothing to ship.',
    items: [
      {
        heading: 'When you get access',
        body: 'Access starts as soon as your payment is confirmed. You will find the course in your account and receive a confirmation email.',
      },
      {
        heading: 'Lifetime access',
        body: 'You keep access for as long as the course remains available on the platform. If a course is ever retired, we will give notice before removing it.',
      },
      {
        heading: 'Devices',
        body: 'Courses work on modern browsers on phones, tablets and computers. A stable internet connection is needed to stream lessons.',
      },
    ],
  },
  {
    id: 'support',
    title: 'Customer support',
    intro: 'Real people answer your questions.',
    items: [
      {
        heading: 'How to reach us',
        body: 'Use the contact page to send a message. Please include your order number if your question is about a purchase.',
      },
      {
        heading: 'Response time',
        body: `We aim to reply within ${SUPPORT_REPLY}. During busy periods or public holidays it may take a little longer.`,
      },
      {
        heading: 'What we can help with',
        body: 'Login and access problems, payment questions, technical issues with lessons and general course information.',
      },
    ],
  },
  {
    id: 'availability',
    title: 'Availability and maintenance',
    intro: 'We work hard to keep the platform running smoothly.',
    items: [
      {
        heading: 'Uptime',
        body: 'We aim for the platform to be available at all times, but we cannot guarantee uninterrupted access.',
      },
      {
        heading: 'Planned maintenance',
        body: 'We may occasionally pause the service for updates. Where possible we schedule this at quiet hours and announce it in advance.',
      },
      {
        heading: 'Third-party services',
        body: 'Payments, video hosting and email are provided by trusted partners. Outages on their side can affect parts of our service.',
      },
    ],
  },
  {
    id: 'changes',
    title: 'Changes to the service',
    intro: 'We are always improving the platform.',
    items: [
      {
        heading: 'Updates to courses',
        body: 'Instructors may update lessons, add new material or reorganise a course. You keep access to the updated version at no extra cost.',
      },
      {
        heading: 'Updates to this policy',
        body: 'We may revise this policy as our service grows. The date at the top of this page shows when it was last changed.',
      },
    ],
  },
  {
    id: 'your-responsibilities',
    title: 'Your responsibilities',
    intro: 'A few simple things help us give you the best service.',
    items: [
      {
        heading: 'Keep your account secure',
        body: 'Use a strong password and do not share your login with others. Tell us right away if you suspect unauthorised use.',
      },
      {
        heading: 'Use the service fairly',
        body: 'Courses are for your own learning. Please do not copy, record, resell or distribute the content.',
      },
    ],
  },
]

export default function ServicePolicyPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <header className="max-w-2xl">
        <p className="text-sm font-medium text-primary">Legal</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Service Policy
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          How {BRAND} delivers, supports and maintains your courses. Last updated {LAST_UPDATED}.
        </p>
      </header>

      <ul className="mt-10 grid gap-4 sm:grid-cols-3">
        {HIGHLIGHTS.map((item) => (
          <li key={item.label} className="rounded-2xl border border-border bg-card p-5">
            <p className="text-2xl font-semibold tracking-tight text-foreground">{item.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-10 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Service policy sections" className="lg:sticky lg:top-28 lg:self-start">
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
              <h2 className="text-lg font-semibold">Need help with our service?</h2>
              <p className="mt-1 text-sm opacity-80">Send us a message and we will get back to you.</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-background px-4 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
            >
              Contact support
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}