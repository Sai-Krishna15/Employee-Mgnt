# Employee Management Dashboard

A React-based web application for managing employee records, featuring authentication, CRUD operations, search, filtering, and print functionality.

## Project Overview

This dashboard allows administrators to manage employee data efficiently. It includes:
- **Authentication**: Secure login page (Mock credentials).
- **Dashboard**: Overview of employee statistics.
- **Employee Management**: Add, Edit, Delete, and View employees.
- **Search & Filter**: Find employees by name, gender, or status.
- **Print**: Optimized print view for the employee list.

## Tech Stack

- **Frontend Framework**: React 19 (via Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Date Formatting**: date-fns

## Prerequisites

- Node.js (v20 or higher recommended)
- npm (v10 or higher)

## Steps to Run Locally

1. **Clone the repository** (or unzip the source code):
   ```bash
   cd employee-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:5173` (or the port shown in the terminal).

## Assumptions & Design Decisions

- **Persistence**: `localStorage` is used to persist employee data and authentication state to simulate a backend database. This ensures data survives page reloads.
- **Authentication**: Since there is no backend, any non-empty username/password combination is accepted for login, but the session is managed securely within the client context.
- **Styling**: Tailwind CSS v4 is used for a modern, utility-first approach.
- **Icons**: `lucide-react` was chosen for its clean and consistent icon set.
- **Print**: A specific `@media print` style block ensures that only the relevant table data is printed, hiding navigation and buttons.

## Project Structure

```
src/
├── components/     # Reusable UI components (EmployeeList, EmployeeForm, etc.)
├── context/        # React Context for state management (Auth, Employee)
├── pages/          # Page components (Login, Dashboard)
├── types/          # TypeScript interfaces
├── utils/          # Helper functions and mock data
├── App.tsx         # Main application component with routing
└── main.tsx        # Entry point
```
