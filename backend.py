from typing import Union

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS Middleware Configuration
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
    # Add any other frontend origins you might have
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def calculate_compound_interest(principal, annual_rate, num_years):
    monthly_rate = annual_rate / 12
    num_payments = num_years * 12
    # M = P * [r(1+r)^n] / [(1+r)^n-1]
    return principal * (monthly_rate * (1 + monthly_rate)**num_payments) / ((1 + monthly_rate)**num_payments - 1)


@app.get("/")
def read_root():
    return {"Hello": "World"}

#REST API
#Query Parameters
#Path Parameters
@app.get("/save-loan/{loan_id}")
def save_loan(loan_id: int, condition: Union[str, None] = None):
    return {"Msg": "Loan saved", "loan_id": loan_id, "condition": condition}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None

#Controllers
@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.is_offer, "item_id": item_id}


#Database simulated
loans = [
    {"id": 1, "productName": "Libranza", "minimumAmount": 5000000, "maximumAmount": 50000000, "anual_interest_rate": 0.165},
    {"id": 2, "productName": "Hipotecario Vivienda", "minimumAmount": 20000000, "maximumAmount": 500000000, "anual_interest_rate": 0.12},
    {"id": 3, "productName": "Crédito de Consumo", "minimumAmount": 1000000, "maximumAmount": 25000000, "anual_interest_rate": 0.21},
    {"id": 4, "productName": "Crédito Vehicular", "minimumAmount": 15000000, "maximumAmount": 150000000, "anual_interest_rate": 0.15},
    {"id": 5, "productName": "Crédito Educativo", "minimumAmount": 2000000, "maximumAmount": 60000000, "anual_interest_rate": 0.09},
    {"id": 6, "productName": "Crédito de Libre Inversión", "minimumAmount": 1000000, "maximumAmount": 40000000, "anual_interest_rate": 0.24},
    {"id": 7, "productName": "Microcrédito para Negocio", "minimumAmount": 500000, "maximumAmount": 25000000, "anual_interest_rate": 0.30}]
class Loan(BaseModel):
    id: Union[int, None] = None
    productName: str
    minimumAmount: float
    maximumAmount: float
    anual_interest_rate: float

class LoanSearch(BaseModel):
    productName: str

@app.post("/loans")
def create_loan(loan: Loan):
    #id auto increment
    loan.id = len(loans) + 1
    #model_dump() convierte una instancia de un modelo Pydantic en un diccionario de Python.
    loans.append(loan.model_dump())
    return loans

@app.post("/loans/search")
def search_loans(search: LoanSearch):
    search_term = search.productName.lower()
    results = [loan for loan in loans if search_term in loan["productName"].lower()]
    if not results:
        raise HTTPException(status_code=404, detail=f"No loan found matching name '{search.productName}'")
    return results

#Get all loans
@app.get("/loans")
def get_loans(name: Union[str, None] = None):
    if name:
        # Using "in" for a partial match, and lower() for case-insensitivity
        results = [loan for loan in loans if name.lower() in loan["productName"].lower()]
        if not results:
            raise HTTPException(status_code=404, detail=f"No loan found matching name '{name}'")
        return results
    return loans

#Get a loan by id
@app.get("/loans/{loan_id}")
def get_loan(loan_id: int):
    loan = next((item for item in loans if item["id"] == loan_id), None)
    if loan:
        return loan
    raise HTTPException(status_code=404, detail=f"Loan with id {loan_id} not found")

#Edit the loan by id or name
@app.put("/loans/{loan_id}")
def edit_loan(loan_id: int, updated_loan_data: Loan):
    # Find the existing loan dictionary in our list
    loan_in_db = next((item for item in loans if item["id"] == loan_id), None)
    
    if loan_in_db:
        # Convert the incoming Pydantic model to a dictionary.
        # Using exclude_unset=True allows for partial updates (e.g., only changing the interest rate)
        update_data = updated_loan_data.model_dump(exclude_unset=True)
        
        # Update the fields of the existing dictionary with the new data
        loan_in_db.update(update_data)
        
        # Ensure the ID from the URL path is always respected
        loan_in_db["id"] = loan_id
        
        return loan_in_db
        
    raise HTTPException(status_code=404, detail=f"Loan with id {loan_id} not found")

#Calculate the loan
class LoanCalculation(BaseModel):
    amount: float
    loanName: str
    years: int
    customInterestRate: Union[float, None] = None

@app.post("/calculate-loan")
def calculate_loan(calculation_input: LoanCalculation):
    # Find the loan product from our list by its name
    loan_product = next((item for item in loans if item["productName"] == calculation_input.loanName), None)
    
    if not loan_product:
        raise HTTPException(status_code=404, detail=f"Loan product '{calculation_input.loanName}' not found.")

    # Validate that the requested amount is within the allowed range for this loan product
    if not (loan_product["minimumAmount"] <= calculation_input.amount <= loan_product["maximumAmount"]):
        raise HTTPException(
            status_code=400, 
            detail=(
                f"Requested amount ${calculation_input.amount:,.2f} is not within the allowed range "
                f"(${loan_product['minimumAmount']:,.2f} - ${loan_product['maximumAmount']:,.2f}) for this loan."
            )
        )
    
    principal = calculation_input.amount
    annual_rate = calculation_input.customInterestRate if calculation_input.customInterestRate is not None else loan_product["anual_interest_rate"]
    num_years = calculation_input.years
    
    # Standard formula for calculating fixed monthly payments on an amortizing loan
    monthly_rate = annual_rate / 12
    num_payments = num_years * 12

    # Handle the edge case of a 0% interest loan
    if monthly_rate == 0:
        monthly_payment = principal / num_payments
    else:
        # M = P * [r(1+r)^n] / [(1+r)^n-1]
        monthly_payment = calculate_compound_interest(principal, annual_rate, num_years)

    total_paid = monthly_payment * num_payments
    total_interest = total_paid - principal

    # Create the summary object
    summary = {
        "summary": {
            "total_payment": f"${total_paid:,.2f}",
            "principal": f"${principal:,.2f}",
            "total_interest": f"${total_interest:,.2f}",
            "monthly_payment": f"${monthly_payment:,.2f}",
            "annual_interest_rate": f"{annual_rate * 100:.2f}%",
            "latest_date_of_payment_after_loan": f"{(datetime.now() + timedelta(days=num_payments * 30)).strftime('%Y-%m-%d')}"
        }
    }
    
    # Generate the month-by-month amortization schedule
    amortization_schedule = []
    remaining_balance = principal
    
    for month in range(1, num_payments + 1):
        interest_for_month = remaining_balance * monthly_rate
        principal_for_month = monthly_payment - interest_for_month
        remaining_balance -= principal_for_month
        
        # Adjust the final payment to ensure the balance is exactly zero, avoiding floating-point inaccuracies
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
        
    return [summary, amortization_schedule]

@app.delete("/loans/{loan_id}")
def delete_loan(loan_id: int):
    loan = next((item for item in loans if item["id"] == loan_id), None)
    if loan:
        loans.remove(loan)
        return {"message": f"Loan with id {loan_id} deleted successfully"}
    raise HTTPException(status_code=404, detail=f"Loan with id {loan_id} not found")