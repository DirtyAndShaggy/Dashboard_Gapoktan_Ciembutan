import { useEffect, useState } from "react";

import ProduktivitasGroupChart from "@/components/charts/analisis/ProduktivitasGroupChart";
import HarvestYoYComparisonChart from "@/components/charts/analisis/HarvestYoYComparisonChart";
import TotalPanenGroupCurrentYearChart from "@/components/charts/analisis/TotalPanenGroupCurrentYearChart";
import HarvestByFarmingMethodChart from "@/components/charts/analisis/HarvestByFarmingMethodChart";
import TotalPanenByVarietasGroupChart from "@/components/charts/analisis/TotalPanenByVarietasGroupChart";
import HarvestGroupTrendChart from "@/components/charts/analisis/HarvestGroupTrendChart";

export default function Analysis() {
  /* =========================================================
     State
  ========================================================= */
  const [panen, setPanen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [kelompokTani, setKelompokTani] = useState("");
  const [tahun, setTahun] = useState(null);
  const [musim, setMusim] = useState("ALL");

  /* =========================================================
     Fetch data
  ========================================================= */
  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbzE3jVybeiMFm23WAJcvPGu8Q23rdnzNwVkpFI3CTfACgGowF45slDyK5AFgTkiY8lI/exec"
    )
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch analysis data");
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
  const farmerGroups = [...new Set(panen.map(p => p.kelompokTani))];

  const years = [...new Set(panen.map(p => Number(p.tahun)))]
    .filter(Boolean)
    .sort((a, b) => b - a)
    .slice(0, 10);

  /* =========================================================
     Init defaults
  ========================================================= */
  useEffect(() => {
    if (!panen.length) return;

    if (!kelompokTani && farmerGroups.length) {
      setKelompokTani(farmerGroups[0]);
    }

    if (!tahun && years.length) {
      setTahun(years[0]);
    }
  }, [panen, farmerGroups, years]);

  useEffect(() => {
    if (tahun && !years.includes(tahun)) {
      setTahun(years[0] ?? null);
    }
  }, [years, tahun]);

  /* =========================================================
     States
  ========================================================= */
  if (loading) {
    return <div className="p-6 text-gray-500">Loading analysis data…</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Failed to load analysis data: {error}
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
    <div className="p-6 space-y-8">
      {/* ================= Header ================= */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          Analisis Kelompok Tani
        </h1>
        <p className="text-sm text-gray-500">
          Analisis hasil panen dan produktivitas per kelompok tani
        </p>
      </div>

      {/* ================= Current Group Highlight ================= */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
        <p className="text-sm text-indigo-600 mb-1">
          Konteks Analisis
        </p>

        <h2 className="text-lg font-semibold text-indigo-900">
          {kelompokTani || "-"}
        </h2>

        <div className="mt-2 flex flex-wrap gap-4 text-sm text-indigo-800">
          <div>
            <span className="font-medium">Tahun:</span>{" "}
            {tahun ?? "-"}
          </div>

          <div>
            <span className="font-medium">Musim:</span>{" "}
            {musim === "ALL"
              ? "Semua Musim"
              : musim === "MT1"
              ? "MT1 (Rendeng)"
              : musim === "MT2"
              ? "MT2 (Gadu)"
              : "MT3 (Kemarau)"}
          </div>
        </div>
      </div>


      {/* ================= Filters ================= */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Filter Analisis
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Kelompok Tani */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">
              Kelompok Tani
            </label>
            <select
              className="border rounded px-3 py-2 text-sm"
              value={kelompokTani}
              onChange={e => setKelompokTani(e.target.value)}
            >
              {farmerGroups.map(k => (
                <option key={k} value={k}>
                 {k}
                </option>
             ))}
            </select>
          </div>

          {/* Tahun */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">
              Tahun
            </label>
            <select
              className="border rounded px-3 py-2 text-sm"
              value={tahun ?? ""}
              onChange={e => setTahun(Number(e.target.value))}
            >
              {years.map(y => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Musim */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">
              Musim Tanam
            </label>
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
      </div>
      
      {/* ================= Group Analysis ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProduktivitasGroupChart
          panen={panen}
          kelompokTani={kelompokTani}
          tahun={tahun}
          musim={musim}
        />

        <HarvestYoYComparisonChart
          panen={panen}
          kelompokTani={kelompokTani}
          tahun={tahun}
        />

        <TotalPanenGroupCurrentYearChart
          panen={panen}
          kelompokTani={kelompokTani}
          tahun={tahun}
        />

        <HarvestByFarmingMethodChart
          panen={panen}
          kelompokTani={kelompokTani}
          tahun={tahun}
          musim={musim}
        />

        <TotalPanenByVarietasGroupChart
          panen={panen}
          kelompokTani={kelompokTani}
          tahun={tahun}
          musim={musim}
        />
      </div>

      {/* ================= Comparison Section ================= */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Perbandingan Antar Kelompok Tani
        </h2>

        <HarvestGroupTrendChart panen={panen} />
      </div>
    </div>
  );
}
