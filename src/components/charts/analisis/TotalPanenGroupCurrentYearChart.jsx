import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts";

import { useIsMobile } from "@/utils/useIsMobile";

/* ----------------------------
   Season colors
---------------------------- */
const MUSIM_COLORS = {
  MT1: "#3b82f6", // Rendeng
  MT2: "#10b981", // Gadu
  MT3: "#f59e0b"  // Kemarau
};

const DEFAULT_MUSIM_COLOR = "#6366f1";

/* ----------------------------
   Friendly season labels
---------------------------- */
const MUSIM_LABELS = {
  MT1: "MT1 (Rendeng)",
  MT2: "MT2 (Gadu)",
  MT3: "MT3 (Kemarau)"
};

/* ----------------------------
   Vertical legend (mobile)
---------------------------- */
function MusimVerticalLegend({ data }) {
  return (
    <div className="flex flex-col gap-2 text-sm mt-3">
      {data.map(item => (
        <div
          key={item.musim}
          className="flex items-center gap-2"
        >
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{
              backgroundColor:
                MUSIM_COLORS[item.musim] ||
                DEFAULT_MUSIM_COLOR
            }}
          />
          <span className="text-gray-700 dark:text-gray-300">
            {MUSIM_LABELS[item.musim] || item.musim}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function TotalPanenGroupCurrentYearChart({
  panen,
  kelompokTani,
  tahun
}) {
  const isMobile = useIsMobile();

  /* ----------------------------
     Aggregate total harvest per season
  ---------------------------- */
  const map = {};

  panen
    .filter(
      p =>
        p.kelompokTani === kelompokTani &&
        p.tahun === tahun
    )
    .forEach(p => {
      if (!map[p.musim]) map[p.musim] = 0;
      map[p.musim] += p.hasilKg || 0;
    });

  const data = Object.entries(map).map(
    ([musim, totalKg]) => ({
      musim,
      totalKg
    })
  );

  if (!data.length) {
    return (
      <div className="
        text-sm text-center py-10 rounded-lg
        text-gray-400
        dark:text-gray-500
      ">
        Tidak ada data panen per musim
      </div>
    );
  }

  return (
    <div
      className="
        rounded-xl p-4 shadow-sm
        bg-white
        dark:bg-gray-800
      "
    >
      <h3 className="mb-1 font-semibold text-gray-800 dark:text-gray-100">
        Total Panen Tahun {tahun} per Musim
      </h3>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        Total hasil panen kelompok tani (kg)
      </p>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 10,
            bottom: isMobile ? 10 : 30
          }}
        >
          <XAxis
            dataKey="musim"
            tick={isMobile ? false : true}
            tickFormatter={v => MUSIM_LABELS[v] || v}
            height={isMobile ? 0 : 40}
            axisLine={!isMobile}
            tickLine={!isMobile}
            stroke="var(--chart-axis)"
          />

          <YAxis
            tick={{ fontSize: 12 }}
            stroke="var(--chart-axis)"
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "var(--tooltip-bg)",
              border: "1px solid var(--tooltip-border)",
              color: "var(--tooltip-text)",
              borderRadius: "8px"
            }}
            formatter={value => [
              `${value.toLocaleString()} kg`,
              "Total Panen"
            ]}
            labelFormatter={label =>
              MUSIM_LABELS[label] || label
            }
          />

          <Bar dataKey="totalKg" radius={[6, 6, 0, 0]}>
            {data.map(entry => (
              <Cell
                key={entry.musim}
                fill={
                  MUSIM_COLORS[entry.musim] ||
                  DEFAULT_MUSIM_COLOR
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Mobile legend */}
      {isMobile && <MusimVerticalLegend data={data} />}
    </div>
  );
}
