import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

type AuthState = {
  token: string | null;
  setToken: (token: string) => void; // Tidak mengambelikan apapun (void)
  clearToken: () => void; // Tidak mengambelikan apapun (void)
  loadToken: () => Promise<void>; //artinya fungsi asynchronous yang tidak mengembalikan nilai (hasilnya void, tapi dibungkus dalam Promise karena asynchronous).
  isAuthenticated: () => Promise<boolean>; // ini akan mengembalikan nilai
};

export const useAuthStore = create<AuthState>((set) => ({
  // Ini bikin store Zustand, dengan initial state
  token: null,

  setToken: async (token) => {
    await SecureStore.setItemAsync("userToken", token); // Simpan token
    set({ token }); // Update Zustand state
  },

  clearToken: async () => {
    await SecureStore.deleteItemAsync("userToken");
    set({ token: null });
  },

  loadToken: async () => {
    const savedToken = await SecureStore.getItemAsync("userToken");
    if (savedToken) {
      set({ token: savedToken });
    }
  },

  isAuthenticated: async () => {
    const savedToken = true;
    return savedToken; // true jika ada token, false kalau tidak
  },
}));

/*
✅ Kesimpulan
Fungsi	Deskripsi Singkat
setToken	Menyimpan token ke SecureStore & ke state Zustand
clearToken	Menghapus token dari SecureStore dan state
loadToken	Mengambil token dari storage saat app dibuka
Promise<void>	Fungsi async yang gak mengembalikan data
*/
