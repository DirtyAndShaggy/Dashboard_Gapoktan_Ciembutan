import { useState } from "react";
import { formatRupiah } from "../../utils/formatRupiah";

export default function ExpenseGroup({ title, items }) {
  const [open, setOpen] = useState(false);

  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="border rounded-lg p-3">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer md:cursor-default"
        onClick={() => setOpen(!open)}
      >
        <h4 className="text-sm font-semibold text-gray-800">
          {title}
        </h4>
        <span className="text-sm font-medium text-red-600">
          {formatRupiah(total)}
        </span>
      </div>

      {/* Sub items – desktop always visible */}
      <div className="hidden md:block mt-2 space-y-1">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between text-sm text-gray-600"
          >
            <span>{item.label}</span>
            <span>{formatRupiah(item.value)}</span>
          </div>
        ))}
      </div>

      {/* Sub items – mobile collapsible */}
      {open && (
        <div className="md:hidden mt-2 space-y-1">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between text-sm text-gray-600"
            >
              <span>{item.label}</span>
              <span>{formatRupiah(item.value)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
