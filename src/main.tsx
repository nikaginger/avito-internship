import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import './shared/styles/reset.scss';
import App from '@app/App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
