import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently crossing the "reading line"
 * (a band slightly above the middle of the viewport).
 */
export default function useScrollSpy(ids, initial = ids[0]) {
  const [active, setActive] = useState(initial)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
