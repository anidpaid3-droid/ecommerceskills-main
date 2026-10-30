'use client'

import { useSyncExternalStore } from 'react'
import { seedState } from './seed'
import type { Category, Course, Message, Order, OrderStatus, Post, StoreState } from './types'

const STORAGE_KEY = 'skillhouse-store-v1'

let state: StoreState = seedState
let loaded = false
const listeners = new Set<() => void>()

function load() {
  if (loaded || typeof window === 'undefined') return
  loaded = true
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) state = { ...seedState, ...JSON.parse(raw) }
  } catch {
    state = seedState
  }
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Storage can fail when large uploaded images exceed the browser quota.
    throw new Error('Storage is full. Try a smaller image.')
  }
}

function setState(updater: (prev: StoreState) => StoreState) {
  load()
  const prev = state
  state = updater(state)
  try {
    persist()
  } catch (err) {
    state = prev
    throw err
  }
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  load()
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  load()
  return state
}

const getServerSnapshot = () => seedState

export function useStore() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

const noopSubscribe = () => () => {}
export function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false)
}

export function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function effectivePrice(course: Course) {
  return course.salePrice && course.salePrice < course.price ? course.salePrice : course.price
}

export const COUPONS: Record<string, number> = { LEARN10: 0.1, WELCOME20: 0.2 }

export function addToCart(courseId: string) {
  setState((s) => (s.cart.includes(courseId) ? s : { ...s, cart: [...s.cart, courseId] }))
}

export function removeFromCart(courseId: string) {
  setState((s) => ({ ...s, cart: s.cart.filter((id) => id !== courseId) }))
}

export function placeOrder(input: { name: string; email: string; country: string; coupon?: string }) {
  const current = getSnapshot()
  const items = current.cart
    .map((id) => current.courses.find((c) => c.id === id && c.published))
    .filter((c): c is Course => Boolean(c))
    .map((c) => ({ courseId: c.id, title: c.title, price: effectivePrice(c) }))
  if (items.length === 0) throw new Error('Your cart is empty.')
  const subtotal = items.reduce((sum, i) => sum + i.price, 0)
  const code = input.coupon?.trim().toUpperCase()
  const rate = code ? (COUPONS[code] ?? 0) : 0
  const discount = Math.round(subtotal * rate * 100) / 100
  const order: Order = {
    id: `ORD-${Date.now().toString(36).toUpperCase()}`,
    name: input.name,
    email: input.email,
    country: input.country,
    items,
    subtotal,
    discount,
    total: Math.round((subtotal - discount) * 100) / 100,
    coupon: rate ? code : undefined,
    status: 'paid',
    createdAt: new Date().toISOString(),
  }
  setState((s) => ({ ...s, orders: [order, ...s.orders], cart: [] }))
  return order.id
}

export function setOrderStatus(id: string, status: OrderStatus) {
  setState((s) => ({ ...s, orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)) }))
}

export function saveCourse(course: Course) {
  setState((s) => {
    const exists = s.courses.some((c) => c.id === course.id)
    return { ...s, courses: exists ? s.courses.map((c) => (c.id === course.id ? course : c)) : [course, ...s.courses] }
  })
}

export function deleteCourse(id: string) {
  setState((s) => ({ ...s, courses: s.courses.filter((c) => c.id !== id), cart: s.cart.filter((c) => c !== id) }))
}

export function saveCategory(category: Category) {
  setState((s) => {
    const exists = s.categories.some((c) => c.id === category.id)
    return {
      ...s,
      categories: exists ? s.categories.map((c) => (c.id === category.id ? category : c)) : [...s.categories, category],
    }
  })
}

export function deleteCategory(id: string) {
  setState((s) => ({ ...s, categories: s.categories.filter((c) => c.id !== id) }))
}

export function savePost(post: Post) {
  setState((s) => {
    const exists = s.posts.some((p) => p.id === post.id)
    return { ...s, posts: exists ? s.posts.map((p) => (p.id === post.id ? post : p)) : [post, ...s.posts] }
  })
}

export function deletePost(id: string) {
  setState((s) => ({ ...s, posts: s.posts.filter((p) => p.id !== id) }))
}

export function addMessage(message: Omit<Message, 'id' | 'createdAt'>) {
  setState((s) => ({
    ...s,
    messages: [{ ...message, id: uid('msg'), createdAt: new Date().toISOString() }, ...s.messages],
  }))
}

export function deleteMessage(id: string) {
  setState((s) => ({ ...s, messages: s.messages.filter((m) => m.id !== id) }))
}

export function resetStore() {
  setState(() => seedState)
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(iso))
}
