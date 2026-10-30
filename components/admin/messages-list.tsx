'use client'

import { toast } from 'sonner'
import { deleteMessage, formatDate, useStore } from '@/lib/store'
import { AdminPageHeader, ConfirmDelete } from './admin-ui'

export function MessagesList() {
  const { messages } = useStore()

  return (
    <>
      <AdminPageHeader title="Messages" description="Submissions from the contact page." />
      {messages.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground">
          No messages yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {messages.map((m) => (
            <li key={m.id} className="rounded-xl border border-border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{m.subject}</p>
                  <p className="text-sm text-muted-foreground">
                    {`${m.name} · `}
                    <a href={`mailto:${m.email}`} className="text-primary hover:underline">
                      {m.email}
                    </a>
                    {` · ${formatDate(m.createdAt)}`}
                  </p>
                </div>
                <ConfirmDelete
                  label="this message"
                  onConfirm={() => {
                    deleteMessage(m.id)
                    toast.success('Message deleted')
                  }}
                />
              </div>
              <p className="mt-3 text-sm leading-relaxed whitespace-pre-line">{m.body}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
