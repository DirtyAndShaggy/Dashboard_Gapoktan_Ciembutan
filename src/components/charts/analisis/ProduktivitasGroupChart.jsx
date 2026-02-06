import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts";

import {
  VARIETAS_COLORS,
  DEFAULT_VARIETAS_COLOR
} from "@/constants/varietasColors";

export default function ProduktivitasGroupChart({
  panen,
  kelompokTani,
  tahun,
  musim
}) {
  /* ----------------------------
     Aggregate produktivitas per varietas
  ---------------------------- */
  const map = {};

  panen
    .filter(p =>
      p.kelompokTani === kelompokTani &&
      p.tahun === tahun &&
      (musim === "ALL" || p.musim === musim)
    )
    .forEach(p => {
      if (!map[p.varietas]) {
        map[p.varietas] = { totalKg: 0, totalHa: 0 };
      }

      map[p.varietas].totalKg += p.hasilKg || 0;
      map[p.varietas].totalHa += p.luasHa || 0;
    });

  const data = Object.entries(map).map(
    ([varietas, v]) => ({
      varietas,
      kgPerHa:
        v.totalHa > 0
          ? Math.round(v.totalKg / v.totalHa)
          : 0
    })
  );

  if (!data.length) return null;

  /* ----------------------------
     Render
  ---------------------------- */
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="mb-1 font-semibold">
        Produktivitas (kg/ha)
      </h3>

      <p className="text-xs text-gray-500 mb-3">
        Produktivitas = Hasil Panen ÷ Luas Lahan
      </p>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 40, right: 24 }}
        >
          <XAxis
            type="number"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="varietas"
            width={110}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={v => [`${v} kg/ha`, "Produktivitas"]}
          />

          <Bar
            dataKey="kgPerHa"
            radius={[0, 6, 6, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  VARIETAS_COLORS[entry.varietas] ||
                  DEFAULT_VARIETAS_COLOR
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
