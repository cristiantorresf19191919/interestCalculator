import { useState, useEffect, useCallback } from 'react';
import { api, ApiError } from './api';
import { Loan, LoanCalculation, CalculationResult } from './data';

export const useLoans = (name?: string) => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLoans = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.loans.getAll(name);
      setLoans(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to fetch loans');
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  return { loans, loading, error, refetch: fetchLoans };
};

export const useLoan = (id: number) => {
  const [loan, setLoan] = useState<Loan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLoan = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.loans.getById(id);
      setLoan(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to fetch loan');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchLoan();
  }, [fetchLoan]);

  return { loan, loading, error, refetch: fetchLoan };
};

export const useLoanCalculation = () => {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback(async (calculation: LoanCalculation) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.calculate.loan(calculation);
      setResult(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to calculate loan');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { result, loading, error, calculate };
};

export const useLoanMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createLoan = useCallback(async (loanData: Omit<Loan, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      return await api.loans.create(loanData);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to create loan');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateLoan = useCallback(async (id: number, loanData: Partial<Loan>) => {
    try {
      setLoading(true);
      setError(null);
      return await api.loans.update(id, loanData);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to update loan');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteLoan = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await api.loans.delete(id);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to delete loan');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createLoan, updateLoan, deleteLoan, loading, error };
}; 