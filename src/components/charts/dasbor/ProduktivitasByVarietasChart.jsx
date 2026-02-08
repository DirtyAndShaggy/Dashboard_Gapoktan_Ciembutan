import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from "recharts";

import {
  VARIETAS_COLORS,
  DEFAULT_VARIETAS_COLOR
} from "@/constants/varietasColors";

import { useIsMobile } from "@/utils/useIsMobile";

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

/* ----------------------------
   Multiline X-axis tick (desktop)
---------------------------- */
function MultilineXAxisTick({ x, y, payload }) {
  const words = payload.value.replace(/_/g, " ").split(" ");

  return (
    <g transform={`translate(${x},${y + 10})`}>
      <text
        textAnchor="middle"
        fill="currentColor"
        className="text-gray-600 dark:text-gray-300"
        fontSize={12}
      >
        {words.map((word, index) => (
          <tspan
            key={index}
            x={0}
            dy={index === 0 ? 0 : 14}
          >
            {word}
          </tspan>
        ))}
      </text>
    </g>
  );
}

export default function ProduktivitasByVarietasChart({ data }) {
  const isMobile = useIsMobile();

  if (!data || data.length === 0) {
    return (
      <div className="
        text-sm text-center py-10
        text-gray-400
        dark:text-gray-500
      ">
        Tidak ada data produktivitas
      </div>
    );
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 10,
            bottom: isMobile ? 10 : 30
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--chart-grid)"
          />

          {/* Desktop-only X-axis labels */}
          <XAxis
            dataKey="varietas"
            interval={0}
            tick={isMobile ? false : <MultilineXAxisTick />}
            axisLine={!isMobile}
            tickLine={!isMobile}
            height={isMobile ? 0 : 50}
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
              `${Math.round(value).toLocaleString()} kg/ha`,
              "Produktivitas"
            ]}
            labelFormatter={label =>
              `Varietas: ${label.replace(/_/g, " ")}`
            }
          />

          <Bar dataKey="kgPerHa" radius={[6, 6, 0, 0]}>
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

      {/* Mobile legend ONLY */}
      {isMobile && (
        <div className="mt-3">
          <VerticalLegend
            payload={data.map(item => ({
              value: item.varietas,
              color:
                VARIETAS_COLORS[item.varietas] ||
                DEFAULT_VARIETAS_COLOR
            }))}
          />
        </div>
      )}
    </div>
  );
}
