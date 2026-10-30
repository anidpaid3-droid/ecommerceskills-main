export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <section className="border-b border-border bg-secondary/60">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        {eyebrow && <p className="text-sm font-medium tracking-wide text-primary uppercase">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
        )}
        {children}
      </div>
    </section>
  )
}

export function NotFoundState({ title, href, linkLabel }: { title: string; href: string; linkLabel: string }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <h1 className="font-serif text-3xl font-semibold">{title}</h1>
      <p className="mt-3 text-muted-foreground">It may have been removed or the link is incorrect.</p>
      <a href={href} className="mt-6 text-sm font-medium text-primary underline underline-offset-4">
        {linkLabel}
      </a>
    </div>
  )
}
