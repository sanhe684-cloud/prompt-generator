export type SelectionMode = 'single' | 'multiple'

export type ThemeName = 'pink' | 'emerald' | 'purple' | 'orange' | 'blue' | 'yellow'

export interface PromptTag {
  id: string
  text: string
  selectedByDefault?: boolean
}

export interface PromptCategory {
  id: string
  name: string
  tags: PromptTag[]
  selectionMode?: SelectionMode
  allowCustomTag?: boolean
  customPlaceholder?: string
}

export interface PromptModule {
  id: string
  number: string
  title: string
  theme: ThemeName
  categories: PromptCategory[]
}

export type SelectedMap = Record<string, string[]>

export type CustomTagsMap = Record<string, string[]>

export interface PromptSnapshot {
  version: string
  selected: SelectedMap
  customTags: CustomTagsMap
}

export type PreviewTree = Record<string, Record<string, string[]>>
