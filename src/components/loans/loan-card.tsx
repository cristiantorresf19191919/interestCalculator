"use client";
//client site rendering vs server side rendering
//next.js

import { Loan } from "@/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useLoanMutation } from "@/lib/hooks";

interface LoanCardProps {
  loan: Loan & { id: number | string };
}

export default function LoanCard({ loan }: LoanCardProps) {
  const router = useRouter();
  const { deleteLoan, loading: deleteLoading } = useLoanMutation();

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
      className="group relative w-full max-w-sm cursor-pointer rounded-3xl bg-white p-8 shadow-xl border border-gray-100 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-indigo-200 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50"
      style={{ minHeight: 220 }}
    >
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={handleEdit}
          className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-indigo-600 transition-all duration-200 cursor-pointer hover:scale-125"
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
          className="p-2 text-red-500 rounded-full hover:bg-red-100 hover:text-red-700 transition-all duration-200 cursor-pointer hover:scale-125"
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
      <div className="flex flex-col gap-2 justify-center items-start h-full">
        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors mb-1">
          {loan.productName}
        </h3>
        <p className="text-base text-gray-500">
          Cantidad: <span className="font-semibold text-gray-800">${loan.minimumAmount.toLocaleString()} - ${loan.maximumAmount.toLocaleString()}</span>
        </p>
        <p className="text-base text-gray-500">
          Tasa de interes anual: <span className="font-semibold text-indigo-600">{(loan.anual_interest_rate * 100).toFixed(2)}%</span>
        </p>
      </div>
    </div>
  );
} 