"use client";
import React from "react";

type AmortizationRow = {
  month: number;
  monthly_payment: string;
  principal_paid: string;
  interest_paid: string;
  remaining_balance: string;
};

type Props = {
  data: AmortizationRow[];
};

export default function AmortizationTable({ data }: Props) {
  return (
    <div className="rounded-2xl shadow-2xl overflow-hidden gradient-primary p-1">
      <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl overflow-auto max-h-[500px]">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 z-10 gradient-primary text-white">
            <tr>
              <th className="px-6 py-4 text-left font-bold uppercase">Mes</th>
              <th className="px-6 py-4 text-left font-bold uppercase">Pago mensual</th>
              <th className="px-6 py-4 text-left font-bold uppercase">Abono a capital</th>
              <th className="px-6 py-4 text-left font-bold uppercase">Interés</th>
              <th className="px-6 py-4 text-left font-bold uppercase">Saldo</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={row.month}
                className={i % 2 === 0 ? "bg-white/60 dark:bg-gray-900/60" : "bg-white/30 dark:bg-gray-900/30"}
              >
                <td className="px-6 py-3 font-semibold text-gray-800 dark:text-gray-100">{row.month}</td>
                <td className="px-6 py-3 text-indigo-700 dark:text-indigo-300 font-bold">{row.monthly_payment}</td>
                <td className="px-6 py-3 text-purple-700 dark:text-purple-300">{row.principal_paid}</td>
                <td className="px-6 py-3 text-blue-700 dark:text-blue-300">{row.interest_paid}</td>
                <td className="px-6 py-3 font-mono text-gray-900 dark:text-gray-100">{row.remaining_balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 