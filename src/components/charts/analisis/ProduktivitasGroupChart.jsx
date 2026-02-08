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

/* ----------------------------
   Custom Y-axis tick with varietas color
---------------------------- */
function VarietasYAxisTick({ x, y, payload }) {
  const color =
    VARIETAS_COLORS[payload.value] || DEFAULT_VARIETAS_COLOR;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={-6}
        y={0}
        dy={4}
        textAnchor="end"
        fill={color}
        fontSize={12}
      >
        {payload.value.replace(/_/g, " ")}
      </text>
    </g>
  );
}

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

  if (!data.length) {
    return (
      <div className="
        text-sm text-center py-10 rounded-lg
        text-gray-400
        dark:text-gray-500
      ">
        Tidak ada data produktivitas
      </div>
    );
  }

  /* ----------------------------
     Render
  ---------------------------- */
  return (
    <div className="
      rounded-xl p-4 shadow-sm
      bg-white
      dark:bg-gray-800
    ">
      <h3 className="
        mb-1 font-semibold
        text-gray-800
        dark:text-gray-100
      ">
        Produktivitas Tahun {tahun} (kg/ha)
      </h3>

      <p className="
        text-xs mb-3
        text-gray-500
        dark:text-gray-400
      ">
        Produktivitas = Hasil Panen ÷ Luas Lahan
      </p>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: -30, right: 24 }}
        >
          <XAxis
            type="number"
            tick={{ fontSize: 12 }}
            stroke="var(--chart-axis)"
          />

          <YAxis
            type="category"
            dataKey="varietas"
            width={130}
            tick={<VarietasYAxisTick />}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "var(--tooltip-bg)",
              border: "1px solid var(--tooltip-border)",
              color: "var(--tooltip-text)",
              borderRadius: "8px"
            }}
            formatter={value => [
              `${value.toLocaleString()} kg/ha`,
              "Produktivitas"
            ]}
            labelFormatter={label =>
              label.replace(/_/g, " ")
            }
          />

          <Bar
            dataKey="kgPerHa"
            radius={[0, 6, 6, 0]}
          >
            {data.map(entry => (
              <Cell
                key={entry.varietas}
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
