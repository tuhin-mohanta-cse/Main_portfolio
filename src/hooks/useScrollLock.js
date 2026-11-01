import { useEffect } from 'react'

export default function useScrollLock(locked) {
  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const root = document.documentElement
    const prev = root.style.overflow
    if (locked) root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = prev
    }
  }, [locked])
}
