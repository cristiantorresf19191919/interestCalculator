import { loanService } from './loan-service';
import { Loan, LoanSearch, LoanCalculation, CalculationResult } from './data';

export class ApiError extends Error {
  constructor(message: string, public statusCode: number = 400) {
    super(message);
    this.name = 'ApiError';
  }
}

const simulateApiCall = <T>(operation: () => T): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = operation();
        resolve(result);
      } catch (error) {
        if (error instanceof Error) {
          reject(new ApiError(error.message, 404));
        } else {
          reject(new ApiError('An unexpected error occurred'));
        }
      }
    }, Math.random() * 500 + 100);
  });
};

export const api = {
  loans: {
    getAll: (name?: string): Promise<Loan[]> => 
      simulateApiCall(() => loanService.getAllLoans(name)),

    getById: (id: number): Promise<Loan> => 
      simulateApiCall(() => loanService.getLoanById(id)),

    create: (loanData: Omit<Loan, 'id'>): Promise<Loan[]> => 
      simulateApiCall(() => loanService.createLoan(loanData)),

    update: (id: number, loanData: Partial<Loan>): Promise<Loan> => 
      simulateApiCall(() => loanService.updateLoan(id, loanData)),

    delete: (id: number): Promise<void> => 
      simulateApiCall(() => loanService.deleteLoan(id)),

    search: (search: LoanSearch): Promise<Loan[]> => 
      simulateApiCall(() => loanService.searchLoans(search))
  },

  calculate: {
    loan: (calculation: LoanCalculation): Promise<CalculationResult> => 
      simulateApiCall(() => loanService.calculateLoan(calculation))
  }
}; 