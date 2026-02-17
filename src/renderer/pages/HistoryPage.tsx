import { PageTransition } from '../components/layout/PageTransition'
import { HistoryHeader } from '../components/history/HistoryHeader'
import { CalendarView } from '../components/history/CalendarView'
import { ListView } from '../components/history/ListView'
import { useEntryHistory } from '../hooks/useEntryHistory'

export function HistoryPage() {
  const {
    entries,
    entryDetails,
    loading,
    searchQuery,
    setSearchQuery,
    dateRange,
    setDateRange,
    view,
    setView,
  } = useEntryHistory()

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-xl)',
    maxWidth: '48rem',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 500,
    color: 'var(--color-text)',
    marginBottom: 'var(--spacing-xs)',
  }

  const loadingStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    padding: 'var(--spacing-2xl)',
    color: 'var(--color-text-muted)',
  }

  return (
    <PageTransition>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Journal History</h1>

        <HistoryHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          view={view}
          onViewChange={setView}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />

        {loading ? (
          <div style={loadingStyle}>Loading entries...</div>
        ) : view === 'calendar' ? (
          <CalendarView
            entryDetails={entryDetails}
            onMonthChange={setDateRange}
          />
        ) : (
          <ListView
            entries={entries}
            entryDetails={entryDetails}
            searchQuery={searchQuery}
          />
        )}
      </div>
    </PageTransition>
  )
}
