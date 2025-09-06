// Shared model types for the application

// Mega Menu types used in app layouts/components

export interface MegaMenuItem {
  label: string
  path: string
  description?: string
  children?: MegaMenuItem[]
}
