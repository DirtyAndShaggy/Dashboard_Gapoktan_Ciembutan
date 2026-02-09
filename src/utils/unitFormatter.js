// utils/unitFormatter.js

/**
 * ==========================================
 * GLOBAL UNIT FORMATTERS (SCALABLE + SAFE)
 * ==========================================
 *
 * RULES:
 * - Raw weight stored in kg
 * - Raw land stored in ha
 * - Charts & analytics use numeric conversion only
 * - Formatting happens only at UI level
 */

/* ======================================================
   CONFIGURATION (Single Source of Truth)
====================================================== */

const WEIGHT_UNITS = {
  kg: { label: "Kg", convert: (kg) => kg },
  kuintal: { label: "Kuintal", convert: (kg) => kg / 100 },
  ton: { label: "Ton", convert: (kg) => kg / 1000 },
};

const LAND_UNITS = {
  ha: { label: "Ha", convert: (ha) => ha },
  are: { label: "Are", convert: (ha) => ha * 100 },
  m2: { label: "m²", convert: (ha) => ha * 10000 },
};

/* ======================================================
   NUMERIC CONVERSION (SAFE FOR CHARTS & ANALYTICS)
====================================================== */

function convertUnit(value, unitKey, unitMap) {
  if (value == null || isNaN(value)) return 0;

  const unit = unitMap[unitKey] || unitMap[Object.keys(unitMap)[0]];
  return unit.convert(value); // returns NUMBER
}

/* ======================================================
   GENERIC NUMBER FORMATTER (UI ONLY)
====================================================== */

export function formatNumber(value, decimals = 2) {
  if (value == null || isNaN(value)) return "0";

  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/* ======================================================
   WEIGHT (Backwards Compatible)
====================================================== */

// ✅ RETURNS NUMBER (like old version)
export function formatWeight(valueKg, unit = "kg") {
  return convertUnit(valueKg, unit, WEIGHT_UNITS);
}

// ✅ UI helper (string)
export function formatWeightDisplay(valueKg, unit = "kg", decimals = 2) {
  const value = convertUnit(valueKg, unit, WEIGHT_UNITS);
  return `${formatNumber(value, decimals)} ${formatWeightLabel(unit)}`;
}

export function formatWeightLabel(unit = "kg") {
  return WEIGHT_UNITS[unit]?.label || WEIGHT_UNITS.kg.label;
}

/* ======================================================
   LAND AREA (Backwards Compatible)
====================================================== */

// ✅ RETURNS NUMBER (like old version)
export function formatLandArea(valueHa, unit = "ha") {
  return convertUnit(valueHa, unit, LAND_UNITS);
}

// ✅ UI helper (string)
export function formatLandDisplay(valueHa, unit = "ha", decimals = 2) {
  const value = convertUnit(valueHa, unit, LAND_UNITS);
  return `${formatNumber(value, decimals)} ${formatLandAreaLabel(unit)}`;
}

export function formatLandAreaLabel(unit = "ha") {
  return LAND_UNITS[unit]?.label || LAND_UNITS.ha.label;
}
