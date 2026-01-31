import { Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis.jsx";
import Harvest from "./pages/Harvest";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      {/* Routes that use the dashboard layout */}
      <Route
        path="/"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />

      <Route
        path="/analysis"
        element={
          <DashboardLayout>
            <Analysis />
          </DashboardLayout>
        }
      />

      <Route
        path="/harvest"
        element={
          <DashboardLayout>
            <Harvest />
          </DashboardLayout>
        }
      />

      <Route
        path="/calendar"
        element={
          <DashboardLayout>
            <Calendar />
          </DashboardLayout>
        }
      />

      <Route
        path="/settings"
        element={
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}
