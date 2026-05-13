import { create } from 'zustand'

import { mockConfig } from '../data/mockConfig'
import type {
  CustomTagsMap,
  PromptCategory,
  PromptModule,
  PromptSnapshot,
  SelectedMap,
  SelectionMode,
} from '../types/prompt'

const getAllCategories = (modules: PromptModule[]) => modules.flatMap((module) => module.categories)

const createInitialSelectedMap = (modules: PromptModule[]) => {
  return getAllCategories(modules).reduce<SelectedMap>((accumulator, category) => {
    const selectedTags = category.tags.filter((tag) => tag.selectedByDefault).map((tag) => tag.text)

    if (selectedTags.length > 0) {
      accumulator[category.id] = selectedTags
    }

    return accumulator
  }, {})
}

const findCategory = (modules: PromptModule[], categoryId: string): PromptCategory | undefined =>
  getAllCategories(modules).find((category) => category.id === categoryId)

const initialModules = mockConfig
const initialSelected = createInitialSelectedMap(initialModules)

interface PromptStore {
  modules: PromptModule[]
  selected: SelectedMap
  customTags: CustomTagsMap
  toastMessage: string | null
  toggleTag: (categoryId: string, tagText: string, selectionMode?: SelectionMode) => void
  addCustomTag: (categoryId: string, tagText: string) => { success: boolean; message: string }
  clearSelections: () => void
  resetAll: () => void
  importSnapshot: (snapshot: PromptSnapshot) => void
  showToast: (message: string) => void
  hideToast: () => void
}

export const usePromptStore = create<PromptStore>((set, get) => ({
  modules: initialModules,
  selected: initialSelected,
  customTags: {},
  toastMessage: null,

  toggleTag: (categoryId, tagText, selectionMode = 'multiple') => {
    const currentSelected = get().selected[categoryId] ?? []
    const alreadySelected = currentSelected.includes(tagText)

    const nextSelected = alreadySelected
      ? currentSelected.filter((item) => item !== tagText)
      : selectionMode === 'single'
        ? [tagText]
        : [...currentSelected, tagText]

    set((state) => ({
      selected: {
        ...state.selected,
        [categoryId]: nextSelected,
      },
    }))
  },

  // 自定义标签不写回原始模块数据，而是独立挂在 customTags 中，避免污染静态配置。
  addCustomTag: (categoryId, tagText) => {
    const normalizedTag = tagText.trim()

    if (!normalizedTag) {
      return { success: false, message: '请输入要添加的标签内容。' }
    }

    const category = findCategory(get().modules, categoryId)
    const builtInTags = category?.tags.map((tag) => tag.text) ?? []
    const mergedTags = new Set([...builtInTags, ...(get().customTags[categoryId] ?? [])])

    if (mergedTags.has(normalizedTag)) {
      return { success: false, message: '当前分类中已存在同名标签。' }
    }

    set((state) => ({
      customTags: {
        ...state.customTags,
        [categoryId]: [...(state.customTags[categoryId] ?? []), normalizedTag],
      },
      selected: {
        ...state.selected,
        [categoryId]: [...(state.selected[categoryId] ?? []), normalizedTag],
      },
    }))

    return { success: true, message: '已添加自定义标签。' }
  },

  clearSelections: () => {
    set({ selected: {} })
  },

  resetAll: () => {
    set({
      selected: createInitialSelectedMap(get().modules),
      customTags: {},
    })
  },

  importSnapshot: (snapshot) => {
    set({
      selected: snapshot.selected,
      customTags: snapshot.customTags,
    })
  },

  showToast: (message) => set({ toastMessage: message }),
  hideToast: () => set({ toastMessage: null }),
}))
