interface TagChipProps {
  label: string
  selected: boolean
  activeClassName: string
  onClick: () => void
}

export const TagChip = ({ label, selected, activeClassName, onClick }: TagChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-left text-xs transition-all duration-200 ${
        selected
          ? `${activeClassName} font-medium`
          : 'border-white bg-white/80 text-gray-600 hover:border-gray-300'
      }`}
    >
      {label}
    </button>
  )
}
