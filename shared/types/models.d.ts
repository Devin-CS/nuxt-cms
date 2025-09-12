// Shared model types for the application

export interface Menu {
  title: string
  path: string
  description?: string
  header?: boolean
  children?: Menu[]
}
