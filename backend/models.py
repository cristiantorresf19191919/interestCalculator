from typing import Union
from pydantic import BaseModel


class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None


class Loan(BaseModel):
    id: Union[int, None] = None
    productName: str
    minimumAmount: float
    maximumAmount: float
    anual_interest_rate: float


class LoanSearch(BaseModel):
    productName: str


class LoanCalculation(BaseModel):
    amount: float
    loanName: str
    years: int
    customInterestRate: Union[float, None] = None


class LoanSummary(BaseModel):
    total_payment: str
    principal: str
    total_interest: str
    monthly_payment: str
    annual_interest_rate: str
    latest_date_of_payment_after_loan: str


class AmortizationEntry(BaseModel):
    month: int
    monthly_payment: str
    principal_paid: str
    interest_paid: str
    remaining_balance: str


class CalculationResponse(BaseModel):
    summary: LoanSummary
    amortization_schedule: list[AmortizationEntry] 