import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";

import { useSettings } from "@/context/SettingsContext";
import {
  formatWeight,
  formatWeightLabel,
} from "@/utils/unitFormatter";

/* ----------------------------
   Config
---------------------------- */
const MAX_YEARS = 5;
const DEFAULT_COLOR = "#6366f1";

/* ----------------------------
   Helpers
---------------------------- */
function getDecimalByUnit(unit) {
  switch (unit) {
    case "ton":
    case "kuintal":
      return 1;
    default:
      return 0; // kg
  }
}

/* ----------------------------
   Generate stable colors per group
---------------------------- */
function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return `hsl(${hash % 360}, 65%, 55%)`;
}

export default function HarvestGroupTrendChart({ panen }) {
  const { settings } = useSettings();

  if (!panen || !panen.length) {
    return (
      <div className="
        text-sm text-center py-10
        text-gray-400
        dark:text-gray-500
      ">
        Tidak ada data panen
      </div>
    );
  }

  /* ----------------------------
     Step 1: get recent years
  ---------------------------- */
  const years = Array.from(
    new Set(panen.map(p => p.tahun))
  )
    .sort((a, b) => a - b)
    .slice(-MAX_YEARS);

  /* ----------------------------
     Step 2: group totals per year & kelompok
  ---------------------------- */
  const map = {};
  const kelompokSet = new Set();

  panen
    .filter(p => years.includes(p.tahun))
    .forEach(p => {
      kelompokSet.add(p.kelompokTani);

      if (!map[p.tahun]) map[p.tahun] = {};
      if (!map[p.tahun][p.kelompokTani]) {
        map[p.tahun][p.kelompokTani] = 0;
      }

      map[p.tahun][p.kelompokTani] += p.hasilKg || 0;
    });

  /* ----------------------------
     Step 3: build chart data
  ---------------------------- */
  const chartData = years.map(tahun => ({
    tahun,
    ...map[tahun]
  }));

  const kelompokList = Array.from(kelompokSet);

  /* ----------------------------
     Render
  ---------------------------- */
  return (
    <div
      className="
        rounded-xl p-4 shadow-sm
        bg-white
        dark:bg-gray-800
      "
    >
      <h3 className="
        mb-1 font-semibold
        text-gray-900
        dark:text-gray-100
      ">
        Tren Total Panen Kelompok Tani
      </h3>

      <p className="
        text-xs mb-3
        text-gray-500
        dark:text-gray-400
      ">
        Perbandingan hasil panen antar kelompok tani
        ({formatWeightLabel(settings.weightUnit)})
      </p>

      <ResponsiveContainer width="100%" height={340}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 10, bottom: 30 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--chart-grid)"
          />

          <XAxis
            dataKey="tahun"
            tick={{ fontSize: 12 }}
            stroke="var(--chart-axis)"
          />

          <YAxis
            tick={{ fontSize: 12 }}
            stroke="var(--chart-axis)"
            tickFormatter={(value) =>
              Number(
                formatWeight(value, settings.weightUnit)
              ).toLocaleString("id-ID", {
                minimumFractionDigits: 0,
                maximumFractionDigits: getDecimalByUnit(
                  settings.weightUnit
                ),
              })
            }
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "var(--tooltip-bg)",
              border: "1px solid var(--tooltip-border)",
              color: "var(--tooltip-text)",
              borderRadius: "8px"
            }}
            formatter={(value, name) => [
              `${Number(
                formatWeight(value, settings.weightUnit)
              ).toLocaleString("id-ID", {
                minimumFractionDigits: 0,
                maximumFractionDigits: getDecimalByUnit(
                  settings.weightUnit
                ),
              })} ${formatWeightLabel(settings.weightUnit)}`,
              name
            ]}
            labelFormatter={label => `Tahun: ${label}`}
          />

          <Legend
            wrapperStyle={{
              paddingTop: 12,
              color: "var(--tooltip-text)"
            }}
          />

          {kelompokList.map(kelompok => (
            <Line
              key={kelompok}
              type="monotone"
              dataKey={kelompok}
              name={kelompok}
              stroke={stringToColor(kelompok) || DEFAULT_COLOR}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
