import { useState } from "react";

// ===== Logo =====
import Logo from "../assets/logo/logo-ciembutan-transparent.png";

// ===== Navigation icons =====
import DashboardIcon from "../assets/icons/command.png";
import AnalysisIcon from "../assets/icons/bar-chart.png";
import HarvestIcon from "../assets/icons/feather.png";
import CalendarIcon from "../assets/icons/calendar.png";
import SettingsIcon from "../assets/icons/slack.png";
import PancakeIcon from "../assets/icons/menu.png";
import CloseIcon from "../assets/icons/x.png";

function NavItem({ icon, label, active }) {
  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl
        cursor-pointer select-none
        transition-colors duration-150   // FIX: limit transition work
        ${active ? "bg-white/30" : "hover:bg-white/20"}
      `}
    >
      <img
        src={icon}
        alt={label}
        className="w-5 h-5 pointer-events-none"
      />
      <span className="text-white text-sm font-medium font-ui">
        {label}
      </span>
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* =================================================
          MOBILE TOP BAR (sidebar closed)
         ================================================= */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-primary h-14 flex items-center px-4">
        {/* Pancake button */}
        <button
          onClick={() => setOpen(true)}
          className="cursor-pointer"
        >
          <img
            src={PancakeIcon}
            alt="Open menu"
            className="w-6 h-6 pointer-events-none"
          />
        </button>

        {/* Centered logo */}
        <div className="flex-1 flex justify-center items-center gap-2 pointer-events-none">
          <img
            src={Logo}
            alt="GAPOKTAN"
            className="w-8 h-8 object-contain"
          />
          <span className="text-gold font-brand font-bold text-sm">
            GAPOKTAN
          </span>
        </div>
      </header>

      {/* Push content below mobile header */}
      <div className="h-14 md:hidden" />

      {/* =====================
          Overlay (mobile)
         ===================== */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden cursor-default"
          onClick={() => setOpen(false)}
        />
      )}

      {/* =====================
          Sidebar panel
         ===================== */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          w-64 min-h-screen bg-primary flex flex-col p-5
          transform transition-transform duration-300 ease-out
          will-change-transform        // FIX: smoother animation
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden self-end mb-4 cursor-pointer"
        >
          <img
            src={CloseIcon}
            alt="Close menu"
            className="w-5 h-5 pointer-events-none"
          />
        </button>

        {/* Logo (desktop & sidebar) */}
        <div className="flex items-center gap-3 mb-10 select-none">
          <img
            src={Logo}
            alt="GAPOKTAN"
            className="w-20 h-20 object-contain pointer-events-none"
          />
          <div>
            <h1 className="text-lg font-bold text-gold leading-tight font-brand">
              GAPOKTAN
            </h1>
            <p className="text-xs text-white tracking-wide font-brandSub">
              KKN CIEMBUTAN
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          <NavItem icon={DashboardIcon} label="Dasbor" active />
          <NavItem icon={AnalysisIcon} label="Analisis" />
          <NavItem icon={HarvestIcon} label="Hasil panen" />
          <NavItem icon={CalendarIcon} label="Kalender" />
          <NavItem icon={SettingsIcon} label="Pengaturan" />
        </nav>
      </aside>
    </>
  );
}
