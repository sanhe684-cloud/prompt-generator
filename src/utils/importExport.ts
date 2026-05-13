import type { CustomTagsMap, PromptSnapshot, SelectedMap } from '../types/prompt'

const isStringArrayMap = (value: unknown): value is Record<string, string[]> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false
  }

  return Object.values(value).every(
    (item) => Array.isArray(item) && item.every((tag) => typeof tag === 'string'),
  )
}

// 导出时只保留恢复界面所需的最小状态，避免把展示层细节写入文件。
export const createSnapshot = (
  selected: SelectedMap,
  customTags: CustomTagsMap,
): PromptSnapshot => ({
  version: '1.0.0',
  selected,
  customTags,
})

export const downloadSnapshot = (snapshot: PromptSnapshot) => {
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], {
    type: 'application/json;charset=utf-8',
  })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = 'prompt-generator-config.json'
  anchor.click()

  URL.revokeObjectURL(url)
}

export const parseSnapshot = (text: string): PromptSnapshot => {
  const parsed = JSON.parse(text) as Partial<PromptSnapshot>

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('导入文件不是有效的 JSON 对象。')
  }

  if (!isStringArrayMap(parsed.selected) || !isStringArrayMap(parsed.customTags)) {
    throw new Error('导入文件缺少有效的 selected 或 customTags 结构。')
  }

  return {
    version: typeof parsed.version === 'string' ? parsed.version : '1.0.0',
    selected: parsed.selected,
    customTags: parsed.customTags,
  }
}
