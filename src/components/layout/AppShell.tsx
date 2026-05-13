import type { PropsWithChildren } from 'react'

export const AppShell = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-screen overflow-hidden bg-[#f8f9fa] text-gray-800">
      <div className="flex h-full flex-col">{children}</div>
    </div>
  )
}
