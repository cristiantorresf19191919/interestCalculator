"""
Main entry point for the Loan Management API.
This file imports the modular FastAPI application from the backend package.
"""

from backend.main import app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 