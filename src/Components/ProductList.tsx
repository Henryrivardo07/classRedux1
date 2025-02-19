// Mengimpor React, hooks dan fungsi-fungsi yang diperlukan
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchProducts } from '@/Redux/productSlice'; // Aksi untuk mengambil data produk
import { addToCart } from '@/Redux/cartSlice'; // Aksi untuk menambahkan produk ke keranjang
import { RootState } from '@/Redux/store'; // RootState digunakan untuk tipe data Redux store
import { useAppDispatch } from '@/Redux/hooks'; // Hook custom untuk dispatch Redux action
import { useDialog } from '@/Components/DialogContent'; // Mengimpor hook useDialog untuk mengelola dialog
import { useToast } from '@/Context/ToastContext'; // Mengimpor hook useToast untuk menampilkan toast
import styles from './Styles/ProductList.module.scss'; // Mengimpor stylesheet untuk styling komponen

const ProductList: React.FC = () => {
  // Mendapatkan fungsi dispatch dari Redux hooks
  const dispatch = useAppDispatch();

  // Menggunakan hook useDialog untuk mengelola dialog konfirmasi
  const { setDialog } = useDialog();

  // Mengambil data produk, status loading, dan error dari Redux store
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products // Mengambil data produk dari Redux store
  );

  // Mendapatkan fungsi addToast dari useToast
  const { addToast } = useToast();

  // Hook useEffect untuk mengambil data produk ketika komponen pertama kali dimuat
  useEffect(() => {
    dispatch(fetchProducts()); // Memanggil fetchProducts untuk mengambil produk
  }, [dispatch]);

  // Fungsi untuk menangani klik tombol "Add to Cart"
  const handleAddToCart = (product: any, title: string) => {
    // Menampilkan dialog konfirmasi sebelum menambahkan produk ke keranjang
    setDialog({
      variant: 'info', // Jenis dialog, dalam hal ini 'info'
      title: 'Remove TO Cart', // Judul dialog
      message: `Are you sure you want to add ${product.title} to your cart?`, // Pesan dialog
      primaryButtonTitle: 'Yes, Add', // Teks tombol utama (Yes, Add)
      secondaryButtonTitle: 'Cancel', // Teks tombol sekunder (Cancel)
      onSelectPrimaryButton: () => {
        // Ketika memilih tombol "Yes, Add", akan menambah produk ke keranjang
        dispatch(addToCart(product)); // Dispatch action addToCart
        // Menampilkan toast setelah produk berhasil ditambahkan
        addToast({
          onClose: () => console.log(`${title} toast closed!`), // Menambahkan onClose handler
          variant: 'success', // Jenis toast, success
          message: `${product.title} has been added to your cart!`, // Pesan toast
        });
        setDialog(null); // Menutup dialog setelah aksi selesai
      },
      onSelectSecondaryButton: () => {
        // Ketika memilih tombol "Cancel", dialog ditutup tanpa melakukan aksi
        setDialog(null);
      },
    });
  };

  // Menampilkan status loading atau error jika terjadi
  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;

  // Menampilkan daftar produk jika data produk sudah ada
  return (
    <div className={styles.container}>
      {/* Memetakan setiap produk untuk ditampilkan dalam bentuk card */}
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <img
            src={product.image}
            alt={product.title}
            className={styles.image} // Styling gambar produk
          />
          <p className={styles.title}>
            {product.title} -{' '}
            <span className={styles.price}>${product.price}</span>
          </p>
          <button
            onClick={() => handleAddToCart(product)} // Menambahkan produk ke keranjang ketika tombol diklik
            className={styles.button}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

/* 
Penjelasan Kode:
Impor Dependensi:

useEffect, useSelector, dan useDispatch adalah hooks dari React dan Redux yang digunakan untuk menangani state dan side effect.
fetchProducts adalah aksi Redux yang digunakan untuk mengambil data produk dari API atau server.
addToCart adalah aksi Redux untuk menambahkan produk ke dalam keranjang belanja.
useDialog adalah custom hook untuk menampilkan dialog konfirmasi saat menambahkan produk ke keranjang.
styles adalah modul SCSS untuk styling komponen ProductList.
State dan Hook:

useAppDispatch digunakan untuk mendapatkan fungsi dispatch dari Redux store yang memungkinkan kita untuk memicu aksi-aksi Redux.
useDialog digunakan untuk mengontrol dialog konfirmasi (seperti menampilkan pesan konfirmasi sebelum menambahkan produk ke keranjang).
useSelector digunakan untuk mendapatkan data produk, status loading, dan error dari Redux store.
Mengambil Data Produk dengan useEffect:

Ketika komponen pertama kali dimuat, useEffect akan dipanggil untuk mendispatch fetchProducts() yang bertanggung jawab untuk mengambil data produk dari API atau server.
Menangani Aksi "Add to Cart":

Fungsi handleAddToCart akan dipanggil ketika tombol "Add to Cart" pada produk diklik.
Dialog konfirmasi akan muncul, bertanya apakah pengguna yakin ingin menambahkan produk ke keranjang.
Jika pengguna memilih "Yes, Add", produk akan ditambahkan ke keranjang menggunakan dispatch(addToCart(product)), dan dialog akan ditutup dengan setDialog(null).
Jika pengguna memilih "Cancel", dialog hanya akan ditutup tanpa ada perubahan.
Menampilkan Status:

Jika data masih dalam proses dimuat (loading), akan muncul teks "Loading...".
Jika ada error saat mengambil data produk, akan muncul teks error.
Setelah data produk tersedia, produk akan ditampilkan dalam bentuk kartu dengan gambar, nama, harga, dan tombol "Add to Cart".
Styling:

Kode ini juga mengimpor stylesheet (ProductList.module.scss) untuk memberi gaya pada elemen-elemen dalam komponen seperti gambar produk, tombol, dan card.
Penjelasan Fungsional:
Dialog Konfirmasi: Sebelum menambahkan produk ke keranjang, pengguna akan diberikan pilihan untuk mengonfirmasi tindakan tersebut melalui dialog konfirmasi. Jika pengguna setuju, produk akan ditambahkan, jika tidak, dialog akan ditutup tanpa aksi.
Pengelolaan Produk: Menggunakan Redux untuk pengelolaan produk yang dimuat dari API dan untuk menambahkan produk ke dalam keranjang.
*/
