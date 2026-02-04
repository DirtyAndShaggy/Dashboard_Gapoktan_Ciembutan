import { useEffect, useState } from "react";
import FinanceBanner from "@/components/banner/FinanceBanner";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  fetch("https://script.google.com/macros/s/AKfycbzE3jVybeiMFm23WAJcvPGu8Q23rdnzNwVkpFI3CTfACgGowF45slDyK5AFgTkiY8lI/exec")
    .then(res => {
      if (!res.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      return res.json();
    })
    .then(json => {
      setDashboardData(json);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setError(err.message);
      setLoading(false);
    });
}, []);


  /* ----------------------------
     Loading & error states
  ---------------------------- */
  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading dashboard data…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Failed to load dashboard data: {error}
      </div>
    );
  }

  /* ----------------------------
     Main render
  ---------------------------- */
  return (
    <div className="p-6 space-y-6">
      {/* Finance Banner */}
      <FinanceBanner
        banner={dashboardData.banner}
        keuangan={dashboardData.keuangan}
      />

      {/* 
        Other dashboard sections go here later:
        - charts (from dashboardData.panen)
        - tables
        - filters
      */}
    </div>
  );
}
