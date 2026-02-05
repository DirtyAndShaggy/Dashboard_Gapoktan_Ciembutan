import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

export default function TotalPanenGroupCurrentYearChart({
  panen,
  kelompokTani,
  tahun
}) {
  const map = {};

  panen
    .filter(
      p =>
        p.kelompokTani === kelompokTani &&
        p.tahun === tahun
    )
    .forEach(p => {
      if (!map[p.musim]) map[p.musim] = 0;
      map[p.musim] += p.hasilKg || 0;
    });

  const data = Object.entries(map).map(
    ([musim, totalKg]) => ({
      musim,
      totalKg
    })
  );

  if (!data.length) return null;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="mb-2 font-semibold">
        Total Panen Tahun Ini per Musim
      </h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="musim" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalKg" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
