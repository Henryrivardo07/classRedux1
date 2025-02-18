// useConfirmationDialog.ts
// Mengimpor useDialog dari DialogContent untuk mengakses fungsi setDialog
import { useDialog } from '../DialogContent';

export const useConfirmationDialog = () => {
  // Mendapatkan fungsi setDialog dari useDialog yang akan digunakan untuk menampilkan dialog
  const { setDialog } = useDialog();

  // Fungsi ini akan dipanggil untuk menampilkan dialog konfirmasi
  const showConfirmationDialog = (
    message: string, // Pesan yang akan ditampilkan di dalam dialog
    onConfirm: () => void, // Fungsi yang dipanggil ketika tombol "Confirm" diklik
    onCancel: () => void // Fungsi yang dipanggil ketika tombol "Cancel" diklik
  ) => {
    // Memanggil setDialog untuk menampilkan dialog dengan parameter yang telah diatur
    setDialog({
      title: 'Confirm Action', // Judul dialog, bisa diganti sesuai kebutuhan
      message, // Menampilkan pesan yang diterima sebagai parameter
      onConfirm, // Fungsi onConfirm yang akan dipanggil saat tombol "Confirm" ditekan
      onCancel, // Fungsi onCancel yang akan dipanggil saat tombol "Cancel" ditekan
      secondaryButtonTitle: 'Cancel', // Judul tombol sekunder ("Cancel")
      primaryButtonTitle: 'Confirm', // Judul tombol utama ("Confirm")
      onSelectPrimaryButton: onConfirm, // Menentukan aksi yang dilakukan ketika tombol utama "Confirm" diklik
      onSelectSecondaryButton: onCancel, // Menentukan aksi yang dilakukan ketika tombol sekunder "Cancel" diklik
      variant: 'info', // Menentukan jenis dialog (dalam hal ini 'info', bisa diganti dengan 'success' atau 'danger')
    });
  };

  // Mengembalikan fungsi showConfirmationDialog sehingga bisa digunakan di tempat lain dalam aplikasi
  return showConfirmationDialog;
};
