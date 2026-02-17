import { motion } from 'framer-motion';
import { animation } from '../../lib/design/tokens';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: animation.pageFade.duration,
        ease: animation.pageFade.ease,
      }}
    >
      {children}
    </motion.div>
  );
}
