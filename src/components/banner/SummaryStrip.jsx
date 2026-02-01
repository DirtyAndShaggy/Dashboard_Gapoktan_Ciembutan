import { formatRupiah } from "../../utils/formatRupiah";

export default function SummaryStrip({ totalIncome, totalExpense }) {
  const surplus = totalIncome - totalExpense;
  const isSurplus = surplus >= 0;

  return (
    <div className="flex flex-col md:flex-row justify-between gap-3 bg-gray-50 rounded-xl p-4 text-sm">
      <div>
        <span className="text-gray-600">Total Pendapatan</span>
        <div className="font-semibold">
          {formatRupiah(totalIncome)}
        </div>
      </div>

      <div>
        <span className="text-gray-600">Total Belanja</span>
        <div className="font-semibold">
          {formatRupiah(totalExpense)}
        </div>
      </div>

      <div>
        <span className="text-gray-600">
          {isSurplus ? "Surplus" : "Defisit"}
        </span>
        <div
          className={`font-bold ${
            isSurplus ? "text-green-600" : "text-red-600"
          }`}
        >
          {formatRupiah(Math.abs(surplus))}
        </div>
      </div>
    </div>
  );
}
