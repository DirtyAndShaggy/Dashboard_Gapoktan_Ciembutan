import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import { getGroupHarvestByMethod } from "@/utils/panenStats";

export default function HarvestByFarmingMethodChart({
  panen,
  kelompokTani,
  tahun,
  musim
}) {
  const data = getGroupHarvestByMethod(
    panen,
    kelompokTani,
    tahun,
    musim
  );

  if (!data.length) return null;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="mb-2 font-semibold">
        Panen berdasarkan Metode Tanam
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="metodeTanam" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalKg" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
