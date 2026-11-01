import { useEffect, useState } from 'react'

/** True on devices with a mouse / trackpad (hover + fine pointer). Used to gate cursor & tilt effects. */
export default function useFinePointer() {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setFine(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [])

  return fine
}
