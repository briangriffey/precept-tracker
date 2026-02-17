import { createRoot } from 'react-dom/client';
import './lib/design/theme.css';
import './lib/design/typography.css';
import './lib/design/global.css';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
