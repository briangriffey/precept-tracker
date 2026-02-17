/**
 * Deterministic prompt selection based on date + precept number.
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

export function getPromptForDay(
  preceptNumber: number,
  date: string,
  prompts: string[],
  previousPrompt?: string
): string {
  if (prompts.length === 0) return ''
  if (prompts.length === 1) return prompts[0]

  const hash = hashString(`${date}:${preceptNumber}`)
  let index = hash % prompts.length

  if (prompts[index] === previousPrompt) {
    index = (index + 1) % prompts.length
  }

  return prompts[index]
}

export function getNextPrompt(
  currentPrompt: string,
  prompts: string[]
): string {
  if (prompts.length <= 1) return prompts[0] ?? ''
  const currentIndex = prompts.indexOf(currentPrompt)
  if (currentIndex === -1) return prompts[0]
  return prompts[(currentIndex + 1) % prompts.length]
}
