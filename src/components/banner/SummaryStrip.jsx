import { formatRupiah } from "../../utils/formatRupiah";

export default function SummaryStrip({ totalIncome, totalExpense }) {
  const surplus = totalIncome - totalExpense;
  const isSurplus = surplus >= 0;

  return (
    <div
      className="
        flex flex-col md:flex-row justify-between gap-3
        rounded-xl p-4 text-sm
        bg-gray-50 dark:bg-gray-800
        border border-gray-100 dark:border-gray-700
      "
    >
      <div>
        <span className="text-gray-600 dark:text-gray-400">
          Total Pendapatan
        </span>
        <div className="font-semibold text-gray-900 dark:text-gray-100">
          {formatRupiah(totalIncome)}
        </div>
      </div>

      <div>
        <span className="text-gray-600 dark:text-gray-400">
          Total Belanja
        </span>
        <div className="font-semibold text-gray-900 dark:text-gray-100">
          {formatRupiah(totalExpense)}
        </div>
      </div>

      <div>
        <span className="text-gray-600 dark:text-gray-400">
          {isSurplus ? "Surplus" : "Defisit"}
        </span>
        <div
          className={`font-bold ${
            isSurplus
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {formatRupiah(Math.abs(surplus))}
        </div>
      </div>
    </div>
  );
}
