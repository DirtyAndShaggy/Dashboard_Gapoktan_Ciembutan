import { useEffect, useMemo, useState } from "react";

export default function Harvest() {
  /* =========================================================
     State
  ========================================================= */
  const [panen, setPanen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tahun, setTahun] = useState("ALL");
  const [musim, setMusim] = useState("ALL");
  const [kelompokTani, setKelompokTani] = useState("ALL");

  /* =========================================================
     Fetch data
  ========================================================= */
  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbzE3jVybeiMFm23WAJcvPGu8Q23rdnzNwVkpFI3CTfACgGowF45slDyK5AFgTkiY8lI/exec"
    )
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch harvest data");
        return res.json();
      })
      .then(json => {
        setPanen(json.panen || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  /* =========================================================
     Derived filters
  ========================================================= */
  const years = [...new Set(panen.map(p => Number(p.tahun)))]
    .filter(Boolean)
    .sort((a, b) => b - a);

  const groups = [...new Set(panen.map(p => p.kelompokTani))];

  /* =========================================================
     Filtered data
  ========================================================= */
  const filteredPanen = useMemo(() => {
    return panen.filter(p => {
      if (tahun !== "ALL" && Number(p.tahun) !== Number(tahun)) return false;
      if (musim !== "ALL" && p.musim !== musim) return false;
      if (kelompokTani !== "ALL" && p.kelompokTani !== kelompokTani)
        return false;
      return true;
    });
  }, [panen, tahun, musim, kelompokTani]);

  /* =========================================================
     States
  ========================================================= */
  if (loading) {
    return <div className="p-6 text-gray-500">Loading harvest data…</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Failed to load harvest data: {error}
      </div>
    );
  }

  /* =========================================================
     Render
  ========================================================= */
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* ================= Header ================= */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-gray-800">
          Hasil Panen
        </h1>
        <p className="text-sm text-gray-500">
          Laporan detail hasil panen petani
        </p>
      </div>

      {/* ================= Filters ================= */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            className="border rounded px-3 py-2 text-sm"
            value={kelompokTani}
            onChange={e => setKelompokTani(e.target.value)}
          >
            <option value="ALL">Semua Kelompok</option>
            {groups.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <select
            className="border rounded px-3 py-2 text-sm"
            value={tahun}
            onChange={e => setTahun(e.target.value)}
          >
            <option value="ALL">Semua Tahun</option>
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <select
            className="border rounded px-3 py-2 text-sm"
            value={musim}
            onChange={e => setMusim(e.target.value)}
          >
            <option value="ALL">Semua Musim</option>
            <option value="MT1">MT1 (Rendeng)</option>
            <option value="MT2">MT2 (Gadu)</option>
            <option value="MT3">MT3 (Kemarau)</option>
          </select>
        </div>
      </div>

      {/* ================= Mobile Cards ================= */}
      <div className="sm:hidden space-y-3">
        {filteredPanen.map((p, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {p.nama}
                </h3>
                <p className="text-xs text-gray-500">
                  {p.kelompokTani}
                </p>
              </div>
              <span className="text-gray-400">⋮</span>
            </div>

            <div className="space-y-1 text-sm">
              <Row label="No HP" value={p.noHp} />
              <Row label="Luas Lahan" value={`${p.luasHa} Ha`} />
              <Row label="Metode" value={formatValue(p.metode)} />
              <Row label="Varietas" value={formatValue(p.varietas)} />
              <Row
                label="Hasil Panen"
                value={`${p.hasilKg} Kg`}
                strong
              />
              <Row
                label="Musim / Tahun"
                value={`${p.musim} · ${p.tahun}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ================= Desktop Table ================= */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">Kelompok</th>
              <th className="px-4 py-3 text-left">No HP</th>
              <th className="px-4 py-3 text-left">Luas (Ha)</th>
              <th className="px-4 py-3 text-left">Metode</th>
              <th className="px-4 py-3 text-left">Varietas</th>
              <th className="px-4 py-3 text-right">Hasil (Ton)</th>
              <th className="px-4 py-3 text-left">Musim</th>
              <th className="px-4 py-3 text-left">Tahun</th>
            </tr>
          </thead>
          <tbody>
            {filteredPanen.map((p, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{p.nama}</td>
                <td className="px-4 py-2">{p.kelompokTani}</td>
                <td className="px-4 py-2">{p.noHp}</td>
                <td className="px-4 py-2">{p.luasHa}</td>
                <td className="px-4 py-2">{p.metode}</td>
                <td className="px-4 py-2">{p.varietas}</td>
                <td className="px-4 py-2 text-right font-medium">
                  {p.hasilKg}
                </td>
                <td className="px-4 py-2">{p.musim}</td>
                <td className="px-4 py-2">{p.tahun}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================
   Helpers
========================================================= */
function formatValue(value) {
  if (!value) return "-";

  return String(value)
    .replace(/_/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase());
}

/* =========================================================
   Helper row for mobile card
========================================================= */
function Row({ label, value, strong }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className={strong ? "font-medium text-gray-900" : "text-gray-800"}>
        {value}
      </span>
    </div>
  );
}
