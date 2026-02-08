import { useEffect, useState, useMemo } from "react";
import FinanceBanner from "@/components/banner/FinanceBanner";
import TotalPanenByVarietasChart from "@/components/charts/dasbor/TotalPanenByVarietasChart";
import ProduktivitasByVarietasChart from "@/components/charts/dasbor/ProduktivitasByVarietasChart";
import HarvestTrendChart from "@/components/charts/dasbor/HarvestTrendChart";
import { useSettings } from "@/context/SettingsContext";
import { formatWeightLabel } from "@/utils/unitFormatter";
import { getDashboardData } from "@/lib/dashboardCache";

import {
  getTotalPanenByVarietas,
  getAvgProduktivitasByVarietas,
  getTrendByVarietas
} from "@/utils/panenStats";

export default function Dashboard() {
  const { settings } = useSettings();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= Fetch data ================= */
  useEffect(() => {
    let mounted = true;

    getDashboardData()
      .then(data => {
        if (!mounted) return;
        setDashboardData(data);
        setLoading(false);
      })
      .catch(err => {
        if (!mounted) return;
        setError(err.message || "Failed to load analysis data");
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  /* ================= Derived data (HOOKS MUST BE HERE) ================= */
  const panen = dashboardData?.panen ?? [];
  const banner = dashboardData?.banner;
  const keuangan = dashboardData?.keuangan;

  const years = useMemo(() => {
    return [...new Set(
      panen.map(p => Number(p.tahun)).filter(Boolean)
    )];
  }, [panen]);

  const currentYear = useMemo(
    () => (years.length ? Math.max(...years) : null),
    [years]
  );

  const totalPanenData = useMemo(
    () =>
      currentYear
        ? getTotalPanenByVarietas(panen, currentYear)
        : [],
    [panen, currentYear]
  );

  const produktivitasData = useMemo(
    () =>
      currentYear
        ? getAvgProduktivitasByVarietas(panen, currentYear)
        : [],
    [panen, currentYear]
  );

  const trendData = useMemo(
    () => getTrendByVarietas(panen),
    [panen]
  );

  /* ================= States ================= */
  if (loading) {
    return (
      <div className="p-6 text-gray-500 dark:text-gray-400">
        Loading dashboard data…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600 dark:text-red-400">
        Failed to load dashboard data: {error}
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-6 text-gray-500 dark:text-gray-400">
        No dashboard data available.
      </div>
    );
  }

  /* ================= Render ================= */
  return (
    <div className="p-6 space-y-6">
      <FinanceBanner banner={banner} keuangan={keuangan} />

      <div className="rounded-xl p-4 border bg-indigo-50 dark:bg-indigo-900/30">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Ringkasan Panen Desa
        </p>
        <h2 className="text-lg font-semibold">
          Tahun {currentYear || "-"}
        </h2>
        <p className="text-xs mt-1">
          Data seluruh kelompok tani
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl p-4 border bg-white dark:bg-gray-800">
          <h3 className="font-semibold">
            Total Panen per Varietas
          </h3>
          <p className="text-xs mb-3">
            ({formatWeightLabel(settings.weightUnit)})
          </p>
          <TotalPanenByVarietasChart data={totalPanenData} />
        </div>

        <div className="rounded-xl p-4 border bg-white dark:bg-gray-800">
          <h3 className="font-semibold">
            Rata-rata Produktivitas Varietas
          </h3>
          <p className="text-xs mb-3">
            ({formatWeightLabel(settings.weightUnit)}/ha)
          </p>
          <ProduktivitasByVarietasChart data={produktivitasData} />
        </div>
      </div>

      <div className="rounded-xl p-4 border bg-white dark:bg-gray-800">
        <h3 className="font-semibold">
          Tren Panen Tahunan per Varietas
        </h3>
        <p className="text-xs mb-3">
          ({formatWeightLabel(settings.weightUnit)})
        </p>
        <HarvestTrendChart data={trendData} />
      </div>
    </div>
  );
}
