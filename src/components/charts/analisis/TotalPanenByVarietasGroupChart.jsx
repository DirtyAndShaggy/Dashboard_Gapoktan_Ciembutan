import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import { getGroupHarvestByVarietas } from "@/utils/panenStats";

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

  if (!data.length) return null;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="mb-2 font-semibold">
        Total Panen per Varietas
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="varietas" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalKg" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
