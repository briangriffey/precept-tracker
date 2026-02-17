import { useNavigate } from 'react-router-dom'
import { PageTransition } from '../components/layout/PageTransition'
import { PromptManager } from '../components/prompts/PromptManager'
import { Button } from '../components/ui/Button'

export function PromptsPage() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-lg)',
          }}
        >
          <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
            &larr; Settings
          </Button>
          <h1
            style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 600,
              color: 'var(--color-text)',
              margin: 0,
            }}
          >
            Customize Prompts
          </h1>
        </div>
        <PromptManager />
      </div>
    </PageTransition>
  )
}
