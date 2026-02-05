import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

import { getGroupProduktivitas } from "@/utils/panenStats";

export default function ProduktivitasGroupChart({
  panen,
  kelompokTani,
  tahun,
  musim
}) {
  const value = getGroupProduktivitas(panen, kelompokTani, tahun, musim);

  const chartData = [
    { name: "Produktivitas", value: Math.round(value) }
  ];

  return (
    <div className="card">
      <h3 className="mb-2 font-semibold">Produktivitas (kg/ha)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
