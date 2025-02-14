import { configureStore } from '@reduxjs/toolkit'; // Import fungsi untuk membuat store Redux
import productReducer from './productSlice'; // Import reducer untuk produk
import cartReducer from './cartSlice'; // Import reducer untuk keranjang belanja

// Konfigurasi store Redux
const store = configureStore({
  reducer: {
    products: productReducer, // State produk dikelola oleh productReducer
    cart: cartReducer, // State keranjang belanja dikelola oleh cartReducer
  },
});

// Tipe RootState: digunakan untuk mendapatkan tipe state dari store Redux
export type RootState = ReturnType<typeof store.getState>;

// Tipe AppDispatch: digunakan untuk mendapatkan tipe dispatch dari store Redux
export type AppDispatch = typeof store.dispatch;

// Export store agar bisa digunakan di aplikasi
export default store;

/*
Penjelasan Singkat

configureStore:
Fungsi dari Redux Toolkit untuk membuat store Redux.
Menerima objek konfigurasi dengan properti reducer yang berisi semua reducer yang digunakan.

reducer:
products: Mengelola state produk (products, loading, error).
cart: Mengelola state keranjang belanja (cartItems).
RootState:

Tipe data untuk seluruh state di Redux.
Digunakan dalam useSelector untuk mendapatkan data dari store.

AppDispatch:
Tipe data untuk dispatch, digunakan dalam useDispatch.

export default store:
Store diekspor agar bisa digunakan dalam aplikasi.
*/
