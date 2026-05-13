import { usePromptStore } from '../../store/promptStore'
import { ModuleSection } from './ModuleSection'

export const ConfigPanel = () => {
  const modules = usePromptStore((state) => state.modules)

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-4 py-3">
        <span className="font-bold text-gray-700">配置面板</span>
      </div>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        {modules.map((module) => (
          <ModuleSection key={module.id} module={module} />
        ))}
      </div>
    </section>
  )
}
