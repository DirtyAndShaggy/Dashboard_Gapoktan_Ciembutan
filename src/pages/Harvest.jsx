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
  const [varietas, setVarietas] = useState("ALL");
  const [metode, setMetode] = useState("ALL");
  const [search, setSearch] = useState("");

  /* =========================================================
     Fetch data (same pattern as Analysis page)
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
     Derived filter options
  ========================================================= */
  const years = useMemo(() => {
    return [...new Set(panen.map(p => Number(p.tahun)))]
      .filter(Boolean)
      .sort((a, b) => b - a);
  }, [panen]);

  const varietasList = useMemo(() => {
    return [...new Set(panen.map(p => p.varietas))].filter(Boolean);
  }, [panen]);

  /* =========================================================
     Filtered data
  ========================================================= */
  const filteredPanen = useMemo(() => {
    return panen.filter(p => {
      if (tahun !== "ALL" && Number(p.tahun) !== Number(tahun)) return false;
      if (musim !== "ALL" && p.musim !== musim) return false;
      if (varietas !== "ALL" && p.varietas !== varietas) return false;
      if (metode !== "ALL" && p.metode !== metode) return false;

      if (search) {
        const q = search.toLowerCase();
        return (
          p.nama?.toLowerCase().includes(q) ||
          p.noHp?.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [panen, tahun, musim, varietas, metode, search]);

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

  if (!panen.length) {
    return (
      <div className="p-6 text-gray-500">
        No harvest data available.
      </div>
    );
  }

  /* =========================================================
     Render
  ========================================================= */
  return (
    <div className="p-6 space-y-6">
      {/* ================= Header ================= */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          Hasil Panen
        </h1>
        <p className="text-sm text-gray-500">
          Laporan detail hasil panen seluruh petani di desa
        </p>
      </div>

      {/* ================= Filters ================= */}
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-gray-700">
          Filter Data
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {/* Tahun */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Tahun</label>
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
          </div>

          {/* Musim */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Musim</label>
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

          {/* Varietas */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Varietas</label>
            <select
              className="border rounded px-3 py-2 text-sm"
              value={varietas}
              onChange={e => setVarietas(e.target.value)}
            >
              <option value="ALL">Semua Varietas</option>
              {varietasList.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>

          {/* Metode */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Metode</label>
            <select
              className="border rounded px-3 py-2 text-sm"
              value={metode}
              onChange={e => setMetode(e.target.value)}
            >
              <option value="ALL">Semua Metode</option>
              <option value="Organik">Organik</option>
              <option value="Non-Organik">Non Organik</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:col-span-1">
            <label className="text-xs text-gray-500 mb-1">Cari</label>
            <input
              type="text"
              placeholder="Nama / No HP"
              className="border rounded px-3 py-2 text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ================= Table ================= */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">No HP</th>
              <th className="px-4 py-3 text-left">Luas Lahan (Ha)</th>
              <th className="px-4 py-3 text-left">Metode</th>
              <th className="px-4 py-3 text-left">Varietas</th>
              <th className="px-4 py-3 text-right">Hasil (Kg)</th>
              <th className="px-4 py-3 text-left">Musim</th>
              <th className="px-4 py-3 text-left">Tahun</th>
            </tr>
          </thead>
          <tbody>
            {filteredPanen.map((p, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{p.nama}</td>
                <td className="px-4 py-2">{p.noHp}</td>
                <td className="px-4 py-2">{p.luasLahan}</td>
                <td className="px-4 py-2">{p.metode}</td>
                <td className="px-4 py-2">{p.varietas}</td>
                <td className="px-4 py-2 text-right font-medium">
                  {p.hasilPanen}
                </td>
                <td className="px-4 py-2">{p.musim}</td>
                <td className="px-4 py-2">{p.tahun}</td>
              </tr>
            ))}

            {!filteredPanen.length && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
