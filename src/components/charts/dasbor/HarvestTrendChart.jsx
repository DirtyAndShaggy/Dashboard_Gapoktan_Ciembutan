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

import {
  VARIETAS_COLORS,
  DEFAULT_VARIETAS_COLOR
} from "@/constants/varietasColors";

/* ----------------------------
   Custom vertical legend (mobile)
---------------------------- */
function VerticalLegend({ payload }) {
  if (!payload || payload.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 text-sm">
      {payload.map(item => (
        <div key={item.value} className="flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-gray-700 dark:text-gray-300">
            {item.value.replace(/_/g, " ")}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function HarvestTrendChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="
        text-sm text-center py-10
        text-gray-400 dark:text-gray-500
      ">
        Tidak ada data tren panen
      </div>
    );
  }

  // Only keep last 5 most recent years
  const sortedData = [...data].sort(
    (a, b) => a.tahun - b.tahun
  );

  const recentData = sortedData.slice(-4);

  // Dynamic varietas keys (exclude "tahun")
  const varietasKeys = Object.keys(recentData[0]).filter(
    key => key !== "tahun"
  );

  return (
    <div className="w-full">
      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={recentData}
          margin={{ top: 10, right: 20, left: 10, bottom: 30 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--chart-grid)"
          />

          <XAxis
            dataKey="tahun"
            stroke="var(--chart-axis)"
            tick={{ fontSize: 12 }}
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
            formatter={(value, name) => [
              `${value.toLocaleString()} kg`,
              name.replace(/_/g, " ")
            ]}
            labelFormatter={label => `Tahun: ${label}`}
          />

          {/* Desktop legend (horizontal, under chart) */}
          <Legend
            className="hidden md:block"
            wrapperStyle={{ paddingTop: 12 }}
            formatter={value => value.replace(/_/g, " ")}
          />

          {varietasKeys.map(varietas => (
            <Line
              key={varietas}
              type="monotone"
              dataKey={varietas}
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
