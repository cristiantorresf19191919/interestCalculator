"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useLoanMutation } from "@/lib/hooks";

export default function CreateLoanPage() {
  const router = useRouter();
  const { createLoan, loading: isLoading } = useLoanMutation();
  const [formData, setFormData] = useState({
    productName: "",
    minimumAmount: "",
    maximumAmount: "",
    anual_interest_rate: "",
  });

  const formatNumber = (value: string) => {
    const num = value.replace(/,/g, '');
    if (!num) return '';
    return Number(num).toLocaleString();
  };

  const parseNumber = (value: string) => value.replace(/,/g, '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'minimumAmount' || name === 'maximumAmount') {
      // Only allow numbers and commas
      const raw = value.replace(/[^\d]/g, '');
      setFormData((prev) => ({ ...prev, [name]: formatNumber(raw) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      productName: formData.productName,
      minimumAmount: Number(parseNumber(formData.minimumAmount)),
      maximumAmount: Number(parseNumber(formData.maximumAmount)),
      anual_interest_rate: Number(formData.anual_interest_rate),
    };

    try {
      await createLoan(body);
      toast.success("Préstamo creado con éxito!", {
        position: "top-center",
      });
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Ocurrió un error.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-500">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Crear Nuevo Préstamo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Completa el formulario para agregar un nuevo préstamo.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors duration-500">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="productName"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-2"
                >
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="minimumAmount"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-2"
                >
                  Monto Mínimo
                </label>
                <input
                  type="text"
                  name="minimumAmount"
                  id="minimumAmount"
                  value={formData.minimumAmount}
                  onChange={handleChange}
                  inputMode="numeric"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="maximumAmount"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-2"
                >
                  Monto Máximo
                </label>
                <input
                  type="text"
                  name="maximumAmount"
                  id="maximumAmount"
                  value={formData.maximumAmount}
                  onChange={handleChange}
                  inputMode="numeric"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="anual_interest_rate"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 block mb-2"
                >
                  Tasa de Interés Anual (ej. 0.25)
                </label>
                <input
                  type="number"
                  name="anual_interest_rate"
                  id="anual_interest_rate"
                  value={formData.anual_interest_rate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-700 dark:text-gray-200 font-semibold mb-8 transition-all duration-300 hover:-translate-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                style={{ position: 'absolute', top: 32, left: 32, zIndex: 10 }}
              >
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Volver</span>
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 transition-all"
              >
                {isLoading ? "Creando..." : "Crear Préstamo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 