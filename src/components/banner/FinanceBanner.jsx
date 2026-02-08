import IncomeCard from "./IncomeCard";
import ExpenseGroup from "./ExpenseGroup";
import SummaryStrip from "./SummaryStrip";

export default function FinanceBanner({ banner, keuangan }) {
  const totalIncome = keuangan.income.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const totalExpense = keuangan.expenses.reduce(
    (sum, group) =>
      sum + group.items.reduce((s, item) => s + item.value, 0),
    0
  );

  return (
    <section
      className="
        rounded-2xl shadow-sm p-5 mb-6
        bg-white dark:bg-gray-900
        border border-transparent dark:border-gray-800
      "
    >
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          Ringkasan Pendapatan & Belanja Desa Anggaran {banner.tahun}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {banner.subtitle}
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pendapatan */}
        <div
          className="
            rounded-xl p-4
            border border-gray-100 dark:border-gray-800
            bg-gray-50 dark:bg-gray-800
          "
        >
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Pendapatan
          </p>
          <IncomeCard income={keuangan.income} />
        </div>

        {/* Belanja */}
        <div
          className="
            rounded-xl p-4
            border border-gray-100 dark:border-gray-800
            bg-gray-50 dark:bg-gray-800
          "
        >
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Belanja
          </p>

          {/* Scroll container to prevent insane height */}
          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2">
            {keuangan.expenses.map((group, idx) => (
              <ExpenseGroup
                key={idx}
                title={group.title}
                items={group.items}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-5">
        <SummaryStrip
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />
      </div>
    </section>
  );
}
