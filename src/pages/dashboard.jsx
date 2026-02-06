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

  /* ----------------------------
     Loading & error states
  ---------------------------- */
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

  /* ----------------------------
     Derived data (SAFE ZONE)
  ---------------------------- */
  const { panen, banner, keuangan } = dashboardData;

  const totalPanenData = getTotalPanenByVarietas(panen, banner.tahun);
  const produktivitasData = getAvgProduktivitasByVarietas(panen, banner.tahun);
  const trendData = getTrendByVarietas(panen);

  /* ----------------------------
     Main render
  ---------------------------- */
  return (
    <div className="p-6 space-y-6">
      <FinanceBanner banner={banner} keuangan={keuangan} />

      {/* Bar charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Total Panen Desa per Varietas ({banner.tahun})
          </h3>
          <TotalPanenByVarietasChart data={totalPanenData} />
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
             Rata-rata Produktivitas ({banner.tahun}) (kg/ha)
          </h3>
          <ProduktivitasByVarietasChart data={produktivitasData} />
        </div>
      </div>

      {/* Line chart */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Tren Panen Tahunan per Varietas (kg)
        </h3>
        <HarvestTrendChart data={trendData} />
      </div>

      {/* Bar Chart Current Year */}
    </div>
  );
}
