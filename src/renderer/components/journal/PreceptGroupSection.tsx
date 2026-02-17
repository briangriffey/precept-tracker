import { Collapsible } from '../ui'
import type { PreceptGroupDefinition } from '../../lib/precepts'
import type { PreceptResponse } from '../../../shared/types'
import { PreceptCard } from './PreceptCard'

interface PreceptGroupSectionProps {
  group: PreceptGroupDefinition
  date: string
  responses: PreceptResponse[]
  defaultOpen?: boolean
  onUpdate: (
    preceptNumber: number,
    response: string | null,
    rating: number | null,
    promptText: string
  ) => void
}

export function PreceptGroupSection({
  group,
  date,
  responses,
  defaultOpen = false,
  onUpdate,
}: PreceptGroupSectionProps) {
  const descriptionStyle: React.CSSProperties = {
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-secondary)',
    marginBottom: 'var(--spacing-md)',
    lineHeight: 1.5,
  }

  return (
    <div style={{ marginBottom: 'var(--spacing-md)' }}>
      <Collapsible title={group.name} defaultOpen={defaultOpen}>
        <p style={descriptionStyle}>{group.description}</p>
        {group.precepts.map((precept) => (
          <PreceptCard
            key={precept.number}
            precept={precept}
            date={date}
            existingResponse={responses.find((r) => r.preceptNumber === precept.number)}
            onUpdate={onUpdate}
          />
        ))}
      </Collapsible>
    </div>
  )
}
