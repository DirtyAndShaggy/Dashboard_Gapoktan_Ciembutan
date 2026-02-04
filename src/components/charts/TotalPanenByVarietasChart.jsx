import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function TotalPanenByVarietasChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-sm text-gray-400 text-center py-10">
        Tidak ada data panen
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 20, left: 10, bottom: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="varietas"
          angle={-20}
          textAnchor="end"
          interval={0}
          height={60}
        />

        <YAxis
          tickFormatter={value =>
            value >= 1000 ? `${value / 1000}k` : value
          }
        />

        <Tooltip
          formatter={value => [`${value.toLocaleString()} kg`, "Total Panen"]}
          labelFormatter={label => `Varietas: ${label}`}
        />

        <Bar
          dataKey="totalKg"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
