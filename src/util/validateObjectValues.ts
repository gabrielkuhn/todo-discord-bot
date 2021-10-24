export const validateObjectValues = (object: object): boolean => {
  return Object.values(object).every(Boolean)
}
