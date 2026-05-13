import { usePromptStore } from '../../store/promptStore'
import { themeMap } from '../../theme/themeMap'
import type { PreviewTree as PreviewTreeType } from '../../types/prompt'
import { PreviewValueChips } from './PreviewValueChips'

interface PreviewTreeProps {
  previewData: PreviewTreeType
}

export const PreviewTree = ({ previewData }: PreviewTreeProps) => {
  const modules = usePromptStore((state) => state.modules)

  return (
    <div className="text-gray-700">
      {'{'}
      {modules.map((module, moduleIndex) => {
        const activeCategories = previewData[module.title]

        if (!activeCategories || Object.keys(activeCategories).length === 0) {
          return null
        }

        const theme = themeMap[module.theme]
        const categoryEntries = Object.entries(activeCategories)

        return (
          <div key={module.id} className="mt-1 pl-6">
            <span className={theme.previewKey}>"{module.title}"</span>: {'{'}

            {categoryEntries.map(([categoryName, values], categoryIndex) => (
              <div key={categoryName} className="flex flex-wrap items-center pl-6">
                <span className="mr-2 text-blue-600">"{categoryName}"</span>: <span className="mx-1 text-gray-400">[</span>
                <PreviewValueChips values={values} chipClassName={theme.activeTag} />
                <span className="ml-1 text-gray-400">]</span>
                {categoryIndex < categoryEntries.length - 1 ? <span className="text-gray-400">,</span> : null}
              </div>
            ))}

            <div className="pl-6">
              {'}'}
              {moduleIndex < modules.length - 1 ? <span className="text-gray-400">,</span> : null}
            </div>
          </div>
        )
      })}
      <div className="mt-1">{'}'}</div>
    </div>
  )
}
