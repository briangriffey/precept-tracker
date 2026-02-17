import React, { useState } from 'react'
import { precepts } from '../../lib/precepts'
import { useCustomPrompts } from '../../hooks/useCustomPrompts'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export function PromptManager() {
  const [selectedPrecept, setSelectedPrecept] = useState(1)
  const {
    defaultPrompts,
    customPrompts,
    loading,
    addPrompt,
    updatePrompt,
    deletePrompt,
  } = useCustomPrompts(selectedPrecept)

  const [newPromptText, setNewPromptText] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const handleAdd = async () => {
    const trimmed = newPromptText.trim()
    if (!trimmed) return
    await addPrompt(trimmed)
    setNewPromptText('')
  }

  const handleSaveEdit = async (id: number) => {
    const trimmed = editText.trim()
    if (!trimmed) return
    await updatePrompt(id, trimmed)
    setEditingId(null)
    setEditText('')
  }

  const handleStartEdit = (id: number, currentText: string) => {
    setEditingId(id)
    setEditText(currentText)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  return (
    <div>
      {/* Precept selector */}
      <label
        htmlFor="precept-select"
        style={{
          display: 'block',
          marginBottom: 'var(--spacing-xs)',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)',
        }}
      >
        Select a precept
      </label>
      <select
        id="precept-select"
        value={selectedPrecept}
        onChange={(e) => setSelectedPrecept(Number(e.target.value))}
        style={{
          width: '100%',
          padding: 'var(--spacing-sm) var(--spacing-md)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          fontSize: 'var(--font-size-base)',
          marginBottom: 'var(--spacing-lg)',
        }}
      >
        {precepts.map((p) => (
          <option key={p.number} value={p.number}>
            {p.number}. {p.vow}
          </option>
        ))}
      </select>

      {/* Default prompts (read-only) */}
      <Card style={{ marginBottom: 'var(--spacing-lg)' }}>
        <h3
          style={{
            margin: '0 0 var(--spacing-md)',
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-text)',
          }}
        >
          Default prompts
        </h3>
        <ul
          style={{
            margin: 0,
            paddingLeft: 'var(--spacing-lg)',
            listStyle: 'disc',
          }}
        >
          {defaultPrompts.map((prompt: string, i: number) => (
            <li
              key={i}
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                marginBottom: 'var(--spacing-xs)',
              }}
            >
              {prompt}
            </li>
          ))}
        </ul>
      </Card>

      {/* Custom prompts */}
      <Card>
        <h3
          style={{
            margin: '0 0 var(--spacing-md)',
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-text)',
          }}
        >
          Your custom prompts
        </h3>

        {loading && (
          <p
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-muted)',
            }}
          >
            Loading...
          </p>
        )}

        {!loading && customPrompts.length === 0 && (
          <p
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-muted)',
              margin: '0 0 var(--spacing-md)',
            }}
          >
            No custom prompts yet. Add one below.
          </p>
        )}

        {!loading &&
          customPrompts.map((cp) => (
            <div
              key={cp.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--spacing-sm)',
                marginBottom: 'var(--spacing-sm)',
              }}
            >
              {editingId === cp.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveEdit(cp.id)
                      if (e.key === 'Escape') handleCancelEdit()
                    }}
                    style={{
                      flex: 1,
                      padding: 'var(--spacing-xs) var(--spacing-sm)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg)',
                      color: 'var(--color-text)',
                      fontSize: 'var(--font-size-sm)',
                    }}
                  />
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleSaveEdit(cp.id)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      flex: 1,
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text)',
                      lineHeight: 1.6,
                    }}
                  >
                    {cp.promptText}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleStartEdit(cp.id, cp.promptText)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deletePrompt(cp.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          ))}

        {/* Add new prompt */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--spacing-sm)',
            marginTop: 'var(--spacing-md)',
          }}
        >
          <input
            type="text"
            placeholder="Add a custom reflection prompt..."
            value={newPromptText}
            onChange={(e) => setNewPromptText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd()
            }}
            style={{
              flex: 1,
              padding: 'var(--spacing-xs) var(--spacing-sm)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
              fontSize: 'var(--font-size-sm)',
            }}
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={handleAdd}
            disabled={!newPromptText.trim()}
          >
            + Add
          </Button>
        </div>
      </Card>
    </div>
  )
}
