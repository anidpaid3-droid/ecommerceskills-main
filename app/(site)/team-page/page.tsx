import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the people behind our courses, support and community.',
}

// Ekhane bodlale pura page e update hoye jabe
const BRAND = 'E-commerce'

// NOTE: Ei naam gulo placeholder. Asol team member er naam, role ar bio diye bodle nao.
const TEAM = [
  {
    name: 'Anup Rahman',
    role: 'Founder & Lead Instructor',
    department: 'Leadership',
    bio: 'Builds the learning vision and teaches the core development courses.',
  },
  {
    name: 'Nusrat Jahan',
    role: 'Head of Curriculum',
    department: 'Education',
    bio: 'Designs course outlines so every lesson builds on the one before it.',
  },
  {
    name: 'Rafiq Hasan',
    role: 'Senior Instructor, Design',
    department: 'Education',
    bio: 'Brings years of real client work into practical design lessons.',
  },
  {
    name: 'Mitu Akter',
    role: 'Student Success Manager',
    department: 'Support',
    bio: 'Makes sure every learner gets unstuck quickly and finishes strong.',
  },
  {
    name: 'Tanvir Ahmed',
    role: 'Full-stack Engineer',
    department: 'Product',
    bio: 'Keeps the platform fast, secure and pleasant to use.',
  },
  {
    name: 'Sadia Islam',
    role: 'Community & Marketing',
    department: 'Growth',
    bio: 'Connects learners with new courses and celebrates their wins.',
  },
]

const VALUES = [
  {
    title: 'Practical first',
    description: 'Every lesson ends with something you can build, ship or use at work.',
  },
  {
    title: 'Taught by practitioners',
    description: 'Our instructors do this work every day, so you learn what actually matters.',
  },
  {
    title: 'Learners come first',
    description: 'We listen to feedback and keep improving courses long after launch.',
  },
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function TeamPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <header className="max-w-2xl">
        <p className="text-sm font-medium text-primary">Our team</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          The people behind {BRAND}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          A small team of teachers, builders and supporters who care about helping you learn skills that last.
        </p>
      </header>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((member, index) => (
          <li
            key={member.name}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)]"
          >
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className={
                  index % 2 === 0
                    ? 'inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground'
                    : 'inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-muted text-lg font-semibold text-foreground'
                }
              >
                {getInitials(member.name)}
              </span>
              <div>
                <h2 className="text-base font-semibold tracking-tight text-foreground">{member.name}</h2>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>

            <span className="mt-auto w-fit rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              {member.department}
            </span>
          </li>
        ))}
      </ul>

      <section aria-labelledby="values-heading" className="mt-20">
        <h2 id="values-heading" className="text-2xl font-semibold tracking-tight text-foreground">
          What we believe
        </h2>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {VALUES.map((value) => (
            <li key={value.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold tracking-tight text-foreground">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 flex flex-col gap-3 rounded-2xl bg-primary p-6 text-primary-foreground md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <h2 className="text-lg font-semibold">Want to teach or work with us?</h2>
          <p className="mt-1 text-sm opacity-80">
            We are always happy to meet practitioners and builders who love sharing what they know.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex h-10 items-center justify-center rounded-lg bg-background px-4 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
        >
          Get in touch
        </Link>
      </section>
    </main>
  )
}