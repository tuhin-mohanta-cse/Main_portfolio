import { useEffect, useRef } from 'react'
import useFinePointer from '../hooks/useFinePointer'

/**
 * The dot + trailing ring cursor from the original portfolio. Only mounted on mouse devices.
 * The ring grows over anything interactive (event delegation → no per-element listeners).
 */
export default function Cursor() {
  const fine = useFinePointer()
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    if (!fine) return undefined
    let mx = -100
    let my = -100
    let rx = -100
    let ry = -100
    let raf

    const move = (e) => {
      mx = e.clientX
      my = e.clientY
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
    }
    const loop = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }
    const over = (e) => {
      const hit = e.target.closest?.('a, button, [data-hover], input, textarea')
      ring.current?.classList.toggle('is-big', Boolean(hit))
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      cancelAnimationFrame(raf)
    }
  }, [fine])

  if (!fine) return null
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
