import { useState } from "react";
import { formatRupiah } from "../../utils/formatRupiah";
import ChevronDown from "../../assets/icons/chevron-down.png";

export default function ExpenseGroup({ title, items }) {
  const [open, setOpen] = useState(false);

  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className="
        border rounded-lg overflow-hidden
        border-gray-100 dark:border-gray-800
        bg-white dark:bg-gray-900
      "
    >
      {/* Header / Summary */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full flex items-center justify-between px-3 py-3 text-left
          bg-gray-50 dark:bg-gray-800
          md:bg-transparent md:dark:bg-transparent
          md:cursor-default
        "
      >
        <div>
          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 md:hidden">
            Ketuk untuk melihat rincian
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-red-600 dark:text-red-400">
            {formatRupiah(total)}
          </span>

          {/* Chevron – mobile only */}
          <img
            src={ChevronDown}
            alt=""
            className={`w-4 h-4 transition-transform md:hidden
              ${open ? "rotate-180" : ""}
              dark:invert
            `}
          />
        </div>
      </button>

      {/* Detail items */}
      <div
        className={`
          px-3 pb-3 space-y-1 text-sm
          text-gray-600 dark:text-gray-300
          ${open ? "block" : "hidden"}
          md:block
        `}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between"
          >
            <span>{item.label}</span>
            <span className="font-medium">
              {formatRupiah(item.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
