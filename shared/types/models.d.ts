// Shared model types for the application

// Mega Menu types used in app layouts/components

export interface Menu {
  title: string
  path: string
  description?: string
  children?: Menu[]
}
