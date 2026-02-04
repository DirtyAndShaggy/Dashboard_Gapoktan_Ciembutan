import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from "recharts";

export default function HarvestTrendChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-sm text-gray-400 text-center py-10">
        Tidak ada data tren panen
      </div>
    );
  }

  // Get varietas keys dynamically (exclude "year")
  const varietasKeys = Object.keys(data[0]).filter(
    key => key !== "year"
  );

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="year" />

        <YAxis
          tickFormatter={value =>
            value >= 1000 ? `${value / 1000}k` : value
          }
        />

        <Tooltip
          formatter={value => [`${value.toLocaleString()} kg`, "Panen"]}
          labelFormatter={label => `Tahun: ${label}`}
        />

        <Legend />

        {varietasKeys.map(varietas => (
          <Line
            key={varietas}
            type="monotone"
            dataKey={varietas}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
