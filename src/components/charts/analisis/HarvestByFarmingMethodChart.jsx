import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts";

/* ----------------------------
   Farming method colors
---------------------------- */
const METHOD_COLORS = {
  Organik: "#10b981",
  "Non-Organik": "#ef4444"
};

const DEFAULT_METHOD_COLOR = "#6366f1";

/* ----------------------------
   Friendly label
---------------------------- */
const formatMethod = v =>
  v ? v.replace(/_/g, " ") : "Unknown";

export default function HarvestByFarmingMethodChart({
  panen,
  kelompokTani,
  tahun,
  musim
}) {
  /* ----------------------------
     Aggregate productivity per method
  ---------------------------- */
  const map = {};

  panen
    .filter(p =>
      p.kelompokTani === kelompokTani &&
      p.tahun === tahun &&
      (musim === "ALL" || p.musim === musim)
    )
    .forEach(p => {
      const metode = p.metode; // ✅ FIX IS HERE

      if (!metode) return;

      if (!map[metode]) {
        map[metode] = {
          totalKg: 0,
          totalHa: 0
        };
      }

      map[metode].totalKg += p.hasilKg || 0;
      map[metode].totalHa += p.luasHa || 0;
    });

  const data = Object.entries(map)
    .map(([metode, v]) => ({
      metode,
      kgPerHa:
        v.totalHa > 0
          ? Math.round(v.totalKg / v.totalHa)
          : 0
    }))
    .sort((a, b) => b.kgPerHa - a.kgPerHa);

  if (!data.length) {
    return (
      <div className="text-sm text-gray-400 text-center py-10">
        Tidak ada data produktivitas metode tanam
      </div>
    );
  }

  /* ----------------------------
     Render
  ---------------------------- */
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="mb-1 font-semibold">
        Efisiensi Metode Tanam (kg/ha)
      </h3>

      <p className="text-xs text-gray-500 mb-3">
        Perbandingan hasil panen per luas lahan
      </p>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 80, right: 24 }}
        >
          <XAxis
            type="number"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            type="category"
            dataKey="metode"
            tickFormatter={formatMethod}
            width={120}
          />

          <Tooltip
            formatter={value => [
              `${value.toLocaleString()} kg/ha`,
              "Produktivitas"
            ]}
            labelFormatter={label =>
              `Metode: ${formatMethod(label)}`
            }
          />

          <Bar dataKey="kgPerHa" radius={[0, 6, 6, 0]}>
            {data.map(entry => (
              <Cell
                key={entry.metode}
                fill={
                  METHOD_COLORS[entry.metode] ||
                  DEFAULT_METHOD_COLOR
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
