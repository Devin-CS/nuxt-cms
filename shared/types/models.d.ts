// Shared model types for the application

// Mega Menu types used in app layouts/components

export interface MegaMenuChild {
  label: string
  path: string
  description?: string
}

export interface MegaMenuItem {
  label: string
  path: string
  children: MegaMenuChild[]
}

export type MegaMenu = MegaMenuItem[]
