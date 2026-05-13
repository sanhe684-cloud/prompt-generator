import type { CustomTagsMap, PreviewTree, PromptModule, SelectedMap } from '../types/prompt'

const getVisibleSelectedTags = (
  selectedTags: string[] | undefined,
  builtInTags: string[],
  customTags: string[] | undefined,
) => {
  if (!selectedTags?.length) {
    return []
  }

  const customTagSet = new Set(customTags ?? [])

  return selectedTags.filter((tag) => builtInTags.includes(tag) || customTagSet.has(tag))
}

// 将选中状态转换为标准 JSON 结构，供右侧预览、复制和导出共用。
export const buildPreviewData = (
  modules: PromptModule[],
  selected: SelectedMap,
  customTags: CustomTagsMap,
): PreviewTree => {
  return modules.reduce<PreviewTree>((moduleAccumulator, module) => {
    const categoryEntries = module.categories.reduce<Record<string, string[]>>((categoryAccumulator, category) => {
      const builtInTags = category.tags.map((tag) => tag.text)
      const selectedTags = getVisibleSelectedTags(
        selected[category.id],
        builtInTags,
        customTags[category.id],
      )

      if (selectedTags.length > 0) {
        categoryAccumulator[category.name] = selectedTags
      }

      return categoryAccumulator
    }, {})

    if (Object.keys(categoryEntries).length > 0) {
      moduleAccumulator[module.title] = categoryEntries
    }

    return moduleAccumulator
  }, {})
}

export const stringifyPreviewData = (previewData: PreviewTree) =>
  JSON.stringify(previewData, null, 2)
