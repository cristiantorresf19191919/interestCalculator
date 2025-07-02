import LoanList from "@/components/loans/loan-list";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('Home');
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative z-10 px-4 py-16 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Image
                  src="/icons/loan-icon.svg"
                  alt={t('loanIconAlt')}
                  width={80}
                  height={80}
                  className="animate-pulse-glow"
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
              {t('title')}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('subtitle1')} 
              <span className="text-blue-600 dark:text-blue-400 font-semibold">{t('subtitle2')}</span>, 
              <span className="text-purple-600 dark:text-purple-400 font-semibold">{t('subtitle3')}</span>, {t('subtitle4')} 
              <span className="text-pink-600 dark:text-pink-400 font-semibold">{t('subtitle5')}</span>.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              <div className="glass rounded-2xl p-6 text-center hover-lift">
                <div className="text-3xl font-bold text-blue-600 mb-2">7+</div>
                <div className="text-gray-600 dark:text-gray-300">{t('stat1')}</div>
              </div>
              <div className="glass rounded-2xl p-6 text-center hover-lift">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-gray-600 dark:text-gray-300">{t('stat2')}</div>
              </div>
              <div className="glass rounded-2xl p-6 text-center hover-lift">
                <div className="text-3xl font-bold text-pink-600 mb-2">100%</div>
                <div className="text-gray-600 dark:text-gray-300">{t('stat3')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-4 pb-16 mx-auto max-w-7xl">
        <LoanList />
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
          <button className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus-ring">
            <Image
              src="/icons/calculator-icon.svg"
              alt={t('calculatorIconAlt')}
              width={32}
              height={32}
              className="filter brightness-0 invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
} 