'use client';

import { Loan } from "@/types";
import LoanCard from "./loan-card";
import Link from "next/link";
import { useLoans } from "@/lib/hooks";
import Image from "next/image";

export default function LoanList() {
  const { loans, loading, error } = useLoans();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64">
        <div className="spinner w-16 h-16 mb-4"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
          Loading amazing loan options...
        </p>
        <div className="mt-4 flex space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="glass rounded-2xl p-8 max-w-md mx-auto">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Available Loans
          </h2>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Choose from our carefully curated selection of loan products designed to meet your financial needs
        </p>
      </div>

      {/* Loan Cards Grid */}
      {loans.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl animate-fade-in">
          {loans.map((loan, idx) => (
            <div
              key={loan.id}
              style={{ animationDelay: `${idx * 100}ms` }}
              className="opacity-0 animate-fade-in-card"
            >
              <LoanCard loan={loan} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="glass rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No Loans Available</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're currently updating our loan offerings. Check back soon!
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center mt-16 mb-8">
        <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Don't see what you're looking for?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Create a custom loan product tailored to your specific requirements
          </p>
          <Link
            href="/loans/create"
            className="inline-flex items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg hover:scale-105 animate-gradient-shift"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Loan Product
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mt-16">
        <div className="glass rounded-2xl p-6 text-center hover-lift">
          <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Instant Approval</h4>
          <p className="text-gray-600 dark:text-gray-300">Quick and easy loan application process</p>
        </div>
        
        <div className="glass rounded-2xl p-6 text-center hover-lift">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Competitive Rates</h4>
          <p className="text-gray-600 dark:text-gray-300">Best-in-class interest rates and terms</p>
        </div>
        
        <div className="glass rounded-2xl p-6 text-center hover-lift">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Secure & Private</h4>
          <p className="text-gray-600 dark:text-gray-300">Your data is protected with bank-level security</p>
        </div>
      </div>
    </div>
  );
}
