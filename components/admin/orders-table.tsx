'use client'

import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatDate, formatPrice, setOrderStatus, useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { AdminPageHeader } from './admin-ui'

export function OrdersTable() {
  const { orders } = useStore()

  return (
    <>
      <AdminPageHeader title="Orders" description="Every course sale placed through checkout." />
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-5">Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden lg:table-cell">Courses</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="pr-5 text-right">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="pl-5">
                  <p className="font-medium">{o.id}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(o.createdAt)}</p>
                </TableCell>
                <TableCell>
                  <p>{o.name}</p>
                  <p className="text-xs text-muted-foreground">{o.email}</p>
                </TableCell>
                <TableCell className="hidden max-w-72 lg:table-cell">
                  <p className="truncate">{o.items.map((i) => i.title).join(', ')}</p>
                </TableCell>
                <TableCell>{formatPrice(o.total)}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-xs font-medium capitalize',
                      o.status === 'paid' ? 'bg-accent text-accent-foreground' : 'bg-destructive/10 text-destructive',
                    )}
                  >
                    {o.status}
                  </span>
                </TableCell>
                <TableCell className="pr-5 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const next = o.status === 'paid' ? 'refunded' : 'paid'
                      setOrderStatus(o.id, next)
                      toast.success(`Order marked as ${next}`)
                    }}
                  >
                    {o.status === 'paid' ? 'Refund' : 'Mark paid'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                  No orders yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
