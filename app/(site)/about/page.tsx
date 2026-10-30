import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { PageHeader } from '@/components/site/page-header'

export const metadata: Metadata = { title: 'About us' }

const VALUES = [
  { title: 'Taught by practitioners', body: 'Every instructor works in the field they teach, so lessons reflect how work actually gets done.' },
  { title: 'Projects over theory', body: 'Each module ends with something you build. You leave with a portfolio, not just a certificate.' },
  { title: 'Learn at your pace', body: 'Lifetime access means you can pause, revisit and pick up exactly where you left off.' },
]

const TEAM = [
  { name: 'Daniel Okafor', role: 'Founder & Development lead' },
  { name: 'Mira Castellanos', role: 'Head of Design' },
  { name: 'Priya Raman', role: 'Growth & Marketing' },
  { name: 'Aiko Tanaka', role: 'Data Science lead' },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Skillhouse"
        title="We help people learn the skills that change careers."
        description="Skillhouse started in 2021 with a simple idea: the best way to learn a craft is from someone who practices it every day."
      />
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/course-business.png" alt="The Skillhouse team collaborating" className="size-full object-cover" />
        </div>
        <div className="flex flex-col gap-4 leading-relaxed text-muted-foreground">
          <h2 className="font-serif text-3xl font-semibold text-foreground">Our story</h2>
          <p>
            We were tired of courses that were either too shallow to be useful or too academic to apply. So we started
            recording the way we teach our own teams: practical, honest and focused on real projects.
          </p>
          <p>
            Today more than 48,000 learners in 120 countries use Skillhouse to switch careers, get promoted and build
            things they are proud of.
          </p>
        </div>
      </section>

      <section className="bg-secondary/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-3 md:px-6">
          {VALUES.map((v, i) => (
            <div key={v.title} className="flex flex-col gap-3">
              <span className="font-serif text-3xl font-semibold text-primary">{`0${i + 1}`}</span>
              <h3 className="font-serif text-xl font-semibold">{v.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="team-heading" className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 id="team-heading" className="font-serif text-3xl font-semibold">
          The people behind Skillhouse
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((person) => (
            <li key={person.name} className="rounded-xl border border-border bg-card p-6">
              <span
                aria-hidden="true"
                className="flex size-12 items-center justify-center rounded-full bg-primary font-serif text-lg text-primary-foreground"
              >
                {person.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </span>
              <p className="mt-4 font-medium">{person.name}</p>
              <p className="text-sm text-muted-foreground">{person.role}</p>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/courses" className={buttonVariants({ size: 'lg', className: 'h-11 px-5' })}>
            Explore courses
          </Link>
          <Link href="/contact" className={buttonVariants({ size: 'lg', variant: 'outline', className: 'h-11 px-5' })}>
            Get in touch
          </Link>
        </div>
      </section>
    </>
  )
}
