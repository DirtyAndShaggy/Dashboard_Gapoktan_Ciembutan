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

import { useSettings } from "@/context/SettingsContext";
import {
  formatWeight,
  formatWeightLabel,
} from "@/utils/unitFormatter";

import {
  VARIETAS_COLORS,
  DEFAULT_VARIETAS_COLOR
} from "@/constants/varietasColors";

import { useIsMobile } from "@/utils/useIsMobile";

/* ----------------------------
   Helpers
---------------------------- */
function getDecimalByUnit(unit) {
  switch (unit) {
    case "ton":
    case "kuintal":
      return 1;
    default:
      return 0; // kg
  }
}

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

export default function TotalPanenByVarietasChart({ data }) {
  const isMobile = useIsMobile();
  const { settings } = useSettings();

  if (!data || data.length === 0) {
    return (
      <div className="
        text-sm text-center py-10 rounded-lg
        text-gray-400
        dark:text-gray-500
      ">
        Tidak ada data panen
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
            stroke="currentColor"
            className="text-gray-200 dark:text-gray-700"
          />

          <XAxis
            dataKey="varietas"
            interval={0}
            tick={isMobile ? false : <MultilineXAxisTick />}
            axisLine={!isMobile}
            tickLine={!isMobile}
            stroke="currentColor"
            className="text-gray-500 dark:text-gray-400"
            height={isMobile ? 0 : 30}
          />

          <YAxis
            tick={{ fontSize: 12 }}
            stroke="currentColor"
            className="text-gray-500 dark:text-gray-400"
            tickFormatter={(value) =>
              Number(
                formatWeight(value, settings.weightUnit)
              ).toLocaleString("id-ID", {
                minimumFractionDigits: 0,
                maximumFractionDigits: getDecimalByUnit(
                  settings.weightUnit
                ),
              })
            }
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "var(--tooltip-bg)",
              borderRadius: "8px",
              border: "1px solid rgba(0,0,0,0.1)"
            }}
            formatter={value => [
              `${Number(
                formatWeight(value, settings.weightUnit)
              ).toLocaleString("id-ID", {
                minimumFractionDigits: 0,
                maximumFractionDigits: getDecimalByUnit(
                  settings.weightUnit
                ),
              })} ${formatWeightLabel(settings.weightUnit)}`,
              "Total Panen"
            ]}
            labelFormatter={label =>
              `Varietas: ${label.replace(/_/g, " ")}`
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
