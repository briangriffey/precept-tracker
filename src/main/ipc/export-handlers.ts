import { ipcMain, dialog, BrowserWindow } from 'electron'
import { writeFile } from 'node:fs/promises'
import { IPC } from '../../shared/ipc-channels'
import type { ExportRequest, ExportResult, DailyEntry } from '../../shared/types'
import { getDatabase } from '../database'
import { getResponsesForEntry } from '../database/repositories/precept-responses'
import { getMeditation } from '../database/repositories/meditation'

// Precept metadata for human-readable export
const preceptVows: Record<number, { group: string; vow: string }> = {
  1: { group: 'The Three Refuges', vow: 'I take refuge in Buddha' },
  2: { group: 'The Three Refuges', vow: 'I take refuge in Dharma' },
  3: { group: 'The Three Refuges', vow: 'I take refuge in Sangha' },
  4: { group: 'The Three Pure Precepts', vow: 'I vow to refrain from all evil' },
  5: { group: 'The Three Pure Precepts', vow: 'I vow to do all good' },
  6: { group: 'The Three Pure Precepts', vow: 'I vow to save all beings' },
  7: { group: 'The Ten Grave Precepts', vow: 'I vow not to kill' },
  8: { group: 'The Ten Grave Precepts', vow: 'I vow not to steal' },
  9: { group: 'The Ten Grave Precepts', vow: 'I vow not to misuse sexuality' },
  10: { group: 'The Ten Grave Precepts', vow: 'I vow not to lie' },
  11: { group: 'The Ten Grave Precepts', vow: 'I vow not to intoxicate self or others' },
  12: { group: 'The Ten Grave Precepts', vow: 'I vow not to speak of the faults of others' },
  13: { group: 'The Ten Grave Precepts', vow: 'I vow not to praise myself while abusing others' },
  14: { group: 'The Ten Grave Precepts', vow: 'I vow not to be possessive of anything' },
  15: { group: 'The Ten Grave Precepts', vow: 'I vow not to harbor ill will' },
  16: { group: 'The Ten Grave Precepts', vow: 'I vow not to disparage the Three Treasures' },
}

interface EntryRow {
  id: number
  date: string
  created_at: string
  updated_at: string
}

function queryEntries(request: ExportRequest): EntryRow[] {
  const db = getDatabase()

  if (request.dateRange === 'all') {
    return db
      .prepare('SELECT * FROM entries ORDER BY date DESC')
      .all() as EntryRow[]
  }

  return db
    .prepare('SELECT * FROM entries WHERE date BETWEEN ? AND ? ORDER BY date DESC')
    .all(request.startDate!, request.endDate!) as EntryRow[]
}

function buildDailyEntries(rows: EntryRow[], includeMeditation: boolean): DailyEntry[] {
  return rows.map((row) => {
    const responses = getResponsesForEntry(row.id)
    const meditation = includeMeditation
      ? getMeditation(row.id) ?? { id: 0, entryId: row.id, meditated: false, minutes: 0, notes: null, createdAt: row.created_at, updatedAt: row.updated_at }
      : { id: 0, entryId: row.id, meditated: false, minutes: 0, notes: null, createdAt: row.created_at, updatedAt: row.updated_at }

    return {
      entry: { id: row.id, date: row.date, createdAt: row.created_at, updatedAt: row.updated_at },
      responses,
      meditation,
    }
  })
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function ratingDots(rating: number): string {
  return '\u25CF'.repeat(rating) + '\u25CB'.repeat(5 - rating)
}

function toMarkdown(entries: DailyEntry[], includeMeditation: boolean): string {
  const lines: string[] = ['# Precept Tracker Journal', '']

  for (const { entry, responses, meditation } of entries) {
    lines.push(`## ${formatDate(entry.date)}`, '')

    // Group responses by precept group
    let currentGroup = ''
    for (const resp of responses) {
      const meta = preceptVows[resp.preceptNumber]
      if (!meta) continue

      if (meta.group !== currentGroup) {
        currentGroup = meta.group
        lines.push(`### ${currentGroup}`, '')
      }

      lines.push(`**${resp.preceptNumber}. ${meta.vow}**`)

      if (resp.promptText) {
        lines.push(`*Prompt: "${resp.promptText}"*`)
      }

      lines.push('')

      if (resp.response) {
        lines.push(resp.response, '')
      }

      if (resp.rating != null) {
        lines.push(`Rating: ${ratingDots(resp.rating)} (${resp.rating}/5)`, '')
      }
    }

    if (includeMeditation) {
      lines.push('### Meditation')
      lines.push(`- Meditated: ${meditation.meditated ? 'Yes' : 'No'}`)
      if (meditation.meditated) {
        lines.push(`- Duration: ${meditation.minutes} minutes`)
      }
      if (meditation.notes) {
        lines.push(`- Notes: ${meditation.notes}`)
      }
      lines.push('')
    }

    lines.push('---', '')
  }

  return lines.join('\n')
}

function toJson(entries: DailyEntry[], includeMeditation: boolean): string {
  const data = {
    exportedAt: new Date().toISOString(),
    entries: entries.map(({ entry, responses, meditation }) => ({
      date: entry.date,
      responses: responses.map((r) => ({
        preceptNumber: r.preceptNumber,
        vow: preceptVows[r.preceptNumber]?.vow ?? '',
        response: r.response,
        rating: r.rating,
        promptText: r.promptText,
      })),
      ...(includeMeditation
        ? {
            meditation: {
              meditated: meditation.meditated,
              minutes: meditation.minutes,
              notes: meditation.notes,
            },
          }
        : {}),
    })),
  }

  return JSON.stringify(data, null, 2)
}

export function registerExportHandlers(): void {
  ipcMain.handle(
    IPC.EXPORT_JOURNAL,
    async (_event, request: ExportRequest): Promise<ExportResult> => {
      try {
        const rows = queryEntries(request)

        if (rows.length === 0) {
          return { success: false, error: 'No entries found for the selected date range.' }
        }

        const entries = buildDailyEntries(rows, request.includeMeditation)

        const content =
          request.format === 'markdown'
            ? toMarkdown(entries, request.includeMeditation)
            : toJson(entries, request.includeMeditation)

        const ext = request.format === 'markdown' ? 'md' : 'json'
        const filterName = request.format === 'markdown' ? 'Markdown' : 'JSON'

        const win = BrowserWindow.getFocusedWindow()
        const result = await dialog.showSaveDialog(win!, {
          title: 'Export Journal',
          defaultPath: `precept-tracker-journal.${ext}`,
          filters: [{ name: filterName, extensions: [ext] }],
        })

        if (result.canceled || !result.filePath) {
          return { success: false, error: 'Export cancelled.' }
        }

        await writeFile(result.filePath, content, 'utf-8')

        return { success: true, filePath: result.filePath, entryCount: entries.length }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error during export.'
        return { success: false, error: message }
      }
    }
  )
}
