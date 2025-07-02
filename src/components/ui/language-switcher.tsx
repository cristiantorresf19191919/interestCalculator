"use client";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const locales = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" }
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    router.replace(`/${nextLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="relative flex items-center">
      <span className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
      <select
        value={locale}
        onChange={handleChange}
        className="appearance-none pl-7 pr-6 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition hover:border-blue-400 hover:shadow-md"
        aria-label="Select language"
      >
        {locales.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
      <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
} 