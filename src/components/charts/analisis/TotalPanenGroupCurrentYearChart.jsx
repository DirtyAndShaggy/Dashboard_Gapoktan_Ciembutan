import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts";

/* ----------------------------
   Season colors
---------------------------- */
const MUSIM_COLORS = {
  MT1: "#3b82f6", // Rendeng
  MT2: "#10b981", // Gadu
  MT3: "#f59e0b"  // Kemarau
};

const DEFAULT_MUSIM_COLOR = "#6366f1";

/* ----------------------------
   Friendly season labels
---------------------------- */
const MUSIM_LABELS = {
  MT1: "MT1 (Rendeng)",
  MT2: "MT2 (Gadu)",
  MT3: "MT3 (Kemarau)"
};

export default function TotalPanenGroupCurrentYearChart({
  panen,
  kelompokTani,
  tahun
}) {
  /* ----------------------------
     Aggregate total harvest per season
  ---------------------------- */
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

  if (!data.length) {
    return (
      <div className="text-sm text-gray-400 text-center py-10">
        Tidak ada data panen per musim
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="mb-1 font-semibold">
        Total Panen Tahun {tahun} per Musim
      </h3>

      <p className="text-xs text-gray-500 mb-3">
        Total hasil panen kelompok tani (kg)
      </p>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
        >
          <XAxis
            dataKey="musim"
            tickFormatter={v => MUSIM_LABELS[v] || v}
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
              MUSIM_LABELS[label] || label
            }
          />

          <Bar dataKey="totalKg" radius={[6, 6, 0, 0]}>
            {data.map(entry => (
              <Cell
                key={entry.musim}
                fill={
                  MUSIM_COLORS[entry.musim] ||
                  DEFAULT_MUSIM_COLOR
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
