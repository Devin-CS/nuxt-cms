// Shared model types for the application

export interface Menu {
  title: string
  path: string
  description?: string
  children?: Menu[]
}
