export function getExpiredYear(): number {
  const now = new Date()
  const actualMonth = now.getMonth()
  const actualYear = now.getFullYear()

  return actualMonth < 7 ? actualYear : actualYear + 1
}
