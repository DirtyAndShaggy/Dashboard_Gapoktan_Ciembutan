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
   Custom vertical legend (mobile-ready)
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

export default function HarvestYoYComparisonChart({
  panen,
  kelompokTani,
  tahun,
  musim
}) {
  /* ----------------------------
     Filter + aggregate YoY data
  ---------------------------- */
  const map = {};

  panen
    .filter(p =>
      p.kelompokTani === kelompokTani &&
      (musim === "ALL" || p.musim === musim) &&
      (p.tahun === tahun || p.tahun === tahun - 1)
    )
    .forEach(p => {
      if (!map[p.tahun]) map[p.tahun] = {};
      if (!map[p.tahun][p.varietas]) map[p.tahun][p.varietas] = 0;

      map[p.tahun][p.varietas] += p.hasilKg || 0;
    });

  const chartData = Object.keys(map)
    .sort()
    .map(t => ({
      tahun: Number(t),
      ...map[t]
    }));

  if (chartData.length === 0) {
    return (
      <div className="text-sm text-gray-400 text-center py-10">
        Tidak ada data perbandingan panen
      </div>
    );
  }

  // Dynamic varietas keys
  const varietasKeys = Object.keys(chartData[0]).filter(
    key => key !== "tahun"
  );

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="mb-1 font-semibold">
        Perbandingan Panen Tahun ke Tahun per Varietas
      </h3>

      <p className="text-xs text-gray-500 mb-3">
        Total hasil panen kelompok tani (kg)
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 20, left: 10, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="tahun"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={v =>
              v >= 1000 ? `${v / 1000}k` : v
            }
          />

          <Tooltip
            formatter={v => [`${v.toLocaleString()} kg`, "Panen"]}
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
