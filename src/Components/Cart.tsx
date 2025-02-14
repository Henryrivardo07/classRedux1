// Mengimpor useSelector dari react-redux untuk mengambil state dari Redux store
import { useSelector } from 'react-redux';
// Mengimpor RootState untuk mendapatkan tipe state global
import { RootState } from '@/Redux/store';
// Mengimpor useAppDispatch, yaitu custom hook untuk dispatch action dengan tipe yang sesuai
import { useAppDispatch } from '@/Redux/hooks';
// Mengimpor action removeFromCart untuk menghapus item dari keranjang
import { removeFromCart } from '@/Redux/cartSlice';
// Mengimpor module SCSS untuk styling komponen
import styles from './Styles/Cart.module.scss';

// Komponen Cart untuk menampilkan daftar produk yang ada di keranjang belanja
const Cart = () => {
  // Mengambil data cartItems dari Redux store
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  // Mendapatkan fungsi dispatch dari custom hook
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      {/* Jika cart kosong, tampilkan pesan "Cart is empty" */}
      {cartItems.length === 0 ? (
        <p className={styles.empty}>Cart is empty</p>
      ) : (
        // Jika ada item di cart, tampilkan dalam bentuk list
        <ul className={styles.list}>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.item}>
              {/* Menampilkan gambar produk */}
              <img src={item.image} alt={item.title} className={styles.image} />
              <div className={styles.info}>
                {/* Menampilkan judul dan harga produk */}
                <p className={styles.title}>
                  {item.title} -{' '}
                  <span className={styles.price}>${item.price}</span>
                </p>
                {/* Tombol untuk menghapus item dari keranjang */}
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className={styles.button}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;

/*
Penjelasan Singkat:
Komponen ini mengambil daftar produk dari Redux store (cartItems) dan menampilkannya dalam daftar.
Jika keranjang kosong, tampilkan teks "Cart is empty".
Jika ada item, setiap item ditampilkan dengan gambar, nama, harga, dan tombol untuk menghapusnya.
Saat tombol "Remove" ditekan, fungsi dispatch(removeFromCart(item.id)) akan menghapus produk dari cart.

*/
