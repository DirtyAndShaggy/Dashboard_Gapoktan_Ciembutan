import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

import { useSettings } from "@/context/SettingsContext";
import {
  formatWeight,
  formatWeightLabel,
} from "@/utils/unitFormatter";

import {
  VARIETAS_COLORS,
  DEFAULT_VARIETAS_COLOR
} from "@/constants/varietasColors";

/* ----------------------------
   Config
---------------------------- */
const MAX_YEARS = 5;

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

export default function HarvestYoYComparisonChart({
  panen,
  kelompokTani,
  tahun // contextual only, NOT a filter
}) {
  const { settings } = useSettings();

  /* ----------------------------
     Step 1: filter by farmer group ONLY
     (INTENTIONALLY ignoring season)
  ---------------------------- */
  const filtered = panen.filter(
    p => p.kelompokTani === kelompokTani
  );

  if (!filtered.length) {
    return (
      <div className="
        text-sm text-center py-10 rounded-lg
        text-gray-400
        dark:text-gray-500
      ">
        Tidak ada data perbandingan panen
      </div>
    );
  }

  /* ----------------------------
     Step 2: determine last N years
     (data-driven, not calendar-driven)
  ---------------------------- */
  const years = Array.from(
    new Set(filtered.map(p => Number(p.tahun)))
  )
    .filter(Boolean)
    .sort((a, b) => a - b)
    .slice(-MAX_YEARS);

  /* ----------------------------
     Step 3: aggregate per year & varietas
     (ALL seasons combined)
  ---------------------------- */
  const map = {};

  filtered
    .filter(p => years.includes(p.tahun))
    .forEach(p => {
      if (!map[p.tahun]) map[p.tahun] = {};
      if (!map[p.tahun][p.varietas]) map[p.tahun][p.varietas] = 0;

      map[p.tahun][p.varietas] += p.hasilKg || 0;
    });

  const chartData = years.map(y => ({
    tahun: y,
    ...map[y]
  }));

  /* ----------------------------
     Dynamic varietas keys
  ---------------------------- */
  const varietasKeys = Array.from(
    new Set(
      chartData.flatMap(d =>
        Object.keys(d).filter(k => k !== "tahun")
      )
    )
  );

  return (
    <div className="
      rounded-xl p-4 shadow-sm
      bg-white text-gray-900
      dark:bg-gray-800 dark:text-gray-100
    ">
      <h3 className="mb-1 font-semibold">
        Tren Panen {years.length} Tahun Terakhir per Varietas
      </h3>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        Total hasil panen kelompok tani (semua musim)
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 10, bottom: 30 }}
        >
          <CartesianGrid
            stroke="var(--chart-grid)"
            strokeDasharray="3 3"
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
              name.replace(/_/g, " ")
            ]}
            labelFormatter={label => `Tahun: ${label}`}
          />

          <Legend
            wrapperStyle={{ paddingTop: 12 }}
            formatter={v => v.replace(/_/g, " ")}
          />

          {varietasKeys.map(varietas => (
            <Line
              key={varietas}
              type="monotone"
              dataKey={varietas}
              name={varietas.replace(/_/g, " ")}
              stroke={
                VARIETAS_COLORS[varietas] || DEFAULT_VARIETAS_COLOR
              }
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
