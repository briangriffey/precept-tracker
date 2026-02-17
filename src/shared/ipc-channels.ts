export const IPC = {
  // Entries
  ENTRY_GET_OR_CREATE: 'entry:getOrCreate',
  ENTRY_GET: 'entry:get',
  ENTRY_LIST: 'entry:list',
  ENTRY_SEARCH: 'entry:search',
  // Precept responses
  RESPONSE_UPSERT: 'response:upsert',
  // Meditation
  MEDITATION_UPSERT: 'meditation:upsert',
  // Weekly
  WEEKLY_GET: 'weekly:get',
  WEEKLY_UPSERT: 'weekly:upsert',
  WEEKLY_SUMMARY: 'weekly:summary',
  // Prompts
  PROMPT_LIST: 'prompt:list',
  PROMPT_CREATE: 'prompt:create',
  PROMPT_UPDATE: 'prompt:update',
  PROMPT_DELETE: 'prompt:delete',
  // Settings
  SETTING_GET: 'setting:get',
  SETTING_SET: 'setting:set',
  SETTING_GET_ALL: 'setting:getAll',
  // Stats
  STATS_STREAK: 'stats:streak',
  STATS_MEDITATION_TREND: 'stats:meditationTrend',
  STATS_HEATMAP: 'stats:heatmap',
  STATS_AVERAGE_RATINGS: 'stats:averageRatings',
  // Export
  EXPORT_JOURNAL: 'export:journal',
} as const
