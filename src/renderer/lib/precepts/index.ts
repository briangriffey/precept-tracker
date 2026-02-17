export type { PreceptGroup, PreceptDefinition, PreceptGroupDefinition } from './types'
export { precepts, preceptGroups } from './definitions'
export { getPromptForDay, getNextPrompt } from './prompt-rotation'

import { precepts } from './definitions'
export function getPreceptByNumber(num: number) {
  return precepts.find((p) => p.number === num)
}
