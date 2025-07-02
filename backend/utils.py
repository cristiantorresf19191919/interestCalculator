from datetime import datetime, timedelta
from typing import List, Tuple


def calculate_compound_interest(principal: float, annual_rate: float, num_years: int) -> float:
    """
    Calculate the monthly payment for a loan using the compound interest formula.
    
    Args:
        principal: The loan amount
        annual_rate: Annual interest rate (as decimal, e.g., 0.12 for 12%)
        num_years: Number of years for the loan
        
    Returns:
        Monthly payment amount
    """
    monthly_rate = annual_rate / 12
    num_payments = num_years * 12
    
    # Handle the edge case of a 0% interest loan
    if monthly_rate == 0:
        return principal / num_payments
    
    # M = P * [r(1+r)^n] / [(1+r)^n-1]
    return principal * (monthly_rate * (1 + monthly_rate)**num_payments) / ((1 + monthly_rate)**num_payments - 1)


def calculate_loan_summary(principal: float, annual_rate: float, num_years: int) -> dict:
    """
    Calculate the complete loan summary including total payments and interest.
    
    Args:
        principal: The loan amount
        annual_rate: Annual interest rate (as decimal)
        num_years: Number of years for the loan
        
    Returns:
        Dictionary containing loan summary information
    """
    monthly_payment = calculate_compound_interest(principal, annual_rate, num_years)
    num_payments = num_years * 12
    total_paid = monthly_payment * num_payments
    total_interest = total_paid - principal
    
    return {
        "total_payment": f"${total_paid:,.2f}",
        "principal": f"${principal:,.2f}",
        "total_interest": f"${total_interest:,.2f}",
        "monthly_payment": f"${monthly_payment:,.2f}",
        "annual_interest_rate": f"{annual_rate * 100:.2f}%",
        "latest_date_of_payment_after_loan": f"{(datetime.now() + timedelta(days=num_payments * 30)).strftime('%Y-%m-%d')}"
    }


def generate_amortization_schedule(principal: float, annual_rate: float, num_years: int) -> List[dict]:
    """
    Generate a month-by-month amortization schedule for the loan.
    
    Args:
        principal: The loan amount
        annual_rate: Annual interest rate (as decimal)
        num_years: Number of years for the loan
        
    Returns:
        List of dictionaries containing monthly payment breakdowns
    """
    monthly_rate = annual_rate / 12
    num_payments = num_years * 12
    monthly_payment = calculate_compound_interest(principal, annual_rate, num_years)
    
    amortization_schedule = []
    remaining_balance = principal
    
    for month in range(1, num_payments + 1):
        interest_for_month = remaining_balance * monthly_rate
        principal_for_month = monthly_payment - interest_for_month
        remaining_balance -= principal_for_month
        
        # Adjust the final payment to ensure the balance is exactly zero
        if month == num_payments and remaining_balance != 0:
            principal_for_month += remaining_balance
            remaining_balance = 0

        amortization_schedule.append({
            "month": month,
            "monthly_payment": f"${monthly_payment:,.2f}",
            "principal_paid": f"${principal_for_month:,.2f}",
            "interest_paid": f"${interest_for_month:,.2f}",
            "remaining_balance": f"${remaining_balance:,.2f}"
        })
    
    return amortization_schedule


def validate_loan_amount(amount: float, minimum_amount: float, maximum_amount: float) -> Tuple[bool, str]:
    """
    Validate that a loan amount is within the allowed range.
    
    Args:
        amount: The requested loan amount
        minimum_amount: Minimum allowed amount
        maximum_amount: Maximum allowed amount
        
    Returns:
        Tuple of (is_valid, error_message)
    """
    if not (minimum_amount <= amount <= maximum_amount):
        error_msg = (
            f"Requested amount ${amount:,.2f} is not within the allowed range "
            f"(${minimum_amount:,.2f} - ${maximum_amount:,.2f}) for this loan."
        )
        return False, error_msg
    
    return True, "" 