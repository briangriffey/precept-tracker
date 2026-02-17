import { useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

/**
 * Freezes the outlet so exit animations render the previous page content,
 * not the incoming page. The frozen value is captured once on mount via
 * useState initializer and remains stable until the component unmounts.
 */
function FrozenOutlet() {
  const currentOutlet = useOutlet();
  const [outlet] = useState(currentOutlet);
  return outlet;
}

export function ContentArea() {
  const location = useLocation();

  return (
    <main
      style={{
        flex: 1,
        overflow: 'auto',
        padding: 'var(--spacing-xl)',
      }}
    >
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
        }}
      >
        <AnimatePresence mode="wait">
          <FrozenOutlet key={location.pathname} />
        </AnimatePresence>
      </div>
    </main>
  );
}
