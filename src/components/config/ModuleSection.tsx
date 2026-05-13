import type { PromptModule } from '../../types/prompt'
import { themeMap } from '../../theme/themeMap'
import { SubCategoryCard } from './SubCategoryCard'

interface ModuleSectionProps {
  module: PromptModule
}

export const ModuleSection = ({ module }: ModuleSectionProps) => {
  const theme = themeMap[module.theme]

  return (
    <div id={module.id} className={`rounded-lg border p-4 ${theme.panel} ${theme.border}`}>
      <div className="mb-4 flex items-center gap-2 border-b border-white/40 pb-2">
        <span className={`flex h-5 w-5 items-center justify-center rounded text-xs font-bold text-white ${theme.badge}`}>
          {module.number}
        </span>
        <h3 className="font-bold text-gray-800">{module.title}</h3>
      </div>

      <div className="space-y-4">
        {module.categories.map((category) => (
          <SubCategoryCard key={category.id} category={category} moduleId={module.id} themeName={module.theme} />
        ))}
      </div>
    </div>
  )
}
