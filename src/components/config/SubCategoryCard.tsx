import type { PromptCategory, ThemeName } from '../../types/prompt'
import { usePromptStore } from '../../store/promptStore'
import { themeMap } from '../../theme/themeMap'
import { CustomTagInput } from './CustomTagInput'
import { TagChip } from './TagChip'

interface SubCategoryCardProps {
  category: PromptCategory
  moduleId: string
  themeName: ThemeName
}

export const SubCategoryCard = ({ category, themeName }: SubCategoryCardProps) => {
  const selectedMap = usePromptStore((state) => state.selected)
  const customTagMap = usePromptStore((state) => state.customTags)
  const toggleTag = usePromptStore((state) => state.toggleTag)
  const addCustomTag = usePromptStore((state) => state.addCustomTag)
  const showToast = usePromptStore((state) => state.showToast)
  const theme = themeMap[themeName]

  const selectedTags = selectedMap[category.id] ?? []
  const customTags = customTagMap[category.id] ?? []
  const allTags = [...category.tags.map((tag) => tag.text), ...customTags]

  return (
    <div className="flex flex-col">
      <div className="mb-2 text-xs font-bold text-gray-600">{category.name}</div>
      <div className="flex flex-wrap gap-2">
        {allTags.map((tagText) => (
          <TagChip
            key={tagText}
            label={tagText}
            selected={selectedTags.includes(tagText)}
            activeClassName={theme.activeTag}
            onClick={() => toggleTag(category.id, tagText, category.selectionMode)}
          />
        ))}
        {category.allowCustomTag ? (
          <CustomTagInput
            placeholder={category.customPlaceholder}
            onAdd={(value) => {
              const result = addCustomTag(category.id, value)
              showToast(result.message)
            }}
          />
        ) : null}
      </div>
    </div>
  )
}
