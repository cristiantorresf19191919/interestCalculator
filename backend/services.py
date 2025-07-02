from typing import List, Optional
from fastapi import HTTPException

from .models import Loan, LoanCalculation
from .database import loan_db
from .utils import calculate_loan_summary, generate_amortization_schedule, validate_loan_amount


class LoanService:
    """Service class for loan-related business logic."""
    
    @staticmethod
    def get_all_loans(name_filter: Optional[str] = None) -> List[dict]:
        """Get all loans, optionally filtered by name."""
        if name_filter:
            loans = loan_db.get_loans_by_name(name_filter)
            if not loans:
                raise HTTPException(
                    status_code=404, 
                    detail=f"No loan found matching name '{name_filter}'"
                )
            return loans
        return loan_db.get_all_loans()
    
    @staticmethod
    def get_loan_by_id(loan_id: int) -> dict:
        """Get a loan by its ID."""
        loan = loan_db.get_loan_by_id(loan_id)
        if not loan:
            raise HTTPException(
                status_code=404, 
                detail=f"Loan with id {loan_id} not found"
            )
        return loan
    
    @staticmethod
    def create_loan(loan: Loan) -> List[dict]:
        """Create a new loan."""
        loan_dict = loan_db.create_loan(loan)
        return loan_db.get_all_loans()
    
    @staticmethod
    def update_loan(loan_id: int, updated_loan: Loan) -> dict:
        """Update an existing loan."""
        loan_dict = loan_db.update_loan(loan_id, updated_loan)
        if not loan_dict:
            raise HTTPException(
                status_code=404, 
                detail=f"Loan with id {loan_id} not found"
            )
        return loan_dict
    
    @staticmethod
    def delete_loan(loan_id: int) -> dict:
        """Delete a loan."""
        success = loan_db.delete_loan(loan_id)
        if not success:
            raise HTTPException(
                status_code=404, 
                detail=f"Loan with id {loan_id} not found"
            )
        return {"message": f"Loan with id {loan_id} deleted successfully"}
    
    @staticmethod
    def search_loans(search_term: str) -> List[dict]:
        """Search loans by product name."""
        loans = loan_db.get_loans_by_name(search_term)
        if not loans:
            raise HTTPException(
                status_code=404, 
                detail=f"No loan found matching name '{search_term}'"
            )
        return loans


class LoanCalculationService:
    """Service class for loan calculation business logic."""
    
    @staticmethod
    def calculate_loan(calculation_input: LoanCalculation) -> List[dict]:
        """Calculate loan payments and generate amortization schedule."""
        # Find the loan product
        loan_product = loan_db.get_loan_by_name(calculation_input.loanName)
        if not loan_product:
            raise HTTPException(
                status_code=404, 
                detail=f"Loan product '{calculation_input.loanName}' not found."
            )
        
        # Validate loan amount
        is_valid, error_message = validate_loan_amount(
            calculation_input.amount,
            loan_product["minimumAmount"],
            loan_product["maximumAmount"]
        )
        if not is_valid:
            raise HTTPException(status_code=400, detail=error_message)
        
        # Determine interest rate
        annual_rate = (
            calculation_input.customInterestRate 
            if calculation_input.customInterestRate is not None 
            else loan_product["anual_interest_rate"]
        )
        
        # Calculate loan summary and amortization schedule
        summary = calculate_loan_summary(
            calculation_input.amount,
            annual_rate,
            calculation_input.years
        )
        
        amortization_schedule = generate_amortization_schedule(
            calculation_input.amount,
            annual_rate,
            calculation_input.years
        )
        
        return [{"summary": summary}, amortization_schedule]


# Service instances
loan_service = LoanService()
loan_calculation_service = LoanCalculationService() 