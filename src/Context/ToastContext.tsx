import React, { createContext, useState, useContext, useCallback } from 'react';
import { Toast, ToastProps } from '../Components/Toast';

type ToastContextType = {
  addToast: (toast: ToastProps) => void; // Fungsi untuk menambahkan toast
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  // Menambahkan toast baru
  const addToast = useCallback((toast: ToastProps) => {
    setToasts((prevToasts) => [...prevToasts, toast]);

    // Menutup toast setelah 4 detik
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t !== toast));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {toasts.map((toast, index) => (
        <Toast
          key={index}
          variant={toast.variant}
          message={toast.message}
          onClose={() =>
            setToasts((prevToasts) => prevToasts.filter((t) => t !== toast))
          }
        />
      ))}
      {children}
    </ToastContext.Provider>
  );
};

// Hook untuk menggunakan ToastContext
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
