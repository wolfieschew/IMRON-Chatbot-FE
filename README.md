# IMRON-Chatbot Frontend (Beta V0.1)

![Product Catalog App Screenshot](https://i.postimg.cc/gjGm61xW/Screenshot-2026-07-01-120238.png)

IMRON-Chatbot adalah antarmuka pengguna (Frontend) berbasis web untuk sistem asisten cerdas (chatbot) yang dirancang untuk membantu analisis dan visualisasi data terkait sensor **E-Nose (Electronic Nose)** serta **Deteksi Objek** (seperti deteksi mahasiswa, dosen, dll.). 

Project ini dikembangkan oleh **KK-AITM Research** menggunakan **React 19** dan **Vite 7** untuk memberikan performa yang cepat dan pengalaman pengguna yang interaktif.

## Struktur Folder Proyek

```text
IMRON-FrontEnd/
├── public/                  # Aset publik (logo, favicon, dll.)
│   └── imron.png            # Avatar default IMRON-Chatbot
├── src/
│   ├── assets/              # Aset gambar & ikon internal
│   ├── components/          # Komponen UI Reusable
│   │   ├── ChatInput.jsx    # Input teks & tombol kirim pesan
│   │   ├── ChatInput.css    # Styling komponen ChatInput
│   │   ├── ChatMessage.jsx  # Gelembung pesan chat (User/Bot) beserta efek mengetik
│   │   └── ChatMessage.css  # Styling komponen ChatMessage
│   ├── services/            # Integrasi dengan API luar
│   │   └── api.js           # Konfigurasi Axios & request ke backend
│   ├── App.jsx              # Komponen utama & pengatur state percakapan
│   ├── App.css              # Styling utama layout widget chat
│   ├── index.css            # Styling global dasar
│   └── main.jsx             # Entry point React
├── index.html               # File template HTML utama
├── package.json             # Dependensi & script proyek
└── vite.config.js           # Konfigurasi Vite
```

---

## Teknologi yang Digunakan

- **Library Utama**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vite.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/) (untuk request ke backend)
- **Icons**: [React Icons / Lucide](https://react-icons.github.io/react-icons/)
- **Styling**: Vanilla CSS (kustomisasi penuh layout & animasi)

---

## Cara Instalasi & Menjalankan Proyek

Ikuti langkah-langkah berikut untuk menjalankan proyek di lingkungan lokal Anda:

### 1. Prasyarat
Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/) (versi LTS direkomendasikan) pada komputer Anda.

### 2. Instalasi Dependensi
Jalankan perintah berikut di terminal pada direktori proyek untuk mengunduh semua package yang diperlukan:
```bash
npm install
```

### 3. Menjalankan Server Pengembangan (Local Dev Server)
Untuk menjalankan aplikasi dalam mode pengembangan lokal:
```bash
npm run dev
```
Buka browser dan akses alamat yang tertera di terminal (biasanya `http://localhost:5173`).

### 4. Build untuk Produksi
Untuk mengompilasi dan mengoptimalkan aplikasi sebelum dideploy ke server produksi:
```bash
npm run build
```
Hasil kompilasi akan berada di folder `dist`.

### 5. Preview Build Produksi
Untuk menguji hasil build produksi secara lokal:
```bash
npm run preview
```

---

## Konfigurasi Backend API

Aplikasi ini mengirimkan request pertanyaan ke backend server menggunakan Axios. Anda dapat mengonfigurasi alamat IP server backend pada file:
[src/services/api.js](file:///e:/New%20Volume%20D/Project%20Magang%20Bagas/IMRON%20-%20Chatbot/front-end/IMRON-FrontEnd/src/services/api.js)

```javascript
// Ganti [IP_ADDRESS] dengan alamat server backend Anda
const API_URL = "http://[IP_ADDRESS]/api";
```

Format request payload yang dikirim ke endpoint `${API_URL}/query` adalah:
```json
{
  "question": "pertanyaan pengguna"
}
```

Format respons yang diharapkan dari server API:
```json
{
  "answer": "Jawaban dari bot",
  "sources": []
}
```

---

## Contoh Pertanyaan yang Didukung

Chatbot ini dirancang untuk menjawab queries terkait data riset, di antaranya:
1. *“Sebutkan total data dari data e-nose”*
2. *“Sebutkan total keseluruhan objek-objek deteksi yang terecord”*
3. *“Sebutkan jumlah total distribusi data e-nose yang label multiclass-nya itu sama dengan E”*
4. *“Tampilkan perbandingan total objek deteksi dengan label mahasiswa dan juga label dosen”*
5. *“Tolong tampilkan rincian total data dari masing-masing label multiclass pada data e-nose yang terecord”*

---
