import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// 1. Definisi tipe untuk produk
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

// 2. Definisi tipe state untuk Redux
interface ProductState {
  products: Product[]; // Menyimpan daftar produk
  loading: boolean; // Menyimpan status loading saat fetching data
  error: string | null; // Menyimpan pesan error jika gagal fetch data
}

// 3. State awal untuk produk
const initialState: ProductState = {
  products: [], // Awalnya daftar produk kosong
  loading: false, // Tidak sedang loading
  error: null, // Tidak ada error
};

// 4. Thunk function untuk mengambil data produk dari FakeStore API
export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts', // Nama aksi untuk Redux
  async () => {
    const response = await fetch('https://fakestoreapi.com/products'); // Fetch data dari API
    return response.json(); // Konversi response ke JSON dan return
  }
);

// 5. Membuat Redux slice untuk produk
const productSlice = createSlice({
  name: 'products', // Nama slice
  initialState, // Menggunakan state awal yang telah didefinisikan
  reducers: {}, // Tidak ada reducer biasa karena semua aksi menggunakan async thunk
  extraReducers: (builder) => {
    builder
      // 6. Jika fetchProducts masih dalam proses, ubah loading menjadi true
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true; // Tampilkan indikator loading
        state.error = null; // Reset error jika ada sebelumnya
      })
      // 7. Jika fetchProducts berhasil, simpan data ke state
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload; // Simpan daftar produk
          state.loading = false; // Matikan indikator loading
        }
      )
      // 8. Jika fetchProducts gagal, simpan error message ke state
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false; // Matikan indikator loading
        state.error = action.error.message || 'Failed to fetch products'; // Simpan pesan error
      });
  },
});

// 9. Export reducer untuk digunakan di store Redux
export default productSlice.reducer;

/*
Penjelasan Singkat
createSlice: Membuat Redux slice untuk state produk.
createAsyncThunk: Digunakan untuk melakukan fetch data dari API secara asynchronous.
extraReducers: Menangani tiga kondisi:
pending → Loading aktif saat fetching data.
fulfilled → Data berhasil di-fetch dan disimpan di state.
rejected → Error jika gagal fetch data.

*/
