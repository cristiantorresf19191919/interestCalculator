from typing import List


class Settings:
    """Application configuration settings."""
    
    # CORS Configuration
    CORS_ORIGINS: List[str] = [
        "http://localhost",
        "http://localhost:3000",
        "http://localhost:8080",
        # Add any other frontend origins you might have
    ]
    
    # API Configuration
    API_TITLE: str = "Loan Management API"
    API_DESCRIPTION: str = "A FastAPI application for managing loans and calculating payments"
    API_VERSION: str = "1.0.0"
    
    # Database Configuration (for future use)
    DATABASE_URL: str = "sqlite:///./loans.db"  # Placeholder for future database integration
    
    # Application Configuration
    DEBUG: bool = True


# Global settings instance
settings = Settings() 