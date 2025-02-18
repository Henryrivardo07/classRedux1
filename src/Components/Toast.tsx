import React from 'react';
import styles from '../Components/Styles/Toast.module.scss'; // Styling untuk Toast
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from 'react-icons/fa';

// Tipe untuk properti Toast
export type ToastProps = {
  variant: 'success' | 'error' | 'info'; // Jenis toast: sukses, error, info
  message: string; // Pesan yang ditampilkan dalam toast
  onClose: () => void; // Fungsi untuk menutup toast
};

// Fungsi untuk mendapatkan ikon berdasarkan tipe toast
const getIcon = (variant: ToastProps['variant']) => {
  switch (variant) {
    case 'success':
      return <FaCheckCircle color='green' size={24} />;
    case 'error':
      return <FaExclamationCircle color='red' size={24} />;
    case 'info':
      return <FaInfoCircle color='blue' size={24} />;
    default:
      return null;
  }
};

export const Toast: React.FC<ToastProps> = ({ variant, message, onClose }) => {
  return (
    <div className={`${styles.toast} ${styles[variant]}`} onClick={onClose}>
      <div className={styles.icon}>{getIcon(variant)}</div>
      <div className={styles.message}>{message}</div>
    </div>
  );
};
