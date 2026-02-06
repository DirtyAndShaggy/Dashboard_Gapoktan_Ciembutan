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

/* ----------------------------
   Config
---------------------------- */
const MAX_YEARS = 5;
const DEFAULT_COLOR = "#6366f1";

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
  if (!panen || !panen.length) {
    return (
      <div className="text-sm text-gray-400 text-center py-10">
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
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="mb-1 font-semibold">
        Tren Total Panen Kelompok Tani
      </h3>

      <p className="text-xs text-gray-500 mb-3">
        Perbandingan hasil panen antar kelompok tani (kg)
      </p>

      <ResponsiveContainer width="100%" height={340}>
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
            formatter={(value, name) => [
              `${value.toLocaleString()} kg`,
              name
            ]}
            labelFormatter={label => `Tahun: ${label}`}
          />

          <Legend wrapperStyle={{ paddingTop: 12 }} />

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
