'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { deleteCategory, saveCategory, slugify, uid, useStore } from '@/lib/store'
import type { Category } from '@/lib/types'
import { AdminPageHeader, ConfirmDelete } from './admin-ui'

const EMPTY: Category = { id: '', slug: '', name: '', description: '' }

export function CategoriesManager() {
  const { categories, courses } = useStore()
  const [draft, setDraft] = useState<Category>(EMPTY)
  const editing = Boolean(draft.id)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const slug = slugify(draft.slug || draft.name)
    if (!slug) return toast.error('Please add a name')
    if (categories.some((c) => c.slug === slug && c.id !== draft.id)) {
      return toast.error('Another category already uses this slug')
    }
    saveCategory({ ...draft, id: draft.id || uid('cat'), slug, name: draft.name.trim() })
    toast.success(editing ? 'Category updated' : 'Category created')
    setDraft(EMPTY)
  }

  return (
    <>
      <AdminPageHeader title="Categories" description="Organize courses into categories shown on the storefront." />
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          {categories.map((cat) => {
            const count = courses.filter((c) => c.categoryId === cat.id).length
            return (
              <li key={cat.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{cat.name}</p>
                  <p className="text-sm text-muted-foreground">{`/categories/${cat.slug} · ${count} ${count === 1 ? 'course' : 'courses'}`}</p>
                  {cat.description && <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{cat.description}</p>}
                </div>
                <div className="flex shrink-0">
                  <Button variant="ghost" size="sm" onClick={() => setDraft(cat)}>
                    Edit
                  </Button>
                  {count > 0 ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                      onClick={() => toast.error('Move or delete the courses in this category first')}
                    >
                      Delete
                    </Button>
                  ) : (
                    <ConfirmDelete
                      label={`"${cat.name}"`}
                      onConfirm={() => {
                        deleteCategory(cat.id)
                        if (draft.id === cat.id) setDraft(EMPTY)
                        toast.success('Category deleted')
                      }}
                    />
                  )}
                </div>
              </li>
            )
          })}
          {categories.length === 0 && <li className="p-12 text-center text-muted-foreground">No categories yet.</li>}
        </ul>

        <form onSubmit={onSubmit} className="flex h-fit flex-col gap-4 rounded-xl border border-border bg-card p-6 xl:sticky xl:top-8">
          <h2 className="font-medium">{editing ? 'Edit category' : 'Add category'}</h2>
          <div className="flex flex-col gap-2">
            <Label htmlFor="cat-name">Name</Label>
            <Input id="cat-name" required value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className="h-10" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="cat-slug">Slug</Label>
            <Input
              id="cat-slug"
              value={draft.slug}
              placeholder={slugify(draft.name) || 'auto-generated'}
              onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
              className="h-10"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="cat-desc">Description</Label>
            <Textarea id="cat-desc" rows={3} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </div>
          <div className="flex gap-2">
            <Button type="submit">{editing ? 'Save changes' : 'Add category'}</Button>
            {editing && (
              <Button type="button" variant="outline" onClick={() => setDraft(EMPTY)}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  )
}
