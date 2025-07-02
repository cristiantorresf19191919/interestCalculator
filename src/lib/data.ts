export interface Loan {
  id: number;
  productName: string;
  minimumAmount: number;
  maximumAmount: number;
  anual_interest_rate: number;
}

export interface LoanSearch {
  productName: string;
}

export interface LoanCalculation {
  amount: number;
  loanName: string;
  years: number;
  customInterestRate?: number;
}

export interface LoanSummary {
  total_payment: string;
  principal: string;
  total_interest: string;
  monthly_payment: string;
  annual_interest_rate: string;
  latest_date_of_payment_after_loan: string;
}

export interface AmortizationEntry {
  month: number;
  monthly_payment: string;
  principal_paid: string;
  interest_paid: string;
  remaining_balance: string;
}

export interface CalculationResult {
  summary: LoanSummary;
  amortization_schedule: AmortizationEntry[];
}

const loans: Loan[] = [
  { id: 1, productName: "Libranza", minimumAmount: 5000000, maximumAmount: 50000000, anual_interest_rate: 0.165 },
  { id: 2, productName: "Hipotecario Vivienda", minimumAmount: 20000000, maximumAmount: 500000000, anual_interest_rate: 0.12 },
  { id: 3, productName: "Crédito de Consumo", minimumAmount: 1000000, maximumAmount: 25000000, anual_interest_rate: 0.21 },
  { id: 4, productName: "Crédito Vehicular", minimumAmount: 15000000, maximumAmount: 150000000, anual_interest_rate: 0.15 },
  { id: 5, productName: "Crédito Educativo", minimumAmount: 2000000, maximumAmount: 60000000, anual_interest_rate: 0.09 },
  { id: 6, productName: "Crédito de Libre Inversión", minimumAmount: 1000000, maximumAmount: 40000000, anual_interest_rate: 0.24 },
  { id: 7, productName: "Microcrédito para Negocio", minimumAmount: 500000, maximumAmount: 25000000, anual_interest_rate: 0.30 }
];

export { loans }; 