import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#111111',
          color: '#ffffff',
          border: '1px solid #2E2E2E',
        },
        success: {
          iconTheme: {
            primary: '#0B63F6',
            secondary: '#ffffff',
          },
        },
        error: {
          iconTheme: {
            primary: '#F59E0B',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
};

export default Toast;