from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models import Item, Loan, LoanSearch, LoanCalculation
from .services import loan_service, loan_calculation_service
from .config import settings


app = FastAPI(
    title=settings.API_TITLE,
    description=settings.API_DESCRIPTION,
    version=settings.API_VERSION,
    debug=settings.DEBUG
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/save-loan/{loan_id}")
def save_loan(loan_id: int, condition: Union[str, None] = None):
    return {"Msg": "Loan saved", "loan_id": loan_id, "condition": condition}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.is_offer, "item_id": item_id}


@app.post("/loans")
def create_loan(loan: Loan):
    return loan_service.create_loan(loan)


@app.get("/loans")
def get_loans(name: Union[str, None] = None):
    return loan_service.get_all_loans(name)


@app.get("/loans/{loan_id}")
def get_loan(loan_id: int):
    return loan_service.get_loan_by_id(loan_id)


@app.put("/loans/{loan_id}")
def edit_loan(loan_id: int, updated_loan_data: Loan):
    return loan_service.update_loan(loan_id, updated_loan_data)


@app.delete("/loans/{loan_id}")
def delete_loan(loan_id: int):
    return loan_service.delete_loan(loan_id)


@app.post("/loans/search")
def search_loans(search: LoanSearch):
    return loan_service.search_loans(search.productName)


@app.post("/calculate-loan")
def calculate_loan(calculation_input: LoanCalculation):
    return loan_calculation_service.calculate_loan(calculation_input) 