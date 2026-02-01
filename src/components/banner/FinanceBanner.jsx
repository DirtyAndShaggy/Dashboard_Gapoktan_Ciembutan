import { financeData } from "../../data/financeData";
import IncomeCard from "./IncomeCard";
import ExpenseGroup from "./ExpenseGroup";
import SummaryStrip from "./SummaryStrip";

export default function FinanceBanner() {
  const totalIncome = financeData.income.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const totalExpense = financeData.expenses.reduce(
    (sum, group) =>
      sum + group.items.reduce((s, item) => s + item.value, 0),
    0
  );

  return (
    <section className="bg-white rounded-2xl shadow-sm p-5 mb-6">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-800">
          Ringkasan Pendapatan & Belanja Desa
        </h2>
        <p className="text-sm text-gray-500">
          Data keuangan sektor pertanian (ringkas)
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pendapatan */}
        <div className="rounded-xl border border-gray-100 p-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Pendapatan
          </p>
          <IncomeCard income={financeData.income} />
        </div>

        {/* Belanja */}
        <div className="rounded-xl border border-gray-100 p-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Belanja
          </p>

          {/* Scroll container to prevent insane height */}
          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2">
            {financeData.expenses.map((group, idx) => (
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
