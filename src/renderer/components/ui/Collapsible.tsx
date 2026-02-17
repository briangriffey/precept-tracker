import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { animation } from '../../lib/design/tokens';

interface CollapsibleProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function Collapsible({ title, defaultOpen = false, children }: CollapsibleProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--spacing-sm) 0',
    cursor: 'pointer',
    userSelect: 'none',
    color: 'var(--color-text)',
    fontSize: 'var(--font-size-base)',
    fontWeight: 400,
    border: 'none',
    background: 'none',
    width: '100%',
    textAlign: 'left',
  };

  const chevronStyle: React.CSSProperties = {
    width: '1rem',
    height: '1rem',
    color: 'var(--color-text-muted)',
    transition: 'transform 250ms ease',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    flexShrink: 0,
  };

  return (
    <div>
      <button
        type="button"
        style={headerStyle}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <svg style={chevronStyle} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: animation.sectionExpand.duration,
              ease: [...animation.sectionExpand.ease] as [number, number, number, number],
            }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingBottom: 'var(--spacing-sm)' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
