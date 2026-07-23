# Pokedex Mobile App

Aplikasi Pokedex interaktif berkinerja tinggi berbasis React Native, Expo SDK 54, dan Expo Router v6 yang terhubung langsung ke PokeAPI.

---

## Fitur Utama

1. Tampilan Grid 2 Kolom di Homepage
   - Layout kartu Pokedex disusun secara simetris dalam grid 2 kolom.
   - Warna latar belakang setiap kartu disesuaikan dengan warna tipe pertama Pokemon dengan tingkat transparansi/opasitas 50 persen.

2. Fitur Filter Tipe dan Pencarian Real-Time
   - Filter Tipe Elemen: Mengambil seluruh daftar Pokemon berdasarkan tipe elemen (Fire, Water, Grass, Electric, Psychic, Dragon, dan lainnya) langsung dari endpoint PokeAPI.
   - Pencarian Real-Time: Fitur pencarian cepat berdasarkan nama atau nomor ID Pokemon.

3. Performance Infinite Scroll dan Pagination
   - Menggunakan FlatList React Native dengan pemanggilan data bertahap (paginated API requests offset dan limit).
   - Automatic Image Caching menggunakan expo-image untuk mempercepat pemuatan sprite tanpa lag.
   - Fitur Pull-to-Refresh untuk memperbarui daftar data.

4. Halaman Detail Pokemon Komprehensif
   - Header Hero Dinamis: Latar belakang kartu dan header otomatis menyesuaikan warna tipe elemen utama.
   - Artworks dan Sprites: Tampilan gambar Official Artwork resolusi tinggi beserta sprite tampak depan dan belakang.
   - Informasi Species dan Deskripsi: Genus/kategori Pokemon, tinggi (meter), berat (kg), dan deskripsi Pokedex resmi.
   - Visualisasi Base Stats Beranimasi: Grafik Progress Bar untuk HP, Attack, Defense, Sp. Atk, Sp. Def, dan Speed beserta kalkulasi total stats.

5. Arsitektur Kode Modular
   - Terstruktur rapi di dalam folder src (components, services, constants, types).

---

## Teknologi yang Digunakan

- Framework: React Native 0.81 dan Expo 54
- Router: Expo Router v6 (File-based Routing)
- Language: TypeScript 5.9
- Image Caching: expo-image
- Data Source: PokeAPI REST API (https://pokeapi.co/api/v2/)

---

## Struktur Proyek

- app/_layout.tsx: Stack Navigator Configuration
- app/index.tsx: Main Pokedex List Screen (Grid 2 Kolom + Search + Type Filter)
- app/details.tsx: Detailed Pokemon View (Stats + Species + Artworks)
- src/components/PokemonCard.tsx: Card Item Component (Grid 2 Kolom, Opasitas 50 persen)
- src/components/TypeBadge.tsx: Element Type Badge Component
- src/components/StatBar.tsx: Animated Base Stat Bar Component
- src/components/SearchBar.tsx: Search Input and Type Filter Component
- src/constants/colors.ts: Color Palette and Helper Functions
- src/services/pokeApi.ts: PokeAPI API Client (List, Type Filter, Details, Species)
- src/types/pokemon.ts: TypeScript Definitions

---

## Panduan Menjalankan Aplikasi

1. Install Dependensi
   npm install

2. Jalankan Development Server
   npx expo start

3. Pilih Platform
   - Tekan a untuk Android Emulator / perangkat Android via Expo Go.
   - Tekan i untuk iOS Simulator.
   - Tekan w untuk menjalankan di Web Browser.
