"use client";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={toggleTheme}
      className="fixed z-50 top-14 right-6 w-14 h-14 rounded-full shadow-xl flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:scale-110 focus:outline-none"
      style={{ boxShadow: "0 4px 24px 0 rgba(80,80,180,0.10)" }}
    >
      <span className="relative w-8 h-8 flex items-center justify-center">
        <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${theme === "dark" ? "opacity-0 scale-75" : "opacity-100 scale-100"}`}>
          <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" />
            <g>
              <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </g>
          </svg>
        </span>
        <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${theme === "dark" ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
          <svg className="w-8 h-8 text-gray-300 dark:text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
          </svg>
        </span>
      </span>
    </button>
  );
} 