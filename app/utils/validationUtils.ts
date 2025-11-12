export const isValidEmail = (value: string): boolean => {
  // Simple RFC5322-ish pattern suitable for UI validation
  return /.+@.+\..+/.test(value)
}
