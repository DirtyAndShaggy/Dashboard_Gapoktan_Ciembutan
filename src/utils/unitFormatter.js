// utils/unitFormatter.js

/**
 * ==========================================
 * GLOBAL UNIT FORMATTERS
 * ==========================================
 *
 * RULES (NON-NEGOTIABLE):
 * - Raw weight data is ALWAYS stored in kilograms (kg)
 * - Raw land area data is ALWAYS stored in hectares (ha)
 * - Conversion happens ONLY at display time
 * - Analytics MUST use raw values only
 */

/* =========================
   WEIGHT FORMATTERS (kg)
========================= */

export function formatWeight(valueKg, unit = "kg") {
  if (valueKg == null || isNaN(valueKg)) return 0;

  switch (unit) {
    case "ton":
      return valueKg / 1000;
    case "kuintal":
      return valueKg / 100;
    case "kg":
    default:
      return valueKg;
  }
}

export function formatWeightLabel(unit) {
  switch (unit) {
    case "ton":
      return "Ton";
    case "kuintal":
      return "Kuintal";
    case "kg":
    default:
      return "Kg";
  }
}

/* =========================
   LAND AREA FORMATTERS (ha)
========================= */

export function formatLandArea(valueHa, unit = "ha") {
  if (valueHa == null || isNaN(valueHa)) return 0;

  switch (unit) {
    case "m2":
      return valueHa * 10000;
    case "are":
      return valueHa * 100;
    case "ha":
    default:
      return valueHa;
  }
}

export function formatLandAreaLabel(unit) {
  switch (unit) {
    case "m2":
      return "m²";
    case "are":
      return "Are";
    case "ha":
    default:
      return "Ha";
  }
}

/* =========================
   GENERIC NUMBER FORMATTER
========================= */

/**
 * Helper for consistent rounding at UI level
 */
export function formatNumber(value, decimals = 2) {
  if (value == null || isNaN(value)) return "0";
  return Number(value).toFixed(decimals);
}
