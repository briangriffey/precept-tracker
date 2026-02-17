/**
 * Deterministic prompt rotation based on date + precept number.
 * Ensures the same prompt shows all day but rotates daily.
 */

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash + char) | 0
  }
  return Math.abs(hash)
}

/**
 * Select a prompt for a given precept on a given day.
 *
 * Uses a deterministic hash of `date + preceptNumber` so the same prompt
 * shows all day but changes the next day. If the selected prompt matches
 * `previousPrompt` (yesterday's), the next one in the pool is used.
 */
export function getPromptForDay(
  preceptNumber: number,
  date: string,
  prompts: string[],
  previousPrompt?: string
): string {
  if (prompts.length === 0) {
    return ''
  }
  if (prompts.length === 1) {
    return prompts[0]
  }

  const hash = hashString(`${date}:${preceptNumber}`)
  let index = hash % prompts.length

  if (prompts[index] === previousPrompt) {
    index = (index + 1) % prompts.length
  }

  return prompts[index]
}

/**
 * Cycle to the next prompt in the pool (for the refresh button).
 * Wraps around when reaching the end.
 */
export function getNextPrompt(
  currentPrompt: string,
  prompts: string[]
): string {
  if (prompts.length <= 1) {
    return prompts[0] ?? ''
  }

  const currentIndex = prompts.indexOf(currentPrompt)
  if (currentIndex === -1) {
    return prompts[0]
  }

  return prompts[(currentIndex + 1) % prompts.length]
}
