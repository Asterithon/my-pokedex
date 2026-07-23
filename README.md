# Pokédex Mobile App ⚡📱

Aplikasi Pokédex interaktif berkinerja tinggi berbasis **React Native**, **Expo SDK 54**, dan **Expo Router v6** yang terhubung langsung ke [PokéAPI](https://pokeapi.co/).

---

## 🌟 Fitur Utama (Phase 1, 2, & 3 Completed)

1. **Performant Infinite Scroll & Pagination (Phase 1)**
   - Menggunakan `<FlatList>` React Native dengan pemanggilan data bertahap (*paginated API requests* offset/limit).
   - *Automatic Image Caching* menggunakan `expo-image` untuk mempercepat pemuatan sprite tanpa *lag*.
   - Fitur *Pull-to-Refresh* untuk memperbarui daftar data.

2. **Pencarian & Filter Tipe Elemen (Phase 2)**
   - **Search Bar Interaktif**: Pencarian real-time berdasarkan nama Pokémon atau nomor ID.
   - **Filter Chip Horizontal**: Filter daftar Pokémon berdasarkan 18 tipe elemen (Fire, Water, Grass, Electric, Psychic, Dragon, dll).

3. **Halaman Detail Pokémon Komprehensif (Phase 1 & 2)**
   - **Header Hero Dinamis**: Latar belakang kartu dan header otomatis menyesuaikan warna tipe elemen utama.
   - **Artworks & Sprites**: Tampilan gambar *Official Artwork* resolusi tinggi beserta sprite tampak depan dan belakang.
   - **Informasi Species & Deskripsi**: Genus/kategori Pokémon, tinggi (meter), berat (kg), dan deskripsi Pokédex resmi.
   - **Visualisasi Base Stats Beranimasi**: Grafik *Progress Bar* untuk HP, Attack, Defense, Sp. Atk, Sp. Def, dan Speed beserta kalkulasi total stats.

4. **Arsitektur Kode Modular (Phase 3)**
   - Terstruktur rapi di folder `src/` (`components/`, `services/`, `constants/`, `types/`).

---

## 🛠️ Teknologi yang Digunakan

- **Framework**: React Native 0.81 & Expo 54
- **Router**: Expo Router v6 (File-based Routing)
- **Language**: TypeScript 5.9
- **Image Caching**: `expo-image`
- **Animations**: `react-native-reanimated` & `react-native` Layout Animations
- **Data Source**: PokéAPI REST API (`https://pokeapi.co/api/v2/`)

---

## 📁 Struktur Proyek (Modular Architecture)

```text
pokedex/
├── app/                  # Expo Router Pages
│   ├── _layout.tsx       # Stack Navigator Configuration
│   ├── index.tsx         # Main Pokédex List Screen (FlatList + Search + Filter)
│   └── details.tsx       # Detailed Pokémon View (Stats + Species + Artworks)
├── src/
│   ├── components/       # Reusable UI Components
│   │   ├── PokemonCard.tsx
│   │   ├── TypeBadge.tsx
│   │   ├── StatBar.tsx
│   │   └── SearchBar.tsx
│   ├── constants/        # App Constants & Theme Colors
│   │   └── colors.ts
│   ├── services/         # PokéAPI Service Client
│   │   └── pokeApi.ts
│   └── types/            # TypeScript Definitions
│       └── pokemon.ts
```

---

## 🚀 Panduan Menjalankan Aplikasi

1. **Install Dependensi**
   ```bash
   npm install
   ```

2. **Jalankan Development Server**
   ```bash
   npx expo start
   ```

3. **Pilih Platform**
   - Tekan `a` untuk Android Emulator / perangkat Android via Expo Go.
   - Tekan `i` untuk iOS Simulator.
   - Tekan `w` untuk menjalankan di Web Browser.
