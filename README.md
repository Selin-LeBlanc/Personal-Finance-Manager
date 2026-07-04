# Personal-Finance-Manager

# Estate Ledger

Estate Ledger is a full-stack web application designed to help estate administrators manage estate finances using double-entry accounting principles.

The application provides an estate-specific Chart of Accounts, supports journal entry creation, and generates reports such as Account Balances, Balance Sheet, and Income Statement.

---

# Technology Stack

## Backend

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM

## Frontend

- React
- Vite

---

# Features

## Accounting

- Estate-specific Chart of Accounts
- Hierarchical Chart of Accounts using parent-child relationships
- Double-entry journal entries
- Automatic debit and credit validation
- Account Balance reporting
- Balance Sheet
- Income Statement
- Search journal entries by journal entry date
- Search journal entries by account code

## Technical

- RESTful API
- PostgreSQL database
- Prisma ORM
- React frontend
- Component-based architecture

---

# Prerequisites

Before running the application, install the following:

- Node.js (v24 or later recommended)
- PostgreSQL

---

# Installation

## 1. Clone the repository

```bash
git clone <repository-url>
cd Personal-Finance-Manager
```

---

## 2. Backend Setup

Navigate to the server directory.

```bash
cd server
npm install
```

Create a `.env` file inside the **server** directory.

```env
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/personal_finance_manager?schema=public"
PORT=5001
```

Generate the Prisma Client.

```bash
npx prisma generate
```

Create the database schema.

```bash
npx prisma migrate dev
```

Seed the database.

```bash
node prisma/seed.js
```

Start the backend.

```bash
npm run dev
```

The API will be available at:

```
http://localhost:5001
```

---

## 3. Frontend Setup

Open a new terminal.

```bash
cd client
npm install
npm run dev
```

The React application will be available at:

```
http://localhost:5173
```

---

# Running the Application

The application requires two terminals.

### Terminal 1 - Backend

```bash
cd server
npm run dev
```

### Terminal 2 - Frontend

```bash
cd client
npm run dev
```

Open the application:

| Application | URL                   |
| ----------- | --------------------- |
| Frontend    | http://localhost:5173 |
| Backend API | http://localhost:5001 |

---

# API Endpoints

## Accounts

| Method | Endpoint        | Description                    |
| ------ | --------------- | ------------------------------ |
| GET    | `/api/accounts` | Retrieve the Chart of Accounts |

---

## Journal Entries

| Method | Endpoint               | Description                |
| ------ | ---------------------- | -------------------------- |
| GET    | `/api/journal-entries` | Retrieve journal entries   |
| POST   | `/api/journal-entries` | Create a new journal entry |

Supported query parameters:

| Parameter     | Description                  |
| ------------- | ---------------------------- |
| `entryDate`   | Filter by journal entry date |
| `accountCode` | Filter by account code       |

Example:

```
GET /api/journal-entries?entryDate=2026-06-30
GET /api/journal-entries?accountCode=11100
GET /api/journal-entries?entryDate=2026-06-30&accountCode=11100
```

---

## Reports

| Method | Endpoint                        | Description               |
| ------ | ------------------------------- | ------------------------- |
| GET    | `/api/reports/account-balances` | Retrieve account balances |
| GET    | `/api/reports/balance-sheet`    | Retrieve balance sheet    |
| GET    | `/api/reports/income-statement` | Retrieve income statement |

Supported query parameters:

| Parameter  | Description                            |
| ---------- | -------------------------------------- |
| `asOfDate` | Returns balances as of a specific date |

Example:

```
GET /api/reports/account-balances?asOfDate=2026-06-30
GET /api/reports/balance-sheet?asOfDate=2026-06-30
GET /api/reports/income-statement?asOfDate=2026-06-30
```

---

# Project Structure

```text
Personal-Finance-Manager/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── generated/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
└── README.md
```

---

# Design Decisions

- Double-entry accounting principles are enforced for all journal entries.
- Journal entries must balance before being recorded.
- The Chart of Accounts uses parent-child relationships to support hierarchical reporting.
- Financial reports support an optional **As of Date** parameter.
- The application separates Chart of Accounts from financial reports (Account Balances, Balance Sheet, Income Statement).

---

# Future Enhancements

The following features were identified during development and are planned for future iterations of the application.

## Accounting

- Account balance snapshots (rollover balances) to improve report performance by reducing full journal history calculations.
- Journal entry reversal.
- Draft journal entries that remain editable until posted.
- Separate transaction date from journal entry creation/posting date.
- Reporting categories and project-based expense tracking.

## Technical

- Document attachment option/possible OCR
- Centralized error message constants and shared error handling.
- Global Express error handling middleware.
- Enhanced frontend validation and user notifications.

---

# Out of Scope for this MVP

To keep the project focused on the core accounting engine and reporting functionality, the following features were intentionally excluded.

## Accounting

- Creation and maintenance of new accounts.
- Reference number for journal entries.
- Multiple estate or fund management.
- Year-end closing entries.
- Statement of Cash Flows.
- Statement of Changes in Equity.

## User Management

- Authentication and authorization.
- Audit fields (`createdBy`, `updatedBy`).
