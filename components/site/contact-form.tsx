'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { addMessage } from '@/lib/store'

export function ContactForm() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    addMessage({
      name: String(form.get('name') ?? '').trim(),
      email: String(form.get('email') ?? '').trim(),
      subject: String(form.get('subject') ?? '').trim(),
      body: String(form.get('body') ?? '').trim(),
    })
    e.currentTarget.reset()
    setSent(true)
    toast.success("Message sent. We'll be in touch soon.")
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="c-name">Name</Label>
          <Input id="c-name" name="name" required autoComplete="name" className="h-10" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="c-email">Email</Label>
          <Input id="c-email" name="email" type="email" required autoComplete="email" className="h-10" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="c-subject">Subject</Label>
        <Input id="c-subject" name="subject" required className="h-10" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="c-body">Message</Label>
        <Textarea id="c-body" name="body" required rows={6} maxLength={2000} />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" className="h-11 px-6">
          Send message
        </Button>
        {sent && (
          <p role="status" className="text-sm text-primary">
            Thanks! Your message has been received.
          </p>
        )}
      </div>
    </form>
  )
}
