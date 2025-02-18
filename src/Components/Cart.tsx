import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';
import { useAppDispatch } from '@/Redux/hooks';
import { removeFromCart } from '@/Redux/cartSlice';
import { useToast } from '@/Context/ToastContext'; // Mengimpor hook useToast untuk menampilkan toast
import styles from './Styles/Cart.module.scss';

const Cart: React.FC = () => {
  // Mengambil data cartItems dari Redux store
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  // Mendapatkan fungsi dispatch dari custom hook
  const dispatch = useAppDispatch();
  // Mendapatkan fungsi addToast dari useToast
  const { addToast } = useToast();

  // Fungsi untuk menangani penghapusan item dari cart
  const handleRemoveItem = (id: string, title: string) => {
    // Menghapus item dari cart
    dispatch(removeFromCart(id));
    // Menampilkan toast setelah item dihapus
    addToast({
      variant: 'success',
      message: `${title} has been removed from your cart!`,
      onClose: () => console.log(`${title} toast closed!`), // Menambahkan onClose handler
    });
  };

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
                  onClick={() => handleRemoveItem(item.id, item.title)} // Memanggil handleRemoveItem
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
