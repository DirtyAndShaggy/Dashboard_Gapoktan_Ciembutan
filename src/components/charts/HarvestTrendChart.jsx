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
          <span className="text-gray-700">
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
      <div className="text-sm text-gray-400 text-center py-10">
        Tidak ada data tren panen
      </div>
    );
  }

  // Dynamic varietas keys (exclude "year")
  const varietasKeys = Object.keys(data[0]).filter(
    key => key !== "year"
  );

  return (
    <div className="w-full">
      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="year" />

          <YAxis
            tickFormatter={value =>
              value >= 1000 ? `${value / 1000}k` : value
            }
          />

          <Tooltip
            formatter={value => [`${value.toLocaleString()} kg`, "Panen"]}
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
