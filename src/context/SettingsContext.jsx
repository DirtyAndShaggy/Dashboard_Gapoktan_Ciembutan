import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext(null);

const DEFAULT_SETTINGS = {
  theme: "light", // 'light' | 'dark'
  weightUnit: "kg", // 'kg' | 'ton' | 'kuintal'
  landUnit: "ha", // 'Hectare' | 'are' | 'm2'
  lastSync: null,
};

function loadSettings() {
  try {
    const raw = localStorage.getItem("settings");
    if (!raw) return DEFAULT_SETTINGS;

    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [settings.theme]);

  const value = {
    settings,

    setTheme(theme) {
      setSettings((prev) => ({ ...prev, theme }));
    },

    setWeightUnit(weightUnit) {
      setSettings((prev) => ({ ...prev, weightUnit }));
    },

    setLandUnit(landUnit) {
        setSettings((prev) => ({ ...prev, landUnit }));
    },

    updateLastSync() {
      setSettings((prev) => ({ ...prev, lastSync: new Date().toISOString() }));
    },

    resetSettings() {
      setSettings(DEFAULT_SETTINGS);
    },
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }
  return ctx;
}
