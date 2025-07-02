import LoanList from "@/components/loans/loan-list";

export default function Home() {
  return (
    <div className="mx-auto py-8 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-500">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Loan Products</h1>
      <LoanList />
    </div>
  );
}
