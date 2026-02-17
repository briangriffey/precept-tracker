import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/Button'
import { Toggle } from '../ui/Toggle'
import { Card } from '../ui/Card'
import { api } from '../../lib/data/api'
import type { ExportFormat, ExportResult } from '../../../shared/types'

interface ExportDialogProps {
  open: boolean
  onClose: () => void
}

export function ExportDialog({ open, onClose }: ExportDialogProps) {
  const [dateRange, setDateRange] = useState<'all' | 'custom'>('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [format, setFormat] = useState<ExportFormat>('markdown')
  const [includeMeditation, setIncludeMeditation] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [result, setResult] = useState<ExportResult | null>(null)

  const handleExport = async () => {
    setExporting(true)
    setResult(null)

    try {
      const res = await api.export.journal({
        dateRange,
        startDate: dateRange === 'custom' ? startDate : undefined,
        endDate: dateRange === 'custom' ? endDate : undefined,
        format,
        includeMeditation,
      })
      setResult(res)
      if (res.success) {
        setTimeout(() => {
          onClose()
          setResult(null)
        }, 2000)
      }
    } catch {
      setResult({ success: false, error: 'An unexpected error occurred.' })
    } finally {
      setExporting(false)
    }
  }

  const canExport = dateRange === 'all' || (startDate && endDate)

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  }

  const dialogStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '28rem',
    padding: 'var(--spacing-xl)',
  }

  const titleStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-xl)',
    fontWeight: 600,
    color: 'var(--color-text)',
    margin: 0,
    marginBottom: 'var(--spacing-lg)',
  }

  const sectionStyle: React.CSSProperties = {
    marginBottom: 'var(--spacing-lg)',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
    marginBottom: 'var(--spacing-sm)',
    display: 'block',
  }

  const radioGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-sm)',
  }

  const radioLabelStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text)',
    cursor: 'pointer',
  }

  const dateInputStyle: React.CSSProperties = {
    padding: '0.375rem 0.5rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text)',
    fontSize: 'var(--font-size-sm)',
  }

  const dateRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    marginTop: 'var(--spacing-xs)',
    marginLeft: 'var(--spacing-lg)',
  }

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 'var(--spacing-sm)',
    marginTop: 'var(--spacing-lg)',
  }

  const feedbackStyle: React.CSSProperties = {
    marginTop: 'var(--spacing-sm)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-sm)',
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          style={overlayStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
          >
            <Card style={dialogStyle}>
              <h2 style={titleStyle}>Export Journal</h2>

              {/* Date Range */}
              <div style={sectionStyle}>
                <span style={labelStyle}>Date range</span>
                <div style={radioGroupStyle}>
                  <label style={radioLabelStyle}>
                    <input
                      type="radio"
                      name="dateRange"
                      checked={dateRange === 'all'}
                      onChange={() => setDateRange('all')}
                    />
                    All entries
                  </label>
                  <label style={radioLabelStyle}>
                    <input
                      type="radio"
                      name="dateRange"
                      checked={dateRange === 'custom'}
                      onChange={() => setDateRange('custom')}
                    />
                    Custom range
                  </label>
                  {dateRange === 'custom' && (
                    <div style={dateRowStyle}>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={dateInputStyle}
                      />
                      <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>to</span>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={dateInputStyle}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Format */}
              <div style={sectionStyle}>
                <span style={labelStyle}>Format</span>
                <div style={radioGroupStyle}>
                  <label style={radioLabelStyle}>
                    <input
                      type="radio"
                      name="format"
                      checked={format === 'markdown'}
                      onChange={() => setFormat('markdown')}
                    />
                    Markdown (.md)
                  </label>
                  <label style={radioLabelStyle}>
                    <input
                      type="radio"
                      name="format"
                      checked={format === 'json'}
                      onChange={() => setFormat('json')}
                    />
                    JSON (.json)
                  </label>
                </div>
              </div>

              {/* Meditation toggle */}
              <div style={sectionStyle}>
                <Toggle
                  checked={includeMeditation}
                  onChange={setIncludeMeditation}
                  label="Include meditation data"
                />
              </div>

              {/* Feedback */}
              {result && (
                <div
                  style={{
                    ...feedbackStyle,
                    backgroundColor: result.success
                      ? 'var(--color-success-bg)'
                      : 'var(--color-error-bg)',
                    color: result.success
                      ? 'var(--color-success)'
                      : 'var(--color-error)',
                  }}
                >
                  {result.success
                    ? `Exported ${result.entryCount} ${result.entryCount === 1 ? 'entry' : 'entries'} successfully.`
                    : result.error}
                </div>
              )}

              {/* Actions */}
              <div style={actionsStyle}>
                <Button variant="secondary" onClick={onClose} disabled={exporting}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleExport}
                  disabled={!canExport || exporting}
                >
                  {exporting ? 'Exporting...' : 'Export'}
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
