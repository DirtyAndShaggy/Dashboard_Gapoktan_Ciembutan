import { formatRupiah } from "../../utils/formatRupiah";

export default function IncomeCard({ income }) {
  const totalIncome = income.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-2">
      {income.map((item, idx) => (
        <div
          key={idx}
          className="flex justify-between text-sm text-gray-700"
        >
          <span>{item.label}</span>
          <span className="font-medium">
            {formatRupiah(item.value)}
          </span>
        </div>
      ))}

      <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-sm">
        <span>Total Pendapatan</span>
        <span className="text-green-600">
          {formatRupiah(totalIncome)}
        </span>
      </div>
    </div>
  );
}
