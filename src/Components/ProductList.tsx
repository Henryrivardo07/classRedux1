// Mengimpor React Hook yang dibutuhkan
import { useEffect } from 'react';
// Mengimpor useSelector dari react-redux untuk mengambil state dari Redux store
import { useSelector } from 'react-redux';
// Mengimpor action fetchProducts dari Redux slice untuk mengambil daftar produk
import { fetchProducts } from '@/Redux/productSlice';
// Mengimpor action addToCart untuk menambahkan produk ke keranjang belanja
import { addToCart } from '@/Redux/cartSlice';
// Mengimpor tipe RootState untuk memastikan state Redux memiliki tipe yang benar
import { RootState } from '@/Redux/store';
// Mengimpor custom hook useAppDispatch untuk mengirimkan action ke Redux store
import { useAppDispatch } from '@/Redux/hooks';
// Mengimpor module SCSS untuk styling komponen
import styles from './Styles/ProductList.module.scss';

// Komponen ProductList untuk menampilkan daftar produk
const ProductList = () => {
  // Menggunakan dispatch untuk mengirimkan action ke Redux
  const dispatch = useAppDispatch();

  // Mengambil data produk, status loading, dan error dari Redux store
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  // Mengambil data produk dari API saat pertama kali komponen di-render
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Jika data masih dimuat, tampilkan pesan loading
  if (loading) return <p className={styles.loading}>Loading...</p>;
  // Jika terjadi error saat mengambil data, tampilkan pesan error
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <div className={styles.container}>
      {/* Looping melalui daftar produk dan menampilkannya dalam bentuk kartu */}
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          {/* Menampilkan gambar produk */}
          <img
            src={product.image}
            alt={product.title}
            className={styles.image}
          />
          {/* Menampilkan nama dan harga produk */}
          <p className={styles.title}>
            {product.title} -{' '}
            <span className={styles.price}>${product.price}</span>
          </p>
          {/* Tombol untuk menambahkan produk ke keranjang belanja */}
          <button
            onClick={() => dispatch(addToCart(product))}
            className={styles.button}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

// Mengekspor komponen agar bisa digunakan di bagian lain aplikasi
export default ProductList;

/*
 Penjelasan Singkat:

Menggunakan useEffect untuk mengambil data produk dari API saat komponen pertama kali dimuat.
useSelector digunakan untuk mengambil daftar produk, status loading, dan error dari Redux store.
Jika loading, tampilkan teks "Loading...".
Jika error, tampilkan teks "Error: (pesan error)".
Jika data sudah ada, tampilkan daftar produk dengan gambar, nama, harga, dan tombol "Add to Cart".
Ketika tombol "Add to Cart" ditekan, produk akan dikirim ke Redux store menggunakan dispatch(addToCart(product)).
*/
