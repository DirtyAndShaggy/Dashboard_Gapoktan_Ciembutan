import { useSettings } from "@/context/SettingsContext";
import { QRCodeSVG } from "qrcode.react";

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
    </div>
  );
}
