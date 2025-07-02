from typing import List, Optional
from .models import Loan


class LoanDatabase:
    def __init__(self):
        # Simulated database - in a real app, this would be a database connection
        self._loans: List[dict] = [
            {"id": 1, "productName": "Libranza", "minimumAmount": 5000000, "maximumAmount": 50000000, "anual_interest_rate": 0.165},
            {"id": 2, "productName": "Hipotecario Vivienda", "minimumAmount": 20000000, "maximumAmount": 500000000, "anual_interest_rate": 0.12},
            {"id": 3, "productName": "Crédito de Consumo", "minimumAmount": 1000000, "maximumAmount": 25000000, "anual_interest_rate": 0.21},
            {"id": 4, "productName": "Crédito Vehicular", "minimumAmount": 15000000, "maximumAmount": 150000000, "anual_interest_rate": 0.15},
            {"id": 5, "productName": "Crédito Educativo", "minimumAmount": 2000000, "maximumAmount": 60000000, "anual_interest_rate": 0.09},
            {"id": 6, "productName": "Crédito de Libre Inversión", "minimumAmount": 1000000, "maximumAmount": 40000000, "anual_interest_rate": 0.24},
            {"id": 7, "productName": "Microcrédito para Negocio", "minimumAmount": 500000, "maximumAmount": 25000000, "anual_interest_rate": 0.30}
        ]

    def get_all_loans(self) -> List[dict]:
        """Get all loans from the database."""
        return self._loans.copy()

    def get_loan_by_id(self, loan_id: int) -> Optional[dict]:
        """Get a loan by its ID."""
        return next((loan for loan in self._loans if loan["id"] == loan_id), None)

    def get_loans_by_name(self, name: str) -> List[dict]:
        """Get loans that match the given name (case-insensitive partial match)."""
        name_lower = name.lower()
        return [loan for loan in self._loans if name_lower in loan["productName"].lower()]

    def create_loan(self, loan: Loan) -> dict:
        """Create a new loan in the database."""
        loan_dict = loan.model_dump()
        loan_dict["id"] = len(self._loans) + 1
        self._loans.append(loan_dict)
        return loan_dict

    def update_loan(self, loan_id: int, updated_loan: Loan) -> Optional[dict]:
        """Update an existing loan in the database."""
        loan_index = next((i for i, loan in enumerate(self._loans) if loan["id"] == loan_id), None)
        
        if loan_index is None:
            return None
            
        update_data = updated_loan.model_dump(exclude_unset=True)
        self._loans[loan_index].update(update_data)
        self._loans[loan_index]["id"] = loan_id  # Ensure ID from URL is respected
        
        return self._loans[loan_index]

    def delete_loan(self, loan_id: int) -> bool:
        """Delete a loan from the database."""
        loan_index = next((i for i, loan in enumerate(self._loans) if loan["id"] == loan_id), None)
        
        if loan_index is None:
            return False
            
        self._loans.pop(loan_index)
        return True

    def get_loan_by_name(self, loan_name: str) -> Optional[dict]:
        """Get a loan by its exact name."""
        return next((loan for loan in self._loans if loan["productName"] == loan_name), None)


# Global database instance
loan_db = LoanDatabase() 