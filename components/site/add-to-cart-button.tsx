'use client'

import { useRouter } from 'next/navigation'
import { Check, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { addToCart, useHydrated, useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export function AddToCartButton({
  courseId,
  size = 'default',
  className,
}: {
  courseId: string
  size?: 'sm' | 'default' | 'lg'
  className?: string
}) {
  const router = useRouter()
  const { cart } = useStore()
  const hydrated = useHydrated()
  const inCart = hydrated && cart.includes(courseId)

  if (inCart) {
    return (
      <Button variant="outline" size={size} className={className} onClick={() => router.push('/cart')}>
        <Check aria-hidden="true" />
        In cart
      </Button>
    )
  }

  return (
    <Button
      size={size}
      className={cn(className)}
      onClick={() => {
        addToCart(courseId)
        toast.success('Added to cart', {
          action: { label: 'View cart', onClick: () => router.push('/cart') },
        })
      }}
    >
      <Plus aria-hidden="true" />
      Add to cart
    </Button>
  )
}
