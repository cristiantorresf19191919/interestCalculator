import { loans, Loan, LoanSearch, LoanCalculation, CalculationResult } from './data';

class LoanService {
  private loans: Loan[] = [...loans];

  getAllLoans(name?: string): Loan[] {
    if (name) {
      const results = this.loans.filter(loan => 
        loan.productName.toLowerCase().includes(name.toLowerCase())
      );
      if (results.length === 0) {
        throw new Error(`No loan found matching name '${name}'`);
      }
      return results;
    }
    return this.loans;
  }

  getLoanById(id: number): Loan {
    const loan = this.loans.find(loan => loan.id === id);
    if (!loan) {
      throw new Error(`Loan with id ${id} not found`);
    }
    return loan;
  }

  createLoan(loanData: Omit<Loan, 'id'>): Loan[] {
    const newLoan: Loan = {
      ...loanData,
      id: this.loans.length + 1
    };
    this.loans.push(newLoan);
    return this.loans;
  }

  updateLoan(id: number, loanData: Partial<Loan>): Loan {
    const loanIndex = this.loans.findIndex(loan => loan.id === id);
    if (loanIndex === -1) {
      throw new Error(`Loan with id ${id} not found`);
    }
    
    this.loans[loanIndex] = {
      ...this.loans[loanIndex],
      ...loanData,
      id
    };
    
    return this.loans[loanIndex];
  }

  deleteLoan(id: number): void {
    const loanIndex = this.loans.findIndex(loan => loan.id === id);
    if (loanIndex === -1) {
      throw new Error(`Loan with id ${id} not found`);
    }
    this.loans.splice(loanIndex, 1);
  }

  searchLoans(search: LoanSearch): Loan[] {
    const searchTerm = search.productName.toLowerCase();
    const results = this.loans.filter(loan => 
      loan.productName.toLowerCase().includes(searchTerm)
    );
    if (results.length === 0) {
      throw new Error(`No loan found matching name '${search.productName}'`);
    }
    return results;
  }

  calculateLoan(calculation: LoanCalculation): CalculationResult {
    const loanProduct = this.loans.find(loan => loan.productName === calculation.loanName);
    if (!loanProduct) {
      throw new Error(`Loan product '${calculation.loanName}' not found`);
    }

    if (calculation.amount < loanProduct.minimumAmount || calculation.amount > loanProduct.maximumAmount) {
      throw new Error(
        `Requested amount $${calculation.amount.toLocaleString()} is not within the allowed range ` +
        `($${loanProduct.minimumAmount.toLocaleString()} - $${loanProduct.maximumAmount.toLocaleString()}) for this loan`
      );
    }

    const principal = calculation.amount;
    const annualRate = calculation.customInterestRate ?? loanProduct.anual_interest_rate;
    const numYears = calculation.years;
    const monthlyRate = annualRate / 12;
    const numPayments = numYears * 12;

    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = principal / numPayments;
    } else {
      monthlyPayment = this.calculateCompoundInterest(principal, annualRate, numYears);
    }

    const totalPaid = monthlyPayment * numPayments;
    const totalInterest = totalPaid - principal;

    const summary = {
      total_payment: `$${totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      principal: `$${principal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      total_interest: `$${totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      monthly_payment: `$${monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      annual_interest_rate: `${(annualRate * 100).toFixed(2)}%`,
      latest_date_of_payment_after_loan: this.calculateEndDate(numPayments)
    };

    const amortizationSchedule = this.generateAmortizationSchedule(
      principal, monthlyRate, monthlyPayment, numPayments
    );

    return { summary, amortization_schedule: amortizationSchedule };
  }

  private calculateCompoundInterest(principal: number, annualRate: number, numYears: number): number {
    const monthlyRate = annualRate / 12;
    const numPayments = numYears * 12;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
           (Math.pow(1 + monthlyRate, numPayments) - 1);
  }

  private calculateEndDate(numPayments: number): string {
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + numPayments);
    return endDate.toISOString().split('T')[0];
  }

  private generateAmortizationSchedule(
    principal: number, 
    monthlyRate: number, 
    monthlyPayment: number, 
    numPayments: number
  ) {
    const schedule = [];
    let remainingBalance = principal;

    for (let month = 1; month <= numPayments; month++) {
      const interestForMonth = remainingBalance * monthlyRate;
      let principalForMonth = monthlyPayment - interestForMonth;
      remainingBalance -= principalForMonth;

      if (month === numPayments && Math.abs(remainingBalance) > 0.01) {
        principalForMonth += remainingBalance;
        remainingBalance = 0;
      }

      schedule.push({
        month,
        monthly_payment: `$${monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        principal_paid: `$${principalForMonth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        interest_paid: `$${interestForMonth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        remaining_balance: `$${Math.max(0, remainingBalance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      });
    }

    return schedule;
  }
}

export const loanService = new LoanService(); 