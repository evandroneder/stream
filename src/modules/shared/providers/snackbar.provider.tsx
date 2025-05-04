/* eslint-disable react-refresh/only-export-components */
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { createContext, ReactNode, useContext, useState } from 'react';

type SnackbarContextType = (message: string, severity?: AlertColor) => void;

const SnackbarContext = createContext<SnackbarContextType>(() => {});

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');

  const showSnackbar = (msg: string, sev: AlertColor = 'info') => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={showSnackbar}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
          severity={severity}
          onClose={() => setOpen(false)}
          sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
