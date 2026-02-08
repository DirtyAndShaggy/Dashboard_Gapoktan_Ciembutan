🌾 Dasbor CIEMBUTAN – GAPOKTAN
Dasbor ini adalah aplikasi dashboard berbasis web untuk GAPOKTAN CIEMBUTAN yang digunakan untuk menampilkan dan menganalisis data pertanian seperti hasil panen, produktivitas lahan, musim tanam, dan perbandingan kelompok tani.
Aplikasi ini dirancang agar mudah digunakan, responsif di perangkat mobile, serta mudah dikembangkan oleh tim KKN selanjutnya.

✨ Fitur Utama
📊 Visualisasi data hasil panen dan produktivitas
📱 Responsif (desktop & mobile friendly)
🧭 Navigasi sederhana dan jelas
🌗 Siap untuk mode gelap/terang
🔄 Dukungan perubahan satuan (kg, ton, dll)
🧩 Struktur kode modular dan scalable
📋 Integrasi Google Form & Google Sheets
🔗 QR Code untuk akses input data

🛠 Stack yang Digunakan
⚛️ React (Vite)
🎨 Tailwind CSS v3
📈 Recharts (visualisasi data)
📦 Asset lokal (logo, ikon, font)
🔳 qrcode.react (QR code generator)

Rencana alur data:
Google Form → Google Sheets → Google Apps Script → Dashboard

✅ Prasyarat
Pastikan perangkat sudah terinstal:
Node.js (disarankan versi LTS)
npm (otomatis terpasang bersama Node.js)

🚀 Cara Menjalankan Proyek
1️⃣ Clone repository
git clone <repository-url>
cd dasbor-ciembutan

2️⃣ Install dependensi
npm install

🎨 Setup Tailwind CSS (PENTING)

Proyek ini menggunakan Tailwind CSS versi 3
⚠️ Tailwind v4 tidak digunakan karena tidak kompatibel dengan setup ini.

Jika Tailwind belum terpasang atau ingin setup ulang:

npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p


Pastikan file tailwind.config.js berisi:

content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
],

Dan di file CSS utama:
@tailwind base;
@tailwind components;
@tailwind utilities;

▶️ Menjalankan Aplikasi
npm run dev
Buka browser di:
http://localhost:5173

📱 Desain Responsif
Desktop: Sidebar selalu terlihat
Mobile:
Navbar horizontal di atas
Tombol menu (pancake)
Sidebar slide-in dari kiri
Nyaman digunakan di HP dan tablet

📊 Visualisasi Data
Visualisasi data menggunakan Recharts, dengan rencana grafik seperti:
Hasil panen per musim
Hasil panen per varietas padi
Produktivitas (Ton/Ha)
Perbandingan kelompok tani
Metode tanam (organik vs non-organik)
Struktur data disesuaikan dengan output Google Sheets.

🔧 Catatan Konfigurasi
Semua ikon, logo, dan font bersifat lokal
Tidak menggunakan CDN eksterna
Mudah dideploy sebagai static site
Mudah dikembangkan ke API / data real-time

🧑‍🌾 Pengguna Sasaran
Perangkat desa
GAPOKTAN / kelompok tani
Mahasiswa KKN
Pihak pendukung pertanian desa

📌 Rencana Pengembangan Selanjutnya
Sistem login (opsional)
Export data (CSV / PDF)
Hak akses pengguna
Sinkronisasi langsung Google Sheets
Mode offline sederhana

📄 Lisensi
Proyek ini dikembangkan untuk keperluan pendidikan dan pengabdian masyarakat
(KKN dan administrasi desa).
