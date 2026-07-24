# Pokedex Mobile App

Aplikasi Pokedex interaktif berkinerja tinggi berbasis React Native dan Expo yang menampilkan informasi lengkap Pokemon secara real-time dari PokeAPI.

---

## Fitur Utama

1. Tampilan Grid 2 Kolom di Homepage
   - Daftar Pokemon ditampilkan secara rapi dalam bentuk 2 kolom yang simetris di layar utama.
   - Setiap kartu Pokemon memiliki warna latar belakang lembut yang disesuaikan secara otomatis dengan elemen tipe utama Pokemon tersebut.

2. Pencarian dan Filter Tipe Elemen
   - Pencarian Cepat: Pengguna dapat mencari Pokemon secara instan hanya dengan memasukkan nama atau nomor ID.
   - Penyaringan Elemen: Pengguna dapat menyaring daftar Pokemon berdasarkan tipe elemen seperti Api, Air, Rumput, Listrik, dan tipe elemen lainnya.

3. Pemuatan Data Cepat dan Transisi Halus
   - Aplikasi memuat daftar Pokemon secara bertahap sehingga aplikasi tetap ringan dan responsif saat digulirkan.
   - Gambar Pokemon dilengkapi dengan sistem penyimpanan otomatis agar gambar dapat dimuat dengan cepat tanpa hambatan.

4. Informasi Detail Pokemon Lengkap
   - Menampilkan karya seni resmi Pokemon dalam kualitas tinggi.
   - Informasi fisik seperti tinggi, berat, kemampuan, serta kategori spesies Pokemon.
   - Deskripsi singkat cerita Pokedex dan grafik statistik kemampuan dasar Pokemon seperti HP, Serangan, Pertahanan, dan Kecepatan.

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
- app/index.tsx: Main Pokedex List Screen
- app/details.tsx: Detailed Pokemon View
- src/components/PokemonCard.tsx: Card Item Component
- src/components/TypeBadge.tsx: Element Type Badge Component
- src/components/StatBar.tsx: Animated Base Stat Bar Component
- src/components/SearchBar.tsx: Search Input and Type Filter Component
- src/constants/colors.ts: Color Palette and Helper Functions
- src/services/pokeApi.ts: PokeAPI API Client
- src/types/pokemon.ts: TypeScript Definitions

---

## Panduan Menjalankan Aplikasi & Git

1. Install Dependensi
   npm install

2. Jalankan Development Server
   npx expo start

3. Pilih Platform
   - Tekan a untuk Android Emulator / perangkat Android via Expo Go.
   - Tekan i untuk iOS Simulator.
   - Tekan w untuk menjalankan di Web Browser.

4. Melakukan Push ke GitHub
   - git status
   - git add .
   - git commit -m "feat: complete pokedex app with modular structure and clean UI"
   - git push origin main
