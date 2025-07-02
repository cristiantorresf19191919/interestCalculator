'use client';

import { Loan } from "@/types";
import LoanCard from "./loan-card";
import Link from "next/link";
import { useLoans } from "@/lib/hooks";

export default function LoanList() {
  const { loans, loading, error } = useLoans();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-4xl font-extrabold mb-2 text-center text-gray-900 tracking-tight">Loan Products</h2>
      <p className="text-lg text-gray-600 mb-8 text-center font-medium">Por favor selecciona un prestamo</p>
      {loans.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl animate-fade-in">
          {loans.map((loan, idx) => (
            <div
              key={loan.id}
              style={{ animationDelay: `${idx * 80}ms` }}
              className="opacity-0 animate-fade-in-card"
            >
              <LoanCard loan={loan} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No loans available at the moment.</p>
      )}
      <div className="text-center mt-12 mb-8">
        <Link
          href="/loans/create"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-4 px-10 rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 text-lg"
        >
          Agregar Nuevo Préstamo
        </Link>
      </div>
    </div>
  );
}
