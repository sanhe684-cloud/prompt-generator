import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'

import { cn } from '../../utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
}

const variantClassNameMap: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-stone-900 text-white hover:bg-stone-800 disabled:bg-stone-300 disabled:text-stone-100',
  secondary:
    'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 disabled:text-stone-300',
  ghost: 'bg-transparent text-stone-500 hover:bg-stone-100 hover:text-stone-700',
}

export const Button = ({
  children,
  className,
  variant = 'secondary',
  type = 'button',
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 disabled:cursor-not-allowed',
        variantClassNameMap[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
