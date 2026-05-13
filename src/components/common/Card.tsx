import type { HTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '../../utils/cn'

export const Card = ({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  )
}
