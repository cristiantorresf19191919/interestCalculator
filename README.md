# Loan Calculator - Credit Amortization System

A modern, responsive loan calculator application built to help users calculate credit payments, interest rates, and detailed amortization schedules. This project serves as a comprehensive tool for financial planning and loan analysis.

🎯 **Project Overview**
This project provides a complete loan calculation system with both frontend and backend implementations. Users can calculate monthly payments, total interest, and view detailed month-by-month amortization schedules for various loan types.

**Current Status: Production Ready**
✅ Frontend: Next.js with TypeScript and Tailwind CSS
✅ Backend: FastAPI with Python (main.py)
✅ In-Memory Backend: Complete TypeScript implementation
✅ Loan Management: Full CRUD operations
✅ Amortization Calculator: Detailed payment breakdown
✅ Responsive Design: Mobile-first approach

## 🏗️ **Architecture & Technology Stack**

### **Frontend Implementation**
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Custom React hooks
- **Data Layer**: In-memory backend with simulated API
- **Deployment**: Vercel-ready configuration

### **Backend Implementation** (main.py)
- **Framework**: FastAPI with Python
- **Data Models**: Pydantic for validation
- **CORS**: Cross-origin resource sharing enabled
- **Database**: In-memory storage (easily replaceable)
- **API**: RESTful endpoints for loan operations

### **In-Memory Backend** (TypeScript)
- **Service Layer**: Business logic implementation
- **API Simulation**: Realistic HTTP responses
- **Error Handling**: Comprehensive error management
- **Data Persistence**: In-memory with simulated persistence

## 🎨 **Features**

### **Core Functionality**
- **Loan Management**: Create, read, update, and delete loan products
- **Loan Calculator**: Calculate monthly payments and total interest
- **Amortization Schedule**: Detailed month-by-month payment breakdown
- **Interest Rate Analysis**: Compare different interest rates
- **Payment Breakdown**: Principal vs interest analysis

### **Loan Products Available**
- **Libranza**: 5M - 50M COP, 16.5% annual rate
- **Hipotecario Vivienda**: 20M - 500M COP, 12% annual rate
- **Crédito de Consumo**: 1M - 25M COP, 21% annual rate
- **Crédito Vehicular**: 15M - 150M COP, 15% annual rate
- **Crédito Educativo**: 2M - 60M COP, 9% annual rate
- **Crédito de Libre Inversión**: 1M - 40M COP, 24% annual rate
- **Microcrédito para Negocio**: 500K - 25M COP, 30% annual rate

### **User Experience**
- **Responsive Design**: Works on all devices
- **Real-time Calculations**: Instant results
- **Interactive Forms**: User-friendly input validation
- **Loading States**: Smooth user feedback
- **Error Handling**: Clear error messages

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ and npm
- Python 3.8+ (for FastAPI backend)
- Modern web browser

### **Frontend Development**
```bash
# Clone the repository
git clone <your-repo-url>
cd front

# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

### **Backend Development** (Optional)
```bash
# Install Python dependencies
pip install fastapi uvicorn pydantic

# Run FastAPI server
python main.py

# Or with uvicorn
uvicorn main:app --reload

# Visit http://localhost:8000/docs for API documentation
```

### **Production Deployment**
```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
vercel --prod
```

## 🚀 Deploying to Netlify

1. **Push your code to GitHub, GitLab, or Bitbucket.**
2. **Sign in to [Netlify](https://app.netlify.com/) and click 'Add new site' > 'Import an existing project'.**
3. **Connect your repository.**
4. **Configure the following build settings:**
   - **Build command:** `next build`
   - **Publish directory:** `.next`
   - **Install command:** `npm install` (or leave blank for default)
   - **Environment variables:**
     - `NODE_VERSION=18` (or your preferred Node version)
     - `NEXT_PUBLIC_*` (any public env vars your app needs)
   - **Optional:** Add `NEXT_PRIVATE_*` for private env vars if needed.
5. **Click 'Deploy site'.**

### Netlify Adapter (Optional)
For best results, use the [@netlify/next](https://github.com/netlify/next-runtime) adapter:

```
npm install @netlify/next
```

Add a `netlify.toml` file to your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/next"
```

### Notes
- Make sure your `next.config.ts` is compatible with serverless deployment.
- If you use API routes or server actions, check Netlify's Next.js docs for SSR/ISR support.
- For custom domains, HTTPS, and environment variables, use Netlify's dashboard.

For more details, see: [Netlify Docs: Next.js](https://docs.netlify.com/integrations/frameworks/next-js/)

## 📁 **Project Structure**

```
front/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── calculate-loan/     # Loan calculator page
│   │   ├── loans/             # Loan management pages
│   │   │   ├── create/        # Create new loan
│   │   │   └── edit/[id]/     # Edit existing loan
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable React components
│   │   ├── loans/            # Loan-specific components
│   │   │   ├── loan-card.tsx # Individual loan display
│   │   │   └── loan-list.tsx # Loan listing
│   │   └── ui/               # UI components
│   ├── lib/                  # Core business logic
│   │   ├── data.ts          # Data types and storage
│   │   ├── loan-service.ts  # Business logic
│   │   ├── api.ts           # API simulation
│   │   └── hooks.ts         # React hooks
│   └── types/               # TypeScript definitions
├── main.py                  # FastAPI backend (optional)
├── package.json            # Frontend dependencies
└── README.md              # This file
```

## 🎯 **Business Value**

### **Target Users**
- **Individuals**: Planning personal loans and mortgages
- **Businesses**: Analyzing business loan options
- **Financial Advisors**: Providing loan calculations to clients
- **Banks**: Demonstrating loan products to customers

### **Key Benefits**
- **Accurate Calculations**: Precise amortization schedules
- **Time Saving**: Instant loan analysis
- **Transparency**: Clear breakdown of payments
- **Comparison**: Easy comparison between loan options
- **Planning**: Better financial decision making

## 🔄 **API Endpoints**

### **Loan Management**
- `GET /loans` - Get all loans
- `GET /loans/{id}` - Get specific loan
- `POST /loans` - Create new loan
- `PUT /loans/{id}` - Update loan
- `DELETE /loans/{id}` - Delete loan
- `POST /loans/search` - Search loans by name

### **Loan Calculation**
- `POST /calculate-loan` - Calculate loan payments and amortization

### **Response Format**
```json
{
  "summary": {
    "total_payment": "$120,000.00",
    "principal": "$100,000.00",
    "total_interest": "$20,000.00",
    "monthly_payment": "$1,000.00",
    "annual_interest_rate": "12.00%",
    "latest_date_of_payment_after_loan": "2025-12-01"
  },
  "amortization_schedule": [
    {
      "month": 1,
      "monthly_payment": "$1,000.00",
      "principal_paid": "$800.00",
      "interest_paid": "$200.00",
      "remaining_balance": "$99,200.00"
    }
  ]
}
```

## 🛠️ **Development Guidelines**

### **Code Standards**
- **TypeScript**: Strict type checking enabled
- **React**: Functional components with hooks
- **CSS**: Tailwind CSS utility classes
- **API**: RESTful design principles
- **Error Handling**: Comprehensive error management

### **Best Practices**
- **Mobile-first**: Responsive design approach
- **Accessibility**: WCAG 2.1 compliance
- **Performance**: Optimized loading and rendering
- **SEO**: Meta tags and semantic HTML
- **Testing**: Component and integration testing

## 📊 **Technical Details**

### **Frontend Technologies**
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: State management
- **Custom Hooks**: Reusable logic

### **Backend Technologies** (main.py)
- **FastAPI**: Modern Python web framework
- **Pydantic**: Data validation and serialization
- **CORS**: Cross-origin resource sharing
- **HTTPException**: Error handling
- **In-memory Storage**: Simple data persistence

### **Calculation Engine**
- **Compound Interest**: Standard amortization formula
- **Monthly Payments**: Fixed payment calculations
- **Interest Breakdown**: Principal vs interest analysis
- **Schedule Generation**: Month-by-month breakdown
- **Edge Cases**: Zero interest rate handling

## 🤝 **Contributing**

### **Development Process**
1. Fork the repository
2. Create a feature branch
3. Follow coding standards
4. Test thoroughly
5. Submit a pull request

### **Code Review**
- TypeScript compliance
- Responsive design testing
- Performance optimization
- Accessibility validation
- Error handling coverage

## 📈 **Future Roadmap**

### **Short-term (1-3 months)**
- [ ] Advanced loan comparison features
- [ ] Export functionality (PDF, Excel)
- [ ] User accounts and saved calculations
- [ ] Mobile app development

### **Medium-term (3-6 months)**
- [ ] Database integration (PostgreSQL)
- [ ] User authentication system
- [ ] Advanced analytics dashboard
- [ ] API rate limiting and security

### **Long-term (6+ months)**
- [ ] Multi-language support
- [ ] Advanced financial modeling
- [ ] Integration with banking APIs
- [ ] AI-powered loan recommendations

## 📞 **Contact & Support**

**Developer**: CristianScript  
**Email**: cristian.torres19@hotmail.com  
**WhatsApp**: +57 323 799 2985  
**Project Status**: Production Ready

## 📄 **License**

This project is proprietary and confidential. All rights reserved.

---

**Note**: This loan calculator provides accurate financial calculations for educational and planning purposes. For actual loan applications, please consult with qualified financial institutions and professionals.

**Last updated**: December 2024
