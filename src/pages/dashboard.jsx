import { useEffect, useState } from "react";
import FinanceBanner from "@/components/banner/FinanceBanner";

import TotalPanenByVarietasChart from "@/components/charts/dasbor/TotalPanenByVarietasChart";
import ProduktivitasByVarietasChart from "@/components/charts/dasbor/ProduktivitasByVarietasChart";
import HarvestTrendChart from "@/components/charts/dasbor/HarvestTrendChart";

import {
  getTotalPanenByVarietas,
  getAvgProduktivitasByVarietas,
  getTrendByVarietas
} from "@/utils/panenStats";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= Fetch data ================= */
  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbzE3jVybeiMFm23WAJcvPGu8Q23rdnzNwVkpFI3CTfACgGowF45slDyK5AFgTkiY8lI/exec"
    )
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        return res.json();
      })
      .then(json => {
        setDashboardData(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  /* ================= States ================= */
  if (loading) {
    return <div className="p-6 text-gray-500">Loading dashboard data…</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Failed to load dashboard data: {error}
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-6 text-gray-500">
        No dashboard data available.
      </div>
    );
  }

  /* ================= Derived data ================= */
  const { panen, banner, keuangan } = dashboardData;

  // 🔥 Current year = latest year in dataset
  const years = panen
    .map(item => Number(item.tahun))
    .filter(Boolean);

  const currentYear = years.length ? Math.max(...years) : null;

  const totalPanenData = currentYear
    ? getTotalPanenByVarietas(panen, currentYear)
    : [];

  const produktivitasData = currentYear
    ? getAvgProduktivitasByVarietas(panen, currentYear)
    : [];

  const trendData = getTrendByVarietas(panen);

  /* ================= Render ================= */
  return (
    <div className="p-6 space-y-6">
      {/* ================= Banner ================= */}
      <FinanceBanner banner={banner} keuangan={keuangan} />

      {/* ================= Dashboard Context ================= */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
        <p className="text-sm text-indigo-600">
          Ringkasan Panen Desa
        </p>
        <h2 className="text-lg font-semibold text-indigo-900">
          Tahun {currentYear || "-"}
        </h2>
        <p className="text-xs text-indigo-700 mt-1">
          Data seluruh kelompok tani
        </p>
      </div>

      {/* ================= Main Charts ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Total harvest */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800">
            Total Panen per Varietas
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            Akumulasi hasil panen seluruh desa (kg)
          </p>

          <TotalPanenByVarietasChart data={totalPanenData} />
        </div>

        {/* Productivity */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-800">
            Rata-rata Produktivitas Varietas
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            Hasil panen per hektar lahan (kg/ha)
          </p>

          <ProduktivitasByVarietasChart data={produktivitasData} />
        </div>
      </div>

      {/* ================= Trend Chart ================= */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-gray-800">
          Tren Panen Tahunan per Varietas
        </h3>
        <p className="text-xs text-gray-500 mb-3">
          Perkembangan total hasil panen dari waktu ke waktu (kg)
        </p>

        <HarvestTrendChart data={trendData} />
      </div>
    </div>
  );
}
