import type { Metadata } from 'next'
import { OrderConfirmView } from '@/components/site/order-confirm-view'

export const metadata: Metadata = { title: 'Order confirmed' }

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <OrderConfirmView id={id} />
}
