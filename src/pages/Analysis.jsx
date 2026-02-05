import { useEffect, useState } from "react";
import HarvestByFarmingMethodChart from "@/components/charts/HarvestByFarmingMethodChart";
import TotalPanenByVarietasGroupChart from "@/components/charts/TotalPanenByVarietasGroupChart";
import HarvestVarietasTrendGroupChart from "@/components/charts/HarvestVarietasTrendGroupChart";
import TotalPanenGroupCurrentYearChart from "@/components/charts/TotalPanenGroupCurrentYearChart";
import ProduktivitasGroupChart from "@/components/charts/ProduktivitasGroupChart";
import HarvestYoYComparisonChart from "@/components/charts/HarvestYoYComparisonChart";

export default function Analysis() {
  /* =========================================================
     State (HOOKS MUST BE AT TOP)
     ========================================================= */
  const [panen, setPanen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [kelompokTani, setKelompokTani] = useState("");
  const [tahun, setTahun] = useState(null);
  const [musim, setMusim] = useState("ALL");

  /* =========================================================
     Fetch data from Google Apps Script
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
     Derived filter options (SAFE)
     ========================================================= */
  const farmerGroups = [...new Set(panen.map(p => p.kelompokTani))];
  const years = [...new Set(panen.map(p => p.tahun))].sort((a, b) => b - a);

  /* =========================================================
     Initialize filters ONCE after data loads
     ========================================================= */
  useEffect(() => {
    if (panen.length && !kelompokTani) {
      setKelompokTani(farmerGroups[0]);
      setTahun(years[0]);
    }
  }, [panen]);

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
          value={tahun}
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
