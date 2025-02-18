// Mengimpor createPortal dari react-dom untuk merender dialog ke dalam portal
import { createPortal } from 'react-dom';
// Mengimpor ikon dari react-icons yang akan digunakan berdasarkan tipe dialog
import {
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationCircle,
} from 'react-icons/fa';
// Mengimpor styles untuk styling komponen
import styles from '../Components/Styles/Dialog.module.scss';
// Mengimpor React dan useCallback hook dari React
import React, { useCallback } from 'react';
// Mengimpor komponen Button untuk digunakan dalam dialog
import Button from '@/Components/ui/Button';

// Tipe untuk properti Dialog yang digunakan dalam komponen
export type DialogProps = {
  // Variasi dari dialog: 'success', 'info', atau 'danger'
  variant: 'success' | 'info' | 'danger';
  // Judul dialog yang akan ditampilkan
  title: string;
  // Pesan yang akan ditampilkan di dalam dialog
  message: string;
  // Judul tombol sekunder (misalnya Cancel)
  secondaryButtonTitle: string;
  // Judul tombol utama (misalnya Confirm), opsional
  primaryButtonTitle?: string;
  // Fungsi untuk menangani klik pada tombol sekunder
  onSelectSecondaryButton: () => void;
  // Fungsi untuk menangani klik pada tombol utama, opsional
  onSelectPrimaryButton?: () => void;
  // Status apakah form sedang submit atau tidak
  isSubmitting?: boolean;
  // Fungsi untuk konfirmasi aksi, opsional
  onConfirm?: () => void;
  // Fungsi untuk membatalkan aksi, opsional
  onCancel?: () => void;
};

// Fungsi untuk mendapatkan ikon yang sesuai berdasarkan tipe dialog
const getIcon = (type: DialogProps['variant']) => {
  // Memilih ikon yang sesuai dengan tipe dialog (danger, success, info)
  switch (type) {
    case 'danger':
      return <FaExclamationCircle color='red' size={48} />; // Ikon untuk tipe 'danger'
    case 'success':
      return <FaCheckCircle color='green' size={48} />; // Ikon untuk tipe 'success'
    case 'info':
      return <FaInfoCircle color='blue' size={48} />; // Ikon untuk tipe 'info'
    default: {
      // Jika tipe dialog tidak sesuai dengan yang diharapkan, akan muncul error
      const _exhaustiveCheck: never = type;
      throw new Error(`Unhandled type: ${_exhaustiveCheck}`);
    }
  }
};

// Komponen Dialog yang digunakan untuk menampilkan dialog dengan konten tertentu
export const Dialog: React.FC<DialogProps> = ({
  variant, // Menentukan tipe dialog ('success', 'info', atau 'danger')
  title, // Judul dialog
  message, // Pesan yang ditampilkan dalam dialog
  secondaryButtonTitle, // Judul tombol sekunder (misalnya "Cancel")
  primaryButtonTitle, // Judul tombol utama (misalnya "Confirm")
  onSelectSecondaryButton, // Fungsi yang dijalankan saat tombol sekunder diklik
  onSelectPrimaryButton, // Fungsi yang dijalankan saat tombol utama diklik
  isSubmitting, // Status apakah form sedang dalam proses submit atau tidak
  // Fungsi yang dipanggil untuk pembatalan
}) => {
  // Fungsi untuk menangani klik tombol utama (primary button)
  const handleOnClickSubmitButton = useCallback(() => {
    if (!onSelectPrimaryButton) return; // Jika onSelectPrimaryButton tidak ada, jangan lakukan apa-apa
    onSelectPrimaryButton(); // Jika ada, jalankan fungsi yang diberikan saat tombol diklik
  }, [onSelectPrimaryButton]); // Hanya memanggil kembali jika onSelectPrimaryButton berubah

  // Menggunakan createPortal untuk merender komponen Dialog di luar root DOM (ke dalam elemen portal)
  return createPortal(
    <div className={styles.dialogWrapper}>
      <div className={styles.dialog}>
        <div className={styles.body}>
          <div className={styles.variantIcon}>
            <div className={styles.icon}>
              {getIcon(variant)} {/* Menampilkan ikon sesuai tipe dialog */}
            </div>
          </div>
          <div className={styles.content}>
            <p className={styles.title}>{title}</p>{' '}
            {/* Menampilkan judul dialog */}
            <p className={styles.description}>{message}</p>{' '}
            {/* Menampilkan pesan dialog */}
          </div>
        </div>
        <div className={styles.footer}>
          {/* Menampilkan tombol utama jika tipe dialog bukan 'success' dan jika primaryButtonTitle ada */}
          {variant !== 'success' && primaryButtonTitle && (
            <Button
              color={variant === 'danger' ? 'danger' : 'primary'} // Menentukan warna tombol sesuai dengan tipe dialog
              isLoading={isSubmitting} // Jika isSubmitting true, tombol akan menunjukkan loading state
              onClick={handleOnClickSubmitButton} // Menangani klik pada tombol utama
            >
              {primaryButtonTitle} {/* Menampilkan teks tombol utama */}
            </Button>
          )}
          {/* Tombol sekunder (Cancel) yang akan selalu ada */}
          <Button
            color='secondary' // Tombol ini selalu berwarna sekunder
            disabled={isSubmitting} // Jika isSubmitting true, tombol akan dinonaktifkan
            onClick={onSelectSecondaryButton} // Menangani klik pada tombol sekunder
          >
            {secondaryButtonTitle} {/* Menampilkan teks tombol sekunder */}
          </Button>
        </div>
      </div>
    </div>,
    document.getElementById('portal') as HTMLElement // Menggunakan portal untuk merender dialog di luar root DOM
  );
};

/*
Penjelasan Tambahan:
DialogProps mendefinisikan properti yang diperlukan oleh komponen Dialog, termasuk tipe dialog, judul, pesan, tombol, dan fungsi-fungsi untuk menangani klik pada tombol.

getIcon adalah fungsi pembantu yang mengembalikan ikon sesuai dengan tipe dialog (danger, success, atau info). Ikon ini akan digunakan untuk menggambarkan jenis pesan dalam dialog.

createPortal digunakan untuk merender dialog ke dalam elemen DOM yang terpisah, biasanya ke dalam elemen dengan id portal yang ditempatkan di luar root DOM aplikasi. Ini memastikan bahwa dialog bisa ditampilkan di atas elemen lainnya dan tidak terpengaruh oleh struktur DOM yang ada.

Button adalah komponen yang digunakan untuk tombol dalam dialog. Tombol utama dan sekunder memiliki aksi yang berbeda tergantung pada apakah pengguna memilih untuk mengonfirmasi atau membatalkan.

useCallback digunakan untuk membungkus fungsi yang menangani klik tombol utama agar fungsi tersebut tidak diciptakan ulang setiap kali komponen dirender ulang. Ini dapat meningkatkan kinerja aplikasi dengan mencegah render yang tidak perlu.
*/
