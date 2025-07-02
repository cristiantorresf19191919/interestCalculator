"use client";

import { Loan } from "@/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useLoanMutation } from "@/lib/hooks";

interface LoanCardProps {
  loan: Loan & { id: number | string };
}

// Function to get gradient based on loan type
const getLoanGradient = (loanName: string) => {
  const gradients = {
    'Libranza': 'from-green-400 to-emerald-500',
    'Hipotecario Vivienda': 'from-blue-400 to-cyan-500',
    'Crédito de Consumo': 'from-purple-400 to-pink-500',
    'Crédito Vehicular': 'from-orange-400 to-red-500',
    'Crédito Educativo': 'from-indigo-400 to-purple-500',
    'Crédito de Libre Inversión': 'from-teal-400 to-blue-500',
    'Microcrédito para Negocio': 'from-yellow-400 to-orange-500'
  };
  return gradients[loanName as keyof typeof gradients] || 'from-blue-400 to-purple-500';
};

// Function to get icon based on loan type
const getLoanIcon = (loanName: string) => {
  const icons = {
    'Libranza': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    'Hipotecario Vivienda': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    'Crédito de Consumo': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    'Crédito Vehicular': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    'Crédito Educativo': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    'Crédito de Libre Inversión': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    'Microcrédito para Negocio': (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  };
  return icons[loanName as keyof typeof icons] || (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
  );
};

export default function LoanCard({ loan }: LoanCardProps) {
  const router = useRouter();
  const { deleteLoan, loading: deleteLoading } = useLoanMutation();
  const gradient = getLoanGradient(loan.productName);
  const icon = getLoanIcon(loan.productName);

  const handleSelectLoan = () => {
    toast.success(`You have selected the ${loan.productName} loan.`, {
      duration: 450,
      position: "top-center",
    });
    const params = new URLSearchParams();
    params.set("loanName", loan.productName);
    params.set("minAmount", loan.minimumAmount.toString());
    params.set("maxAmount", loan.maximumAmount.toString());
    params.set("interestRate", loan.anual_interest_rate.toString());
    setTimeout(() => {
      router.push(`/calculate-loan?${params.toString()}`);
    }, 450);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    const params = new URLSearchParams();
    params.set("productName", loan.productName);
    params.set("minimumAmount", loan.minimumAmount.toString());
    params.set("maximumAmount", loan.maximumAmount.toString());
    params.set(
      "anual_interest_rate",
      loan.anual_interest_rate.toString()
    );
    router.push(`/loans/edit/${loan.id}?${params.toString()}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast(
      (t) => (
        <div className="flex flex-col items-center gap-4">
          <p className="text-center">
            ¿Estás seguro que quieres borrar este préstamo?
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                confirmDelete();
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Sí, borrar
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            >
              No, cancelar
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000,
        position: "top-center",
      }
    );
  };

  const confirmDelete = async () => {
    try {
      await deleteLoan(loan.id);
      toast.success("Préstamo borrado con éxito!");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Ocurrió un error.");
    }
  };

  return (
    <div
      onClick={handleSelectLoan}
      className="group relative w-full max-w-sm cursor-pointer rounded-3xl bg-white dark:bg-gray-800 p-8 shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-transparent hover:bg-gradient-to-br hover:from-white hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-700 overflow-hidden"
      style={{ minHeight: 280 }}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      {/* Floating action buttons */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={handleEdit}
          className="p-2 text-gray-500 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 cursor-pointer hover:scale-125 glass"
          title="Editar préstamo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={handleDelete}
          className="p-2 text-red-500 rounded-full hover:bg-red-100 hover:text-red-700 transition-all duration-200 cursor-pointer hover:scale-125 glass"
          title="Borrar préstamo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col gap-4 justify-center items-start h-full">
        {/* Header with icon */}
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center text-white shadow-lg`}>
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
              {loan.productName}
            </h3>
            <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-1"></div>
          </div>
        </div>

        {/* Loan details */}
        <div className="space-y-3 w-full">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Amount Range</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">USD</span>
            </div>
            <div className="text-lg font-bold text-gray-800 dark:text-white mt-1">
              ${loan.minimumAmount.toLocaleString()} - ${loan.maximumAmount.toLocaleString()}
            </div>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Annual Interest Rate</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">APR</span>
            </div>
            <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 mt-1">
              {(loan.anual_interest_rate * 100).toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Action indicator */}
        <div className="w-full mt-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            <span>Click to calculate</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-500/10 to-yellow-500/10 rounded-full blur-lg"></div>
    </div>
  );
} 