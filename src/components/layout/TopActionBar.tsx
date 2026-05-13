import { Copy, Download, Eraser, Import, RotateCcw } from 'lucide-react'
import type { ChangeEvent } from 'react'

import { usePromptStore } from '../../store/promptStore'
import { themeMap } from '../../theme/themeMap'
import { buildPreviewData, stringifyPreviewData } from '../../utils/buildPreviewData'
import { copyPreviewAsJson } from '../../utils/copyPreviewAsJson'
import { createSnapshot, downloadSnapshot, parseSnapshot } from '../../utils/importExport'

export const TopActionBar = () => {
  const modules = usePromptStore((state) => state.modules)
  const selected = usePromptStore((state) => state.selected)
  const customTags = usePromptStore((state) => state.customTags)
  const clearSelections = usePromptStore((state) => state.clearSelections)
  const resetAll = usePromptStore((state) => state.resetAll)
  const importSnapshot = usePromptStore((state) => state.importSnapshot)
  const showToast = usePromptStore((state) => state.showToast)

  const previewText = stringifyPreviewData(buildPreviewData(modules, selected, customTags))

  const handleImportSnapshot = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    try {
      const text = await file.text()
      const snapshot = parseSnapshot(text)
      importSnapshot(snapshot)
      showToast('导入成功，已恢复当前配置。')
    } catch (error) {
      const message = error instanceof Error ? error.message : '导入失败，请检查文件格式。'
      showToast(message)
    } finally {
      event.target.value = ''
    }
  }

  const scrollToModule = (moduleId: string) => {
    const element = document.getElementById(moduleId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="shrink-0 border-b border-gray-200 bg-white px-6 py-2.5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4 overflow-x-auto">
          <div className="flex shrink-0 items-center gap-2 border-r border-gray-200 pr-4">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-indigo-600 text-xs font-bold text-white">
              P
            </div>
            <span className="font-bold text-gray-800">提示词生成器</span>
            <span className="ml-2 rounded border border-gray-200 px-2 py-0.5 text-xs text-gray-400">
              建筑效果图
            </span>
          </div>

          <div className="flex gap-2">
            {modules.map((module) => {
              const theme = themeMap[module.theme]

              return (
                <button
                  key={`nav-${module.id}`}
                  type="button"
                  onClick={() => scrollToModule(module.id)}
                  className={`flex items-center gap-1 rounded-full border border-transparent px-2.5 py-1 text-xs font-medium transition-colors hover:border-gray-200 hover:bg-gray-50 ${theme.navText}`}
                >
                  <span
                    className={`flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] text-white ${theme.badge}`}
                  >
                    {module.number}
                  </span>
                  <span className="whitespace-nowrap">{module.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <label className="flex cursor-pointer items-center gap-1 px-3 py-1 text-xs text-gray-600 transition hover:text-gray-800">
            <Import size={13} />
            导入
            <input type="file" accept="application/json" className="hidden" onChange={handleImportSnapshot} />
          </label>
          <button
            type="button"
            onClick={() => {
              downloadSnapshot(createSnapshot(selected, customTags))
              showToast('导出成功，已生成 JSON 文件。')
            }}
            className="flex items-center gap-1 px-3 py-1 text-xs text-gray-600 transition hover:text-gray-800"
          >
            <Download size={13} />
            导出
          </button>
          <div className="mx-1 h-4 w-px bg-gray-300"></div>
          <button
            type="button"
            onClick={resetAll}
            className="flex items-center gap-1 rounded px-3 py-1.5 text-xs text-gray-600 transition hover:bg-gray-100"
          >
            <RotateCcw size={13} />
            重置
          </button>
          <button
            type="button"
            onClick={clearSelections}
            className="flex items-center gap-1 rounded bg-blue-500 px-3 py-1.5 text-xs text-white shadow-sm transition hover:bg-blue-600"
          >
            <Eraser size={13} />
            取消选择
          </button>
          <button
            type="button"
            onClick={async () => {
              await copyPreviewAsJson(previewText)
              showToast('复制成功，已写入剪贴板。')
            }}
            className="flex items-center gap-1 rounded bg-blue-600 px-3 py-1.5 text-xs text-white shadow-sm transition hover:bg-blue-700"
          >
            <Copy size={13} />
            复制
          </button>
        </div>
      </div>
    </header>
  )
}
