import { useMemo } from 'react'

import { usePromptStore } from '../../store/promptStore'
import { buildPreviewData } from '../../utils/buildPreviewData'
import { PreviewTree } from './PreviewTree'

export const PreviewPanel = () => {
  const modules = usePromptStore((state) => state.modules)
  const selected = usePromptStore((state) => state.selected)
  const customTags = usePromptStore((state) => state.customTags)

  const previewData = useMemo(
    () => buildPreviewData(modules, selected, customTags),
    [customTags, modules, selected],
  )

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-lg border border-gray-200 bg-[#FDFDFD] shadow-sm">
      <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-3">
        <span className="flex items-center gap-2 font-bold text-gray-700">
          <span className="font-mono text-gray-400">{'</>'}</span> 提示词预览
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-5 font-mono text-[13px] leading-loose">
        <PreviewTree previewData={previewData} />
      </div>
    </section>
  )
}
