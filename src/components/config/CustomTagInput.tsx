import { Plus } from 'lucide-react'
import { useState } from 'react'

interface CustomTagInputProps {
  placeholder?: string
  onAdd: (value: string) => void
}

export const CustomTagInput = ({ placeholder, onAdd }: CustomTagInputProps) => {
  const [expanded, setExpanded] = useState(false)
  const [value, setValue] = useState('')

  const submitValue = () => {
    const nextValue = value.trim()

    if (!nextValue) {
      return
    }

    onAdd(nextValue)
    setValue('')
    setExpanded(false)
  }

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-gray-400 text-gray-500 transition hover:bg-white"
        aria-label="添加自定义标签"
      >
        <Plus size={14} />
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2 rounded-full border border-dashed border-gray-300 bg-white/85 px-2 py-1">
      <input
        value={value}
        autoFocus
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            submitValue()
          }

          if (event.key === 'Escape') {
            setExpanded(false)
            setValue('')
          }
        }}
        placeholder={placeholder ?? '添加标签'}
        className="w-40 border-none bg-transparent text-xs text-gray-700 outline-none placeholder:text-gray-400"
      />
      <button
        type="button"
        onClick={submitValue}
        className="rounded-full bg-gray-800 px-2 py-1 text-[11px] text-white transition hover:bg-gray-900"
      >
        添加
      </button>
    </div>
  )
}
