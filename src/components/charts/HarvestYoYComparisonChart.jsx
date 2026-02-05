import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import { getGroupHarvestYoY } from "@/utils/panenStats";

export default function HarvestYoYComparisonChart({
  panen,
  kelompokTani,
  tahun,
  musim
}) {
  const chartData = getGroupHarvestYoY(
    panen,
    kelompokTani,
    tahun,
    musim
  );

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="mb-2 font-semibold">
        Perbandingan Panen Tahun ke Tahun
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="tahun" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalKg" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

