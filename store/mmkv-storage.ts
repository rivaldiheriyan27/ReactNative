import { StateStorage } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV({
  id: "balance-storage",
});

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};

/*
🔍 Perbandingan Ringkas
Fitur	expo-secure-store	react-native-mmkv
Keamanan	🔒 Tinggi (encrypted)	❗ Rendah (kecuali manual encrypt)
Performa	🐢 Lambat	⚡ Sangat cepat
Bisa di Expo Go	✅ Ya	❌ Tidak
Cocok untuk	Token, password	Cache, state lokal, preferensi
Kompleksitas data	🔤 String saja	🧩 String, number, object
Perlu native build	❌ Tidak	✅ Ya
✅ Kesimpulan:
Gunakan expo-secure-store kalau:

Kamu butuh keamanan tinggi

Kamu pakai Expo Go

Menyimpan token atau informasi pribadi pengguna

Gunakan react-native-mmkv kalau:

Kamu butuh kecepatan dan fleksibilitas tinggi

Siap untuk build native dengan EAS atau bare workflow

Menyimpan cache, flag, preferensi pengguna
*/
