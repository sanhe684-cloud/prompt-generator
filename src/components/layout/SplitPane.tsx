import type { ReactNode } from 'react'

interface SplitPaneProps {
  left: ReactNode
  right: ReactNode
}

export const SplitPane = ({ left, right }: SplitPaneProps) => {
  return (
    <main className="flex min-h-0 flex-1 gap-4 overflow-hidden p-4">
      <div className="flex min-h-0 w-[55%] min-w-0 flex-col">{left}</div>
      <div className="flex min-h-0 w-[45%] min-w-0 flex-col">{right}</div>
    </main>
  )
}
