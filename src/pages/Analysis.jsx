import { useEffect, useState } from "react";
import HarvestByFarmingMethodChart from "@/components/charts/analisis/HarvestByFarmingMethodChart";
import TotalPanenByVarietasGroupChart from "@/components/charts/analisis/TotalPanenByVarietasGroupChart";
import HarvestVarietasTrendGroupChart from "@/components/charts/analisis/HarvestVarietasTrendGroupChart";
import TotalPanenGroupCurrentYearChart from "@/components/charts/analisis/TotalPanenGroupCurrentYearChart";
import ProduktivitasGroupChart from "@/components/charts/analisis/ProduktivitasGroupChart";
import HarvestYoYComparisonChart from "@/components/charts/analisis/HarvestYoYComparisonChart";

export default function Analysis() {
  /* =========================================================
     State
     ========================================================= */
  const [panen, setPanen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
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
     Derived filter options (10-year SAFE)
     ========================================================= */
  const farmerGroups = [...new Set(panen.map(p => p.kelompokTani))];

  const years = [...new Set(panen.map(p => Number(p.tahun)))]
    .filter(Boolean)
    .sort((a, b) => b - a)
    .slice(0, 10);


  /* =========================================================
     Initialize filters once data is ready
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

  /* =========================================================
     Guard invalid year (data changes / future proof)
     ========================================================= */
  useEffect(() => {
    if (tahun && !years.includes(tahun)) {
      setTahun(years[0] ?? null);
    }
  }, [years, tahun]);

  /* =========================================================
     Loading & error states
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
     Main render
     ========================================================= */
  return (
    <div className="p-6 space-y-6">
      {/* ================= Filters ================= */}
      <div className="flex flex-wrap gap-4">
        <select
          className="border rounded px-3 py-2"
          value={kelompokTani}
          onChange={e => setKelompokTani(e.target.value)}
        >
          {farmerGroups.map(k => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2"
          value={tahun ?? ""}
          onChange={e => setTahun(Number(e.target.value))}
        >
          {years.map(y => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-2"
          value={musim}
          onChange={e => setMusim(e.target.value)}
        >
          <option value="ALL">Semua Musim</option>
          <option value="MT1">MT1 (Rendeng)</option>
          <option value="MT2">MT2 (Gadu)</option>
          <option value="MT3">MT3 (Kemarau)</option>
        </select>
      </div>

      {/* ================= Charts ================= */}
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
          musim={musim}
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

        <HarvestVarietasTrendGroupChart
          panen={panen}
          kelompokTani={kelompokTani}
        />
      </div>
    </div>
  );
}
