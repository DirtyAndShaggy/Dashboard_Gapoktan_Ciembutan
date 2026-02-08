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
import { useIsMobile } from "@/utils/useIsMobile";

/* ----------------------------
   Custom colored X-axis tick (desktop)
---------------------------- */
function VarietasXAxisTick({ x, y, payload }) {
  const color =
    VARIETAS_COLORS[payload.value] || DEFAULT_VARIETAS_COLOR;

  return (
    <g transform={`translate(${x},${y + 10})`}>
      <text
        textAnchor="middle"
        fill={color}
        fontSize={12}
      >
        {payload.value.replace(/_/g, " ")}
      </text>
    </g>
  );
}

/* ----------------------------
   Vertical legend (mobile)
---------------------------- */
function VerticalLegend({ data }) {
  return (
    <div className="flex flex-col gap-2 text-sm mt-3">
      {data.map(item => (
        <div
          key={item.varietas}
          className="flex items-center gap-2"
        >
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{
              backgroundColor:
                VARIETAS_COLORS[item.varietas] ||
                DEFAULT_VARIETAS_COLOR
            }}
          />
          <span className="text-gray-700 dark:text-gray-300">
            {item.varietas.replace(/_/g, " ")}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function TotalPanenByVarietasGroupChart({
  panen,
  kelompokTani,
  tahun,
  musim
}) {
  const isMobile = useIsMobile();

  const data = getGroupHarvestByVarietas(
    panen,
    kelompokTani,
    tahun,
    musim
  );

  if (!data.length) {
    return (
      <div className="
        text-sm text-center py-10
        text-gray-400
        dark:text-gray-500
      ">
        Tidak ada data panen per varietas
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
      <h3 className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
        Total Panen per Varietas Tahun {tahun}
      </h3>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        Total hasil panen kelompok tani (kg)
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 10,
            bottom: isMobile ? 10 : 40
          }}
        >
          <XAxis
            dataKey="varietas"
            interval={0}
            tick={isMobile ? false : <VarietasXAxisTick />}
            height={isMobile ? 0 : 50}
            axisLine={!isMobile}
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

      {/* Mobile legend */}
      {isMobile && <VerticalLegend data={data} />}
    </div>
  );
}
