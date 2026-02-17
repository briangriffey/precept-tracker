interface JournalProgressProps {
  completed: number
  total: number
}

export function JournalProgress({ completed, total }: JournalProgressProps) {
  const containerStyle: React.CSSProperties = {
    marginBottom: 'var(--spacing-lg)',
  }

  const barBgStyle: React.CSSProperties = {
    height: '4px',
    backgroundColor: 'var(--color-border-light)',
    borderRadius: 'var(--radius-full)',
    overflow: 'hidden',
  }

  const barFillStyle: React.CSSProperties = {
    height: '100%',
    width: `${total > 0 ? (completed / total) * 100 : 0}%`,
    backgroundColor: 'var(--color-primary)',
    borderRadius: 'var(--radius-full)',
    transition: 'width 300ms ease',
  }

  const textStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-muted)',
    marginTop: 'var(--spacing-xs)',
  }

  return (
    <div style={containerStyle}>
      <div style={barBgStyle}>
        <div style={barFillStyle} />
      </div>
      <p style={textStyle}>
        {completed} of {total} precepts reflected on
      </p>
    </div>
  )
}
