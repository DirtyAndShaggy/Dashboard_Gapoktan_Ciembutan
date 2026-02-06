import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import { getGroupTrendByVarietas } from "@/utils/panenStats";

export default function HarvestVarietasTrendGroupChart({
  panen,
  kelompokTani
}) {
  const data = getGroupTrendByVarietas(panen, kelompokTani);

  if (!data.length) return null;

  // extract varietas keys dynamically
  const varietasKeys = Object.keys(data[0]).filter(
    k => k !== "tahun"
  );

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="mb-2 font-semibold">
        Tren Panen Varietas Kelompok Tani
      </h3>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tahun" />
          <YAxis />
          <Tooltip />

          {varietasKeys.map(v => (
            <Area
              key={v}
              type="monotone"
              dataKey={v}
              stackId="1"
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
