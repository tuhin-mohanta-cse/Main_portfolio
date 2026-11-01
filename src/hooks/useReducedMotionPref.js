import { useReducedMotion } from 'framer-motion'

/** Thin wrapper so components import one consistent hook. */
export default function useReducedMotionPref() {
  return Boolean(useReducedMotion())
}
