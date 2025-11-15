export const isInternal = (href?: string) => {
  return !!href && href.startsWith('/')
}
