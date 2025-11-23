import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import './shared/styles/reset.scss';
import App from '@app/App.tsx';
import { ThemeProvider } from '@shared/contexts/ThemeContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
