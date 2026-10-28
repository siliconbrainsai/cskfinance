# C. Santosh Kumar — Financial Services & Real Estate Portal

A comprehensive, full-stack digital web portal and management platform for **C. Santosh Kumar (Financial & Real Estate Services)**. The system provides clients with access to loan solutions, property listings, financial calculators, partner networks, and inquiry channels, paired with an administrative backend for content and lead management.

---

## 🌟 Key Features

### Client Facing (Frontend)
- **Financial Services Portfolio**: Home loans, business loans, mortgage loans, project finance, machinery loans, and debt syndication.
- **Real Estate Listings**: Residential, commercial, agricultural, and industrial property showcases with categorized filters.
- **Interactive Loan EMI Calculator**: Real-time interest, tenure, EMI calculation, and amortization breakdown.
- **Partner Showcase**: Infinite marquee of associated banking, NBFC, and institutional partners.
- **Lead & Inquiry Management**: Inquiry forms with WhatsApp direct integration and email touchpoints.
- **Responsive Modern UI**: Built with React 19, TypeScript, Tailwind/Vanilla CSS, Lucide icons, and mobile-friendly navigation.

### Administrative Management (Backend)
- **FastAPI REST API**: High-performance asynchronous REST endpoints with auto-generated OpenAPI Swagger documentation.
- **Database ORM**: SQLAlchemy with SQLite (production-ready for PostgreSQL/MySQL).
- **Security & Authentication**: JWT-based bearer authentication and hashed password management via Passlib/Bcrypt.
- **Lead Tracking & Analytics**: Dashboard statistics, service configurations, property showcases, and enquiry tracking.

---

## 🏗️ Project Architecture

```
cskfinance/
├── backend/
│   ├── app/
│   │   ├── api/          # API route controllers & endpoints (/api/v1)
│   │   ├── core/         # App settings, DB engine, security, initial seeder
│   │   ├── models/       # SQLAlchemy database models
│   │   ├── schemas/      # Pydantic validation schemas
│   │   └── main.py       # FastAPI application entrypoint
│   ├── requirements.txt  # Python package dependencies
│   └── uploads/          # Static uploaded media & documents
│
├── frontend/
│   ├── public/           # Static public assets (icons, favicon)
│   ├── src/
│   │   ├── components/   # Reusable UI widgets (Navbar, Footer, LoanCalculator, etc.)
│   │   ├── pages/        # Route pages (Home, About, Services, Projects, Admin, etc.)
│   │   ├── services/     # API client handlers
│   │   ├── types/        # TypeScript interfaces and types
│   │   ├── App.tsx       # Root routing & layout
│   │   └── main.tsx      # React entrypoint
│   ├── package.json      # Node.js dependencies & scripts
│   └── vite.config.ts    # Vite bundler & reverse proxy config
│
├── .gitignore            # Git exclusion rules
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Python 3.10+**
- **Node.js 18+** & **npm**
- **Git**

---

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   - **Windows:**
     ```bash
     python -m venv venv
     venv\Scripts\activate
     ```
   - **Linux / macOS:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:
   ```bash
   python -m uvicorn app.main:app --host 127.0.0.1 --port 8005 --reload
   ```

5. Access the API documentation:
   - **Swagger UI**: [http://127.0.0.1:8005/docs](http://127.0.0.1:8005/docs)
   - **ReDoc**: [http://127.0.0.1:8005/redoc](http://127.0.0.1:8005/redoc)

---

### 2. Frontend Setup

1. Open a second terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser at the displayed local URL (typically `http://localhost:5173` or `http://localhost:5174`).

> **Note:** The frontend Vite config proxies all `/api` requests automatically to `http://127.0.0.1:8005`.

---

## 🔐 Administrative Access & Default Seed

When running the backend for the first time, default site settings and sample financial service items are automatically seeded into the database.

- **Admin Login Endpoint**: `/api/v1/auth/login`
- **Default Admin Email**: `cherukupally.santosh@gmail.com`
- **Default Password**: `Santosh@Admin2026` *(Configure custom credentials via environment variables in production)*

---

## ⚙️ Environment Variables (Optional)

You can override defaults by providing an `.env` file in `backend/`:

| Variable | Description | Default |
|---|---|---|
| `PROJECT_NAME` | Portal Title | `C. Santosh Kumar - Financial Services & Real Estate Portal` |
| `DATABASE_URL` | Database Connection String | `sqlite:///./sql_app.db` |
| `SECRET_KEY` | JWT Secret Key | *Generated random key* |
| `ADMIN_EMAIL` | Default administrator email | `cherukupally.santosh@gmail.com` |
| `ADMIN_PASSWORD` | Default administrator password | `Santosh@Admin2026` |

---

## 📦 Tech Stack

- **Frontend**: React 19, TypeScript, Vite, React Router 7, Lucide Icons
- **Backend**: FastAPI, Pydantic v2, SQLAlchemy 2, Uvicorn, Python-Jose (JWT), Passlib
- **Database**: SQLite (default local) / PostgreSQL compliant

---

## 📄 License

This repository is maintained for **C. Santosh Kumar Financial & Real Estate Services**. All rights reserved.
