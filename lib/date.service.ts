/** If the scolar year is begin (1st august) the date is expired for the next year otherwise it's the current year
 *
 * @example
 * If we are in november 2024, the expired year is 2025
 * If we are in february 2025, the expired year is 2025
 */
export function getExpiredYear(): number {
  const now = new Date()
  const actualMonth = now.getMonth()
  const actualYear = now.getFullYear()

  return actualMonth < 7 ? actualYear : actualYear + 1
}

/** If we are after the 1st september of the expiredYear, the email is expired */
export function isExpired(expireYear: number): boolean {
  const now = new Date()
  const actualMonth = now.getMonth()
  const actualYear = now.getFullYear()

  if (actualYear > expireYear) {
    return true
  }

  if (actualYear < expireYear) {
    return false
  }

  return actualMonth >= 8
}

export function getCurrentScholarYear(): string {
  const now = new Date()
  const actualMonth = now.getMonth()
  const actualYear = now.getFullYear()

  if (actualMonth <= 8) {
    return `${actualYear - 1}-${actualYear}`
  }

  return `${actualYear}-${actualYear + 1}`
}
