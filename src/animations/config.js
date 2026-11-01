// Shared motion language — every section pulls from here so timing stays consistent.
export const ease = [0.16, 1, 0.3, 1] // expo-out, same feel as the original portfolio
export const springSoft = { type: 'spring', stiffness: 160, damping: 20, mass: 0.6 }
export const springTilt = { stiffness: 180, damping: 16, mass: 0.4 }

export const viewportOnce = { once: true, amount: 0.2, margin: '0px 0px -8% 0px' }

export const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease } },
}

export const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease } },
}

export const slideRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease } },
}

export const stagger = (gap = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
})

// Word-by-word masked headline reveal
export const wordMask = {
  hidden: { y: '115%', rotate: 3 },
  show: { y: '0%', rotate: 0, transition: { duration: 0.9, ease } },
}

// 3D letter flip used by the hero wordmark
export const letterFlip = {
  hidden: { opacity: 0, rotateX: -95, y: 40 },
  show: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 1, ease } },
}
