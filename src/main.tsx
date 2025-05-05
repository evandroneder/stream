import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { SnackbarProvider } from './modules/shared/providers/snackbar.provider';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </StrictMode>,
);
