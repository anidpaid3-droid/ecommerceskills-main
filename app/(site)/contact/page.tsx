import type { Metadata } from 'next'
import { Clock, Mail, MapPin } from 'lucide-react'
import { ContactForm } from '@/components/site/contact-form'
import { PageHeader } from '@/components/site/page-header'

export const metadata: Metadata = { title: 'Contact' }

const DETAILS = [
  { icon: Mail, label: 'Email', value: 'hello@skillhouse.example' },
  { icon: MapPin, label: 'Office', value: '210 Market Street, San Francisco, CA' },
  { icon: Clock, label: 'Support hours', value: 'Mon–Fri, 9am–6pm PT' },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We'd love to hear from you"
        description="Questions about a course, team pricing or partnerships? Send us a note and we'll reply within one business day."
      />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[1fr_1.4fr]">
        <ul className="flex flex-col gap-6">
          {DETAILS.map((d) => (
            <li key={d.label} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent">
                <d.icon className="size-5 text-primary" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">{d.label}</p>
                <p className="font-medium">{d.value}</p>
              </div>
            </li>
          ))}
        </ul>
        <ContactForm />
      </div>
    </>
  )
}
