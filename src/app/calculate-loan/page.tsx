"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLoanCalculation } from "@/lib/hooks";
import { LoanCalculation } from "@/types";

function LoanCalculator() {
  const searchParams = useSearchParams();
  const loanName = searchParams.get("loanName");
  const minAmount = Number(searchParams.get("minAmount")) || 0;
  const maxAmount = Number(searchParams.get("maxAmount")) || 100000;
  const interestRateFromPage = Number(searchParams.get("interestRate")) || 0;
  const [amount, setAmount] = useState(minAmount);
  const [years, setYears] = useState(1);
  const [interestRateInput, setInterestRateInput] = useState((interestRateFromPage * 100).toString());
  const [interestRate, setInterestRate] = useState(interestRateFromPage);
  
  const { result, loading: isLoading, error, calculate } = useLoanCalculation();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    setAmount(Number(value));
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and a single dot
    if (/^\d*\.?\d*$/.test(value)) {
      setInterestRateInput(value);
      const num = parseFloat(value);
      setInterestRate(isNaN(num) ? 0 : num / 100);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (amount < minAmount || amount > maxAmount) {
      return;
    }

    const calculation: LoanCalculation = {
      amount: Number(amount),
      loanName: loanName || '',
      years: Number(years),
      customInterestRate: Number(interestRate),
    };

    await calculate(calculation);
  };

  const summary = result?.summary;
  const amortizationSchedule = result?.amortization_schedule;
    
    const router = useRouter();

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-500">
          { /*Go back button*/}
          
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-700 dark:text-gray-200 font-semibold mb-8 transition-all duration-300 hover:-translate-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              style={{ position: 'absolute', top: 32, left: 32, zIndex: 10 }}
            >
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Volver</span>
            </button>
        
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Calculadora de prestamos</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Calcula tu pago mensual para el{" "}
            <span className="font-semibold text-indigo-600">{loanName}</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors duration-500">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Amount Input */}
              <div>
                <label
                  htmlFor="amount"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-2"
                >
                  Cantidad del prestamo
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                    $
                  </span>
                  <input
                    type="text"
                    id="amount"
                    value={amount.toLocaleString()}
                    onChange={handleAmountChange}
                    className="w-full pl-7 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition"
                    placeholder="e.g., 50,000"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Ingrese una cantidad entre ${minAmount.toLocaleString()} y $
                  {maxAmount.toLocaleString()}.
                </p>
              </div>

              {/* Years Input */}
              <div>
                <label
                  htmlFor="years"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-2"
                >
                  Plazo del prestamo (Años)
                </label>
                <input
                  type="number"
                  id="years"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition"
                  min="1"
                  max="30"
                />
                          </div>

            {/* Rate */}
              <div>
                <label
                  htmlFor="interestRate"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-2"
                >
                  Tasa de interes anual
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-400">
                    %
                  </span>
                  <input
                    type="text"
                    id="interestRate"
                    value={interestRateInput}
                    onChange={handleInterestRateChange}
                    inputMode="decimal"
                    className="w-full pl-7 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition"
                    placeholder="e.g., 20.5"
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Ingrese una cantidad entre ${minAmount.toLocaleString()} y $
                  {maxAmount.toLocaleString()}.
                </p>
              </div>
                          
              
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white font-bold py-4 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 transition-all duration-300 ease-in-out"
              >
                {isLoading ? "Calculando..." : "Calcular"}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="mt-6 text-center text-red-500 bg-red-100 p-4 rounded-lg">
            {error}
          </div>
        )}

        {summary && (
          <div className="mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-fade-in-up transition-colors duration-500">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
              Resumen del prestamo
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Pago mensual</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {summary.monthly_payment}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Interes total</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {summary.total_interest}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Pago Total</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {summary.total_payment}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Valor del prestamo</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {summary.principal}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Tasa de interes anual</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {summary.annual_interest_rate}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Fecha de pago final</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {summary.latest_date_of_payment_after_loan}
                </p>
              </div>
            </div>
          </div>
        )}

        {amortizationSchedule && (
          <div className="mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 animate-fade-in-up transition-colors duration-500">
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
              Plan de amortizacion
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Mes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Pago mensual
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Abono a Capital
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Interes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Saldo 
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {amortizationSchedule.map((row) => (
                    <tr key={row.month}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                        {row.month}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                        {row.monthly_payment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                        {row.principal_paid}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                        {row.interest_paid}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                        {row.remaining_balance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CalculateLoanPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <LoanCalculator />
    </Suspense>
  );
} 