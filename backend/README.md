# Backend Architecture

This backend follows SOLID principles and clean architecture patterns, with each module having a single responsibility.

## Project Structure

```
backend/
├── __init__.py          # Package initialization
├── main.py             # FastAPI application and route definitions
├── models.py           # Pydantic models for data validation
├── services.py         # Business logic layer
├── database.py         # Data access layer (simulated database)
├── utils.py            # Utility functions and calculations
├── config.py           # Configuration settings
└── README.md           # This file
```

## Architecture Overview

### 1. **Models** (`models.py`)
- **Responsibility**: Data validation and structure
- **Contains**: Pydantic models for request/response validation
- **Examples**: `Loan`, `LoanCalculation`, `LoanSearch`

### 2. **Database** (`database.py`)
- **Responsibility**: Data persistence and access
- **Contains**: `LoanDatabase` class with CRUD operations
- **Note**: Currently uses in-memory storage, easily replaceable with real database

### 3. **Services** (`services.py`)
- **Responsibility**: Business logic and orchestration
- **Contains**: 
  - `LoanService`: Handles loan CRUD operations
  - `LoanCalculationService`: Handles loan calculations
- **Benefits**: Separates business logic from HTTP handling

### 4. **Utils** (`utils.py`)
- **Responsibility**: Pure functions and calculations
- **Contains**: Mathematical functions for loan calculations
- **Benefits**: Reusable, testable, and independent of business logic

### 5. **Config** (`config.py`)
- **Responsibility**: Application configuration
- **Contains**: Settings class with CORS, API metadata, etc.
- **Benefits**: Centralized configuration management

### 6. **Main** (`main.py`)
- **Responsibility**: HTTP routing and request handling
- **Contains**: FastAPI app initialization and endpoint definitions
- **Benefits**: Thin layer that delegates to services

## SOLID Principles Applied

### Single Responsibility Principle (SRP)
- Each module has one clear purpose
- Functions are focused and cohesive

### Open/Closed Principle (OCP)
- Services can be extended without modifying existing code
- New loan types can be added without changing calculation logic

### Liskov Substitution Principle (LSP)
- Database interface can be replaced with different implementations
- Service interfaces are consistent

### Interface Segregation Principle (ISP)
- Services expose only necessary methods
- Models are specific to their use cases

### Dependency Inversion Principle (DIP)
- High-level modules (services) don't depend on low-level modules (database)
- Both depend on abstractions

## Benefits of This Architecture

1. **Testability**: Each component can be tested in isolation
2. **Maintainability**: Changes are localized to specific modules
3. **Scalability**: Easy to add new features or replace components
4. **Readability**: Clear separation of concerns
5. **Reusability**: Utils and services can be reused across different parts

## Running the Application

```bash
# Install dependencies
pip install -r requirements.txt

# Run the application
python app.py

# Or using uvicorn directly
uvicorn backend.main:app --reload
```

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc 