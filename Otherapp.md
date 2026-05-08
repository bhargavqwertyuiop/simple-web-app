I'll analyze this project for you. Let me start by examining the repository structure and understanding the codebase.Let me get more detailed information about the source code structure:# **Guardient - Template-Analyst Project Overview**

## **Project Summary**

**Guardient** is a comprehensive **security analysis tool for CCM (Customer Communications Management) templates**. It's designed to help security teams and developers identify and mitigate security risks in document templates by automatically detecting sensitive data, assessing risk levels, and providing actionable insights through interactive dashboards.

**Live Demo:** https://bhargavqwertyuiop.github.io/Template-Analyst/

---

## **PROJECT OVERVIEW**

### **Purpose**
Guardient analyzes Quadient Inspire template exports to:
- Extract and analyze template variables automatically
- Identify PII (Personally Identifiable Information), financial data, security credentials, and sensitive information
- Categorize variables by risk level (High, Medium, Low, Safe)
- Provide visual dashboards for prioritizing security fixes
- Maintain historical analysis records with user authentication

### **Repository Details**
- **Owner:** bhargavqwertyuiop
- **Language:** TypeScript
- **Created:** ~36 days ago
- **Last Updated:** April 13, 2026
- **Status:** Active (0 open issues)
- **GitHub Pages:** Enabled for deployment
- **License:** Apache License 2.0

---

## **TECHNICAL ARCHITECTURE**

### **Technology Stack**

```
Frontend:
├── React 18 with TypeScript
├── Vite (Build tool)
├── Tailwind CSS (Styling)
├── Recharts (Data visualization)
├── jsPDF (PDF export)
├── PapaParse (CSV handling)
└── Lucide React (Icons)

Backend/Services:
├── Firebase Authentication
├── Firestore Database
├── Firebase Analytics
└── Google Generative AI (@google/genai)

Development:
├── Node.js v18+
├── npm/yarn
├── ESLint/TypeScript linting
└── Vite configuration for GitHub Pages
```

### **Key Dependencies (package.json)**

```json
Production Dependencies:
- firebase: ^12.11.0 (Auth & Firestore)
- react: ^19.0.0
- recharts: ^3.8.1 (Charts)
- jspdf: ^4.2.1 (PDF export)
- papaparse: ^5.5.3 (CSV parsing)
- tailwindcss: ^4.1.14
- vite: ^6.2.0
- lucide-react: ^0.546.0 (Icons)

DevDependencies:
- typescript: ~5.8.2
- @vitejs/plugin-react: ^5.0.4
- tsx: ^4.21.0
```

### **Build Configuration**

```typescript
// vite.config.ts
- Base path: '/Template-Analyst/' (GitHub Pages)
- Plugins: React + Tailwind CSS
- HMR: Configurable for development
```

---

## **FUNCTIONAL FEATURES & CAPABILITIES**

### **1. Authentication & Authorization**
- **Firebase Auth Integration** - Secure user sign-up/login
- **Session Management** - User sessions managed securely
- **User-specific Data** - Each user's analysis history isolated
- **Firestore Security Rules** - User can only access their own data

### **2. File Upload & Processing**

```
Supported Formats:
├── Excel (.xlsx, .xls)
└── CSV (.csv)

Processing:
├── Validates file type & size (max 50MB)
├── Extracts data from first sheet
├── Validates required columns:
│   ├── WfdName
│   ├── Module Name
│   ├── Object Name
│   ├── Object Type
│   ├── First Used in
│   └── Found Count
└── Displays drag-and-drop UI
```

### **3. Intelligent Data Analysis**

**Variable Extraction:**
- Parses nested object paths (e.g., `System.Data.Email.Address`)
- Extracts variable names from object paths
- Classifies variable types (System, Global, Sensitive, Other)

**Sensitive Data Detection:**
- Configurable dictionary-based matching
- Default keywords for:
  - **EMAIL:** email, emailid, email_to, etc.
  - **PII:** name, fullname, dob, ssn, etc.
  - **FINANCIAL:** account, iban, swift, card, cvv, etc.
  - **SECURITY:** password, pin, otp, token, atm
  - **CONTACT:** phone, mobile, address

**Risk Scoring Algorithm:**
```
Risk Score Calculation:
├── Category Weights:
│   ├── SECURITY: +40 points
│   ├── FINANCIAL: +30 points
│   ├── PII: +20 points
│   ├── EMAIL: +5 points
│   └── CONTACT: +5 points
├── Density Factor: (Sensitive Count / Total Count) × 20
└── Final Score: min(100, category_score + density_score)

Risk Levels:
├── HIGH: Score ≥ 70
├── MEDIUM: Score ≥ 40
├── LOW: Score > 0
└── SAFE: Score = 0
```

### **4. Template Type Classification**

```
Detects:
├── BASE_TEMPLATE (Master templates)
├── BLOCK (Reusable components)
├── SNIPPET (Template fragments)
├── TEMPLATE (Standard templates)
└── OTHER (Unclassified)
```

### **5. Interactive Dashboards**

**Summary Cards:**
- Total Templates analyzed
- Total Variables found
- Sensitive Variables Count
- High Risk Templates count

**Charts & Visualizations (Recharts):**
1. **Category Distribution** - Pie chart showing PII, Financial, Security, etc.
2. **Risk Level Distribution** - Pie chart (High/Medium/Low/Safe)
3. **Template Type Distribution** - Pie chart showing template classifications
4. **Top Risky Templates** - Bar chart showing templates with most sensitive variables

**Filtering & Search:**
- Filter by risk level
- Filter by category
- Filter by template type
- Search functionality

### **6. Data Management**

**Dictionary Manager:**
- Upload custom CSV with organization-specific keywords
- Validation: Requires Category and Keyword columns
- Supports CSV format with flexible column naming
- Real-time keyword counting

**Data Persistence:**
- Firebase Firestore stores analysis history
- User-specific collections
- Immutable history records (no updates allowed)
- Deletion allowed by data owner

### **7. Export Capabilities**

- **PDF Reports** - Generate compliance documentation
- **CSV Export** - Export filtered data for further analysis
- **Custom Reports** - Filter before exporting

---

## **DATA MODEL & FIRESTORE STRUCTURE**

### **Firestore Collection: `analysisHistory`**

```javascript
Document Structure:
{
  userId: string,           // UID of the user
  fileName: string,         // Original uploaded filename
  timestamp: string,        // ISO 8601 date string
  totalTemplates: number,   // Total templates analyzed
  sensitiveCount: number,   // Total sensitive variables found
  highRiskCount: number,    // Number of high-risk templates
  data: string             // JSON stringified raw analysis data
}

Security Rules:
├── Authentication required for all operations
├── Users can only read their own data
├── Users can only create data for themselves
├── History is immutable (no updates allowed)
└── Users can delete their own history
```

### **TypeScript Interfaces**

```typescript
interface TemplateVariable {
  template: string;
  module: string;
  objectPath: string;
  variableName: string;
  type: VariableType;
  categories: Category[];
  flow: string;
  count: number;
}

interface TemplateSummary {
  templateName: string;
  variables: TemplateVariable[];
  sensitiveCount: number;
  totalCount: number;
  categories: Set<Category>;
  riskLevel: RiskLevel;
  riskScore: number;
  typeDistribution: Record<VariableType, number>;
  templateType: TemplateType;
  templatePath: string;
}

interface DashboardStats {
  totalTemplates: number;
  totalVariables: number;
  sensitiveVariablesCount: number;
  highRiskCount: number;
  categoryDistribution: Record<Category, number>;
  typeDistribution: Record<VariableType, number>;
  riskDistribution: Record<RiskLevel, number>;
  templateTypeDistribution: Record<TemplateType, number>;
}
```

---

## **PROJECT STRUCTURE**

```
Template-Analyst/
├── src/
│   ├── components/
│   │   ├── auth/              # Authentication components
│   │   ├── Dashboard.tsx      # Main dashboard with charts
│   │   ├── FileUpload.tsx     # File upload interface
│   │   └── TemplateAnalysis.tsx # Template analysis views
│   ├── context/               # React context providers
│   ├── lib/
│   │   └── analyzer.ts        # Core analysis logic (320+ lines)
│   ├── firebase.ts            # Firebase initialization
│   └── App.tsx                # Main application
├── public/                    # Static assets
├── .github/                   # GitHub Actions workflows
├── firestore.rules            # Firestore security rules
├── firebase.json              # Firebase configuration
├── firebase-blueprint.json    # Firebase setup blueprint
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies
└── index.html                # Entry HTML
```

---

## **CORE ANALYSIS FUNCTIONS (src/lib/analyzer.ts)**

### **Key Functions:**

1. **`detectCategories()`** - Matches variable names against dictionary keywords
2. **`detectTemplateType()`** - Classifies templates by path structure
3. **`classifyVariableType()`** - Determines System/Global/Sensitive/Other type
4. **`calculateRiskLevel()`** - Computes risk score and level
5. **`processRawData()`** - Main processing pipeline
6. **`parseDictionaryCSV()`** - Parses custom keyword dictionaries
7. **`validateDictionaryCSV()`** - Validates CSV format and content
8. **`calculateStats()`** - Aggregates statistics for dashboard

---

## **SECURITY ARCHITECTURE**

### **Firestore Security Rules** (firestore.rules)

```
Helper Functions:
├── isAuthenticated() - Checks if user is logged in
├── isOwner(userId) - Verifies user ownership
├── isValidDateString() - Validates ISO 8601 format
├── hasRequiredFields() - Checks document structure
└── hasOnlyAllowedFields() - Prevents extra fields

Access Control:
├── READ: Users can only read their own history
├── CREATE: Users can only create data for themselves
├── UPDATE: Disabled (immutable records)
├── DELETE: Users can delete their own history
└── DEFAULT: All other paths denied

Field Validation:
├── userId: string (required)
├── fileName: 0-255 chars (required)
├── timestamp: ISO 8601 format (required)
├── totalTemplates: non-negative integer
├── sensitiveCount: non-negative integer
├── highRiskCount: non-negative integer
└── data: string, max 1MB (required)
```

### **Client-Side Security**

```typescript
// src/firebase.ts
- Environment variables only for Firebase config
- Public configuration (no sensitive keys exposed)
- Firebase Auth manages authentication tokens
- All user operations verified server-side
```

### **Best Practices Implemented**

✅ User authentication required for all operations
✅ Firestore rules enforce access control
✅ Data encrypted in transit (Firebase)
✅ No sensitive data in environment variables
✅ CSV file size limit: 50MB
✅ Immutable analysis history records
✅ Client-side data processing for sensitive analysis

---

## **DEPLOYMENT & CI/CD**

### **GitHub Pages Deployment**

```
Configuration:
├── Base path: /Template-Analyst/
├── Automatic deployment on main branch push
├── GitHub Actions workflows configured
└── Build command: npm run build
```

### **Environment Variables (Production)**

```
Required GitHub Repository Secrets:
├── VITE_FIREBASE_API_KEY
├── VITE_FIREBASE_AUTH_DOMAIN
├── VITE_FIREBASE_PROJECT_ID
├── VITE_FIREBASE_STORAGE_BUCKET
├── VITE_FIREBASE_MESSAGING_SENDER_ID
├── VITE_FIREBASE_APP_ID
└── VITE_FIREBASE_MEASUREMENT_ID
```

### **Build Scripts**

```json
{
  "dev": "vite --port=3000 --host=0.0.0.0",
  "build": "vite build",
  "preview": "vite preview",
  "clean": "rm -rf dist",
  "lint": "tsc --noEmit"
}
```

---

## **WORKFLOW & USER JOURNEY**

```
1. AUTHENTICATION
   └─> User signs up/logs in via Firebase Auth

2. FILE UPLOAD
   └─> User uploads Quadient Inspire CSV/Excel export
   └─> System validates file format & structure

3. ANALYSIS
   └─> Variables extracted & categorized
   └─> Risk scores calculated
   └─> Statistics aggregated

4. VISUALIZATION
   └─> Dashboard displays:
       ├── Summary statistics
       ├── Distribution charts
       ├── Risk analysis
       └── Template breakdowns

5. ACTIONS
   └─> View detailed analysis
   └─> Filter/search variables
   └─> Update custom dictionaries
   └─> Export reports (PDF/CSV)
   └─> View analysis history

6. DATA PERSISTENCE
   └─> Analysis saved to Firestore
   └─> User-specific access control
```

---

## **KEY REVIEW POINTS FOR INTERNAL REVIEW**

### **Strengths:**
✅ **Well-structured codebase** - Clear separation of concerns (components, lib, context)
✅ **Type-safe** - Full TypeScript with proper interfaces
✅ **Security-focused** - Comprehensive Firestore rules, user isolation
✅ **User-friendly** - Modern UI with Tailwind CSS and smooth animations
✅ **Scalable analysis** - Configurable dictionaries for organization needs
✅ **Enterprise-ready** - Firebase backend, authentication, audit trails
✅ **Accessible dashboards** - Multiple visualization types for different insights
✅ **Export capabilities** - PDF and CSV for compliance & reporting

### **Areas to Verify:**
⚠️ **PDF Export Implementation** - Verify `server-pdf.js` integration
⚠️ **CSV Handling** - Test with large files (up to 50MB)
⚠️ **Performance** - Dashboard rendering with 1000+ templates
⚠️ **Error Handling** - Edge cases in CSV parsing
⚠️ **Firebase Rules** - Test all access scenarios
⚠️ **Mobile Responsiveness** - Charts render correctly on mobile
⚠️ **Accessibility** - WCAG compliance for charts and forms

---

## **GETTING STARTED (FOR DEVELOPMENT)**

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Fill in Firebase configuration

# Start development server
npm run dev
# Open http://localhost:3000

# Build for production
npm run build

# Type checking
npm run lint
```

---

This project is a **production-ready security analysis platform** with a focus on protecting sensitive data in customer communication templates. It combines modern React frontend practices with robust Firebase backend architecture to provide security teams with actionable insights into template security risks.
