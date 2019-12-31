export const isJSON = val => {
  try {
    JSON.parse(val)
  } catch (err) {
    return false
  }
  return true
}
