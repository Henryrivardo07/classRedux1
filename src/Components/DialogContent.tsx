// Mengimpor React dan hook yang diperlukan
import React, { createContext, useState, useContext } from 'react';
// Mengimpor komponen Dialog dan tipe DialogProps yang sudah dibuat sebelumnya
import { Dialog, DialogProps } from './Dialog';

// Tipe untuk konteks Dialog yang menyimpan fungsi setDialog
type DialogContextType = {
  // Fungsi untuk mengubah status dialog
  setDialog: (dialogProps: DialogProps | null) => void;
};

// Membuat konteks untuk Dialog dengan nilai default undefined
const DialogContext = createContext<DialogContextType | undefined>(undefined);

// Komponen DialogProvider untuk membungkus aplikasi dengan konteks dialog
export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children, // children adalah komponen apapun yang dibungkus oleh DialogProvider
}) => {
  // State untuk menyimpan properti dialog yang akan ditampilkan
  const [dialogProps, setDialogProps] = useState<DialogProps | null>(null);

  // Fungsi untuk mengubah status dialog
  const setDialog = (dialogProps: DialogProps | null) => {
    setDialogProps(dialogProps); // Menyimpan properti dialog baru ke dalam state
  };

  return (
    // Menyediakan nilai untuk konteks DialogProvider yang mencakup fungsi setDialog
    <DialogContext.Provider value={{ setDialog }}>
      {/* Menampilkan Dialog jika dialogProps tidak null */}
      {dialogProps && <Dialog {...dialogProps} />}
      {/* Menampilkan children yang dibungkus, yang bisa berupa komponen apapun */}
      {children}
    </DialogContext.Provider>
  );
};

// Hook untuk menggunakan dialog di komponen lain
export const useDialog = () => {
  // Mengambil konteks dari DialogContext
  const context = useContext(DialogContext);

  // Jika konteks tidak ditemukan (misalnya jika useDialog digunakan di luar DialogProvider),
  // maka akan memunculkan error
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }

  // Mengembalikan fungsi setDialog yang dapat digunakan di komponen lain
  return context;
};
/* 
Penjelasan Setiap Bagian:
DialogContextType:

Menyatakan tipe untuk konteks yang menyimpan fungsi setDialog. Fungsi ini digunakan untuk mengubah properti dialog yang akan ditampilkan atau disembunyikan.
DialogContext:

Membuat konteks DialogContext menggunakan createContext. Kode ini menyimpan objek yang memiliki properti setDialog. Jika konteks ini tidak disediakan dengan benar, maka komponen yang mengonsumsinya akan mendapatkan error.
DialogProvider:

Komponen ini membungkus aplikasi dan menyediakan konteks untuk komponen-komponen di dalamnya, dengan mengatur nilai dari DialogContext.Provider.
State dialogProps digunakan untuk menyimpan properti yang dibutuhkan untuk menampilkan dialog.
setDialog adalah fungsi yang digunakan untuk memperbarui state dialogProps dan mengubah tampilan dialog.
Dialog akan ditampilkan hanya jika dialogProps tidak null, dengan menyebarkan properti yang ada di dalam dialogProps ke dalam komponen Dialog.
children di sini merujuk pada elemen apa saja yang dibungkus dengan DialogProvider, dan ini akan tetap ditampilkan meskipun dialog sedang aktif.
useDialog:

Hook ini digunakan untuk mengakses konteks DialogContext di dalam komponen lainnya.
Jika hook ini digunakan di luar DialogProvider, maka akan terjadi error karena konteks tidak tersedia.
Hook ini mengembalikan objek konteks yang berisi fungsi setDialog, yang dapat digunakan untuk menampilkan atau menyembunyikan dialog dari komponen lain.
Cara Penggunaan:
DialogProvider harus digunakan untuk membungkus aplikasi atau bagian aplikasi yang ingin menggunakan dialog.
useDialog bisa dipanggil di mana saja di dalam aplikasi untuk mengakses fungsi setDialog dan menampilkan dialog.
*/
