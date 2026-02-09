import { useSettings } from "@/context/SettingsContext";
import { QRCodeSVG } from "qrcode.react";

/* =========================
   App Version
========================= */
const APP_VERSION = "1.0.0";

export default function Settings() {
  const {
    settings,
    setTheme,
    setWeightUnit,
    setLandUnit,
    resetSettings,
  } = useSettings();

  const GOOGLE_FORM_URL = "https://forms.gle/JefNZxqt745QUfjN7";

  return (
    <div className="space-y-6 max-w-3xl">

      {/* =========================
          Appearance
      ========================= */}
      <section className="
        rounded-xl p-4 border
        bg-gray-50 border-gray-200
        dark:bg-gray-800 dark:border-gray-700
      ">
        <h2 className="text-lg font-semibold mb-3">Tampilan</h2>

        <div className="flex items-center justify-between">
          <span className="text-sm">Tema</span>
          <select
            value={settings.theme}
            onChange={(e) => setTheme(e.target.value)}
            className="
              border rounded px-2 py-1 text-sm
              bg-white text-gray-900 border-gray-300
              dark:bg-gray-700 dark:text-white dark:border-gray-600
            "
          >
            <option value="light">Mode Terang</option>
            <option value="dark">Mode Gelap</option>
          </select>
        </div>
      </section>

      {/* =========================
          Units & Measurement
      ========================= */}
      <section className="
        rounded-xl p-4 border
        bg-gray-50 border-gray-200
        dark:bg-gray-800 dark:border-gray-700
      ">
        <h2 className="text-lg font-semibold mb-3">
          Satuan Unit Pengukuran
        </h2>

        <div className="flex items-center justify-between">
          <span className="text-sm">Unit Berat</span>
          <select
            value={settings.weightUnit}
            onChange={(e) => setWeightUnit(e.target.value)}
            className="
              border rounded px-2 py-1 text-sm
              bg-white text-gray-900 border-gray-300
              dark:bg-gray-700 dark:text-white dark:border-gray-600
            "
          >
            <option value="kg">Kilogram (Kg)</option>
            <option value="ton">Ton</option>
            <option value="kuintal">Kuintal</option>
          </select>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-sm">Unit Luas Lahan</span>
          <select
            value={settings.landUnit}
            onChange={(e) => setLandUnit(e.target.value)}
            className="
              border rounded px-2 py-1 text-sm
              bg-white text-gray-900 border-gray-300
              dark:bg-gray-700 dark:text-white dark:border-gray-600
            "
          >
            <option value="ha">Hektar (Ha)</option>
            <option value="are">Are</option>
            <option value="m2">Meter Persegi (m²)</option>
          </select>
        </div>
      </section>

      {/* =========================
          Data & Integration
      ========================= */}
      <section className="
        rounded-xl p-4 border
        bg-gray-50 border-gray-200
        dark:bg-gray-800 dark:border-gray-700
      ">
        <h2 className="text-lg font-semibold mb-3">Input Data</h2>

        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="bg-white p-2 rounded-lg dark:bg-gray-700">
            <QRCodeSVG value={GOOGLE_FORM_URL} size={180} />
          </div>

          <div className="space-y-2">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              Buka Google Form
            </a>

            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
              Gunakan form ini untuk input data pertanian desa dengan mudah
              melalui perangkat apa saja.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          Danger Zone
      ========================= */}
      <section className="
        rounded-xl p-4 border
        border-red-300 bg-red-50
        dark:border-red-500/40 dark:bg-red-900/20
      ">
        <h2 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-3">
          Danger Zone
        </h2>

        <button
          onClick={resetSettings}
          className="
            px-4 py-2 rounded text-sm font-medium
            bg-red-600 text-white
            hover:bg-red-700
          "
        >
          Reset Local Settings
        </button>

        <p className="text-xs mt-2 text-red-600 dark:text-red-400">
          Hanya menghapus preferensi lokal (tema & satuan).
        </p>
      </section>

      {/* =========================
          About / Credits
      ========================= */}
      <section className="
        rounded-xl p-4 border
        bg-gray-50 border-gray-200
        dark:bg-gray-800 dark:border-gray-700
      ">
        <h2 className="text-lg font-semibold mb-3">
          Tentang Aplikasi
        </h2>

        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">

          {/* Info */}
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200">
              Informasi Sistem
            </h3>
            <p className="mt-1">
              Sistem Informasi Pertanian Desa
            </p>
            <p>
              Versi: {APP_VERSION}
            </p>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200">
              Deskripsi
            </h3>
            <p className="mt-1">
              Aplikasi ini dikembangkan sebagai bagian dari kegiatan pendidikan
              dan pengabdian kepada masyarakat (KKN) Universitas Sebelas April, serta untuk mendukung
              sistem administrasi dan pengelolaan data pertanian desa Cikurubuk.
            </p>
          </div>

          {/* Developer */}
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200">
              Developer:
            </h3>
            <p className="mt-1">
              Anggara Gustika
            </p>
            <p className="mt-1">
              Andika Bangkit Pratama
            </p>
            <p className="mt-1">
              Rafly Maulana Yusuf
            </p>
            <p>
              © {new Date().getFullYear()}
            </p>
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200">
              Sumber Data & Integrasi
            </h3>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Google Sheets (Data Pertanian)</li>
              <li>Google Forms (Input Data)</li>
              <li>Google Calendar (Agenda Desa)</li>
            </ul>
          </div>

          {/* Tech */}
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200">
              Teknologi
            </h3>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>React + Vite</li>
              <li>Tailwind CSS</li>
              <li>Google APIs</li>
              <li>Vercel Hosting</li>
            </ul>
          </div>

          {/* Usage */}
          <div>
            <h3 className="font-medium text-gray-800 dark:text-gray-200">
              Hak Penggunaan
            </h3>
            <p className="mt-1">
              Aplikasi ini digunakan untuk keperluan administrasi desa
              dan pengelolaan data pertanian. Tidak diperkenankan untuk
              diperjualbelikan tanpa izin resmi.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
