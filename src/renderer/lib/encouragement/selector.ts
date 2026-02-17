import {
  dailyGreetings,
  completionMessages,
  partialCompletionMessages,
  streakMilestones,
} from './messages'

const TOTAL_PRECEPTS = 16

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash + char) | 0
  }
  return Math.abs(hash)
}

/**
 * Select a daily greeting. Deterministic per date so the same greeting
 * shows all day but rotates across days.
 */
export function getDailyGreeting(date: string): string {
  const hash = hashString(`greeting:${date}`)
  return dailyGreetings[hash % dailyGreetings.length]
}

/**
 * Select a completion or partial-completion message based on how many
 * precepts the user reflected on today.
 */
export function getCompletionMessage(
  reflectedCount: number,
  totalCount: number = TOTAL_PRECEPTS
): string {
  const pool =
    reflectedCount >= totalCount
      ? completionMessages
      : partialCompletionMessages

  const hash = hashString(`completion:${reflectedCount}:${totalCount}`)
  return pool[hash % pool.length]
}

/**
 * Check whether the current streak matches a milestone and return its
 * message. Returns `null` if no milestone matches.
 */
export function getStreakMilestoneMessage(
  currentStreak: number
): string | null {
  const milestone = streakMilestones.find((m) => m.days === currentStreak)
  return milestone?.message ?? null
}

/**
 * Settings key used to track which streak milestones have already been
 * shown so we don't re-display them.
 */
export const MILESTONE_SHOWN_KEY = 'shown_milestones'

/**
 * Parse the comma-separated list of previously shown milestone day-counts
 * from the settings value.
 */
export function parseShownMilestones(value: string | null): Set<number> {
  if (!value) return new Set()
  return new Set(
    value
      .split(',')
      .map(Number)
      .filter((n) => !Number.isNaN(n))
  )
}

/**
 * Serialize shown milestones back to a comma-separated settings string.
 */
export function serializeShownMilestones(shown: Set<number>): string {
  return Array.from(shown).sort((a, b) => a - b).join(',')
}
