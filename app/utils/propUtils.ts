/**
 * propUtils
 *
 * Shared helpers for normalizing common component props used by editors.
 */

/**
 * Normalize a size value into a CSS length string.
 *
 * Behavior tailored for Nuxt Studio editors:
 * - number -> '<n>px'
 * - numeric string like '24' or '1.5' -> '<n>px'
 * - unitized string like '24px', '1.5rem', '2em', '50%' -> returned as-is (trimmed)
 * - empty string or undefined/null -> undefined
 */
export const toCssSize = (v?: number | string | null): string | undefined => {
  if (v === undefined || v === null) return undefined
  if (typeof v === 'number') return `${v}px`
  const s = String(v).trim()
  if (s === '') return undefined
  if (/^-?\d+(\.\d+)?$/.test(s)) return `${s}px`
  return s
}

/**
 * Map gap tokens to pixel values.
 */
const GAP_TOKEN_MAP = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '48px'
} as const

type GapToken = keyof typeof GAP_TOKEN_MAP

/**
 * Convert a gap token to a CSS size string.
 * Falls back to 'md' when value is undefined or invalid.
 */
export const toGapSize = (g?: GapToken | null): string => {
  const key = (g ?? 'md') as string
  return (GAP_TOKEN_MAP as Record<string, string>)[key] ?? GAP_TOKEN_MAP.md
}
