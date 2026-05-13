import { useEffect } from 'react'

interface ToastProps {
  message: string | null
  onClose: () => void
}

export const Toast = ({ message, onClose }: ToastProps) => {
  useEffect(() => {
    if (!message) {
      return undefined
    }

    const timer = window.setTimeout(onClose, 1800)
    return () => window.clearTimeout(timer)
  }, [message, onClose])

  if (!message) {
    return null
  }

  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white shadow-lg shadow-gray-900/15">
      {message}
    </div>
  )
}
