import type { ThemeName } from '../types/prompt'

export const themeMap: Record<
  ThemeName,
  {
    panel: string
    border: string
    activeTag: string
    navText: string
    badge: string
    previewKey: string
  }
> = {
  pink: {
    panel: 'bg-rose-50/60',
    border: 'border-rose-100',
    activeTag: 'bg-rose-100 text-rose-700 border-rose-200',
    navText: 'text-rose-600',
    badge: 'bg-rose-500',
    previewKey: 'text-rose-600',
  },
  emerald: {
    panel: 'bg-emerald-50/60',
    border: 'border-emerald-100',
    activeTag: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    navText: 'text-emerald-600',
    badge: 'bg-emerald-500',
    previewKey: 'text-emerald-600',
  },
  purple: {
    panel: 'bg-purple-50/60',
    border: 'border-purple-100',
    activeTag: 'bg-purple-100 text-purple-700 border-purple-200',
    navText: 'text-purple-600',
    badge: 'bg-purple-500',
    previewKey: 'text-purple-600',
  },
  orange: {
    panel: 'bg-amber-50/60',
    border: 'border-amber-100',
    activeTag: 'bg-amber-100 text-amber-700 border-amber-200',
    navText: 'text-amber-600',
    badge: 'bg-amber-500',
    previewKey: 'text-amber-600',
  },
  blue: {
    panel: 'bg-blue-50/60',
    border: 'border-blue-100',
    activeTag: 'bg-blue-100 text-blue-700 border-blue-200',
    navText: 'text-blue-600',
    badge: 'bg-blue-500',
    previewKey: 'text-blue-600',
  },
  yellow: {
    panel: 'bg-yellow-50/60',
    border: 'border-yellow-100',
    activeTag: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    navText: 'text-yellow-700',
    badge: 'bg-yellow-500',
    previewKey: 'text-yellow-700',
  },
}
