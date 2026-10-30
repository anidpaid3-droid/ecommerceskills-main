import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className, href = '/' }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn('flex items-center gap-2 font-serif text-xl font-semibold tracking-tight', className)}>
      <span
        aria-hidden="true"
        className="flex size-8 items-center justify-center rounded-lg bg-primary font-serif text-base text-primary-foreground"
      >
        S
      </span>
      Skillhouse
    </Link>
  )
}
