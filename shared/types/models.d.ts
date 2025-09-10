// Shared model types for the application

export type BrandColors
  = 'primary'
    | 'secondary'
    | 'accent'
    | 'positive'
    | 'negative'
    | 'info'
    | 'warning'

export interface Menu {
  title: string
  path: string
  description?: string
  children?: Menu[]
}
