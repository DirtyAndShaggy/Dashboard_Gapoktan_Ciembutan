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

import { getGroupHarvestByVarietas } from "@/utils/panenStats";

/* ----------------------------
   Custom X-axis tick with varietas color
---------------------------- */
function VarietasXAxisTick({ x, y, payload }) {
  const color =
    VARIETAS_COLORS[payload.value] || DEFAULT_VARIETAS_COLOR;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={10}
        dy={10}
        textAnchor="middle"
        fill={color}
        fontSize={12}
      >
        {payload.value.replace(/_/g, " ")}
      </text>
    </g>
  );
}

export default function TotalPanenByVarietasGroupChart({
  panen,
  kelompokTani,
  tahun,
  musim
}) {
  const data = getGroupHarvestByVarietas(
    panen,
    kelompokTani,
    tahun,
    musim
  );

  if (!data.length) {
    return (
      <div className="text-sm text-gray-400 text-center py-10">
        Tidak ada data panen per varietas
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="mb-1 font-semibold">
        Total Panen per Varietas
      </h3>

      <p className="text-xs text-gray-500 mb-3">
        Total hasil panen kelompok tani (kg)
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 40 }}
        >
          <XAxis
            dataKey="varietas"
            interval={0}
            tick={<VarietasXAxisTick />}
            height={50}
          />

          <YAxis
             tick={{ fontSize: 12 }}
          />

          <Tooltip
            formatter={value => [
              `${value.toLocaleString()} kg`,
              "Total Panen"
            ]}
            labelFormatter={label =>
              label.replace(/_/g, " ")
            }
          />

          <Bar dataKey="totalKg" radius={[6, 6, 0, 0]}>
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
