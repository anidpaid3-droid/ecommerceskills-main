import { SiteFooter } from '@/components/site/site-footer'
import { Skills } from '@/components/site/site-header'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Skills />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
