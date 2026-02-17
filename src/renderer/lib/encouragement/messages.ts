import type { StreakMilestone } from './types'

// ── Daily Greetings (shown in DailyHeader, rotating) ─────────────────────────

export const dailyGreetings: string[] = [
  'Welcome back. Today is a new opportunity to practice.',
  'Every day you show up is a day of practice.',
  "The precepts aren't about perfection. They're about paying attention.",
  "You're here. That's already the first step.",
  'A calm moment of reflection can change the texture of your whole day.',
  "The path is made by walking. Welcome to today's step.",
  'No judgment today \u2014 just honest looking.',
  'Showing up to reflect is itself a form of practice.',
  'Whatever today held, you can meet it with awareness now.',
  "This is your time. There's no rush.",
  'Begin again. That is always the practice.',
  "Awareness doesn't require perfection, only willingness.",
  "Today's reflection is a gift you give yourself.",
  'Pause. Breathe. This moment is enough.',
  "Wherever you are in your practice, that's exactly where you need to be.",
  'The precepts are a mirror, not a scorecard.',
  "Each time you return here, you're choosing awareness.",
  "Your practice is alive, even on the days it feels quiet.",
  "There is no behind in this work. There's only here.",
  "Gentleness toward yourself is where practice begins.",
  "What you notice today matters more than what you fix.",
  "Reflection isn't about getting it right. It's about looking clearly.",
  'Welcome. The fact that you care enough to be here says something real.',
  "Some days the most courageous thing is simply sitting with what's true.",
]

// ── Completion Messages (all 16 precepts reflected on) ───────────────────────

export const completionMessages: string[] = [
  "You've reflected on all sixteen precepts today. That takes real dedication.",
  'A full reflection \u2014 well done. Let the insights settle.',
  'All precepts considered. Now carry this awareness gently into tomorrow.',
  'Complete. Remember, the reflection continues in how you live the rest of the day.',
  'Sixteen precepts, one moment of stillness at a time. Beautiful work.',
  'A complete round of reflection. Let this sit with you \u2014 no need to hold it tightly.',
  'You gave every precept your attention today. That is a rare and valuable thing.',
  "All sixteen. Not because you had to, but because you chose to. That's the practice.",
  'A full reflection is a deep breath for the spirit. Well done.',
  'You touched every precept today. Let that awareness ripple outward.',
  'Complete. Whatever you wrote, whatever you noticed \u2014 it matters.',
  'Every precept met with your honest attention. That is enough.',
]

// ── Partial Completion Messages (some but not all precepts) ──────────────────

export const partialCompletionMessages: string[] = [
  "Every precept you reflect on matters. There's no need to do them all.",
  'Even reflecting on one precept is a valuable practice.',
  'You showed up today. That counts.',
  'Partial practice is still practice. Wholehearted attention to one precept goes a long way.',
  "There's wisdom in reflecting on what called to you today.",
  "You don't have to cover every precept to have a meaningful day of practice.",
  'The precepts you touched today received your care. That is real practice.',
  "Some days you go deep with a few. That's just as valuable as breadth.",
  "Trust your instincts about what needed attention today. You chose well.",
  "Whatever you reflected on today is exactly what was needed.",
  "Depth over completeness. A single honest reflection can change your day.",
  "You brought awareness to what mattered most today. That's practicing wisely.",
]

// ── Streak Milestone Messages ────────────────────────────────────────────────

export const streakMilestones: StreakMilestone[] = [
  {
    days: 3,
    message: 'Three days in a row. A habit begins with consistency like this.',
  },
  {
    days: 7,
    message: "A full week of practice. You're building something meaningful.",
  },
  {
    days: 14,
    message:
      'Two weeks of daily reflection. The precepts are becoming part of your rhythm.',
  },
  {
    days: 21,
    message:
      'Twenty-one days. What started as intention is becoming second nature.',
  },
  {
    days: 30,
    message:
      "Thirty days. This is no longer something you're trying \u2014 it's something you do.",
  },
  {
    days: 60,
    message:
      'Sixty days of practice. Your dedication speaks quietly and clearly.',
  },
  {
    days: 90,
    message:
      'Ninety days. A full season of showing up for yourself and the precepts.',
  },
  {
    days: 180,
    message:
      'Half a year of daily practice. The precepts have become a steady companion.',
  },
  {
    days: 365,
    message:
      'A year of daily practice. The precepts are woven into the rhythm of your life now.',
  },
]
