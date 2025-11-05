import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from './providers';
import { AppRouter } from './router';
import '@/assets/styles/globals.css';

/**
 * @entry main
 * @summary Application entry point that initializes React and renders the app
 * @type application-entry
 * @category core
 */
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>
);
