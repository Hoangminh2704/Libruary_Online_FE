# 📚 Library Management System - Frontend# React + TypeScript + Vite

A modern, full-featured library management system built with React, TypeScript, and Vite.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## 🚀 Features

### For Members

- 📖 Browse and search book catalog
- 🔍 Filter books by category, availability, and search
- 📘 View detailed book information
- 💳 Borrow books with customizable due dates
- 🔖 Reserve books that are currently unavailable
- 📊 Track current loans and borrowing history
- ♻️ Renew loans before they expire
- 📅 Manage reservations

### For Administrators

- 📊 Dashboard with real-time statistics
- 📚 Complete book catalog management (CRUD operations)
- 👥 Member management
- 📤 Handle book returns
- 📈 View borrowing trends and recent activities

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules
- **Icons**: Material Symbols
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **State Management**: React Context API

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher) or **yarn**
- **Git**

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Hoangminh2704/Libruary_Online_FE.git
cd "Libruary FE"
```

### 2. Install Dependencies

```bash
npm install
```

or if you use yarn:

```bash
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following environment variables:

```env
VITE_API_URL=http://localhost:3000
```

**Note**: Update `VITE_API_URL` to match your backend API URL.

## 🚀 Running the Application

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 👤 Default Users

### Admin Account

- **Username**: `admin`
- **Password**: `admin123`
- **Access**: Full system access

### Member Account

- **Username**: `member`
- **Password**: `member123`
- **Access**: Browse, borrow, and reserve books

## 📁 Project Structure

```
Libruary FE/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, and other assets
│   ├── components/        # Reusable components
│   │   ├── common/       # Generic reusable components
│   │   │   ├── Button/
│   │   │   ├── InputField/
│   │   │   ├── Layout/
│   │   │   ├── ProtectedRoute/
│   │   │   └── ScrollToTop/
│   │   ├── layout/       # Layout components
│   │   │   ├── Footer/
│   │   │   └── Header/
│   │   └── specific/     # Feature-specific components
│   │       ├── AddBookModal/
│   │       ├── BookCard/
│   │       ├── BorrowModal/
│   │       ├── ReserveModal/
│   │       └── StatCard/
│   ├── contexts/         # React Context providers
│   ├── data/             # Mock data and constants
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Page layouts
│   │   ├── AdminLayout/
│   │   ├── AuthLayout/
│   │   └── MemberLayout/
│   ├── pages/            # Application pages
│   │   ├── admin/       # Admin pages
│   │   │   ├── BookCatalog/
│   │   │   ├── Dashboard/
│   │   │   ├── MemberList/
│   │   │   └── ReturnBook/
│   │   ├── auth/        # Authentication pages
│   │   │   ├── Login/
│   │   │   └── Register/
│   │   └── member/      # Member pages
│   │       ├── Book/
│   │       ├── BookDetail/
│   │       ├── Home/
│   │       ├── MyLoans/
│   │       └── Reservations/
│   ├── routes/          # Route configurations
│   ├── services/        # API services
│   │   ├── authService.ts
│   │   ├── axiosClient.ts
│   │   ├── bookService.ts
│   │   ├── dashboardService.ts
│   │   ├── loanService.ts
│   │   ├── memberService.ts
│   │   └── reservationService.ts
│   ├── style/           # Global styles and themes
│   ├── types/           # TypeScript type definitions
│   │   ├── book.types.ts
│   │   ├── catalog.types.ts
│   │   ├── dashboard.types.ts
│   │   ├── loan.types.ts
│   │   ├── member.types.ts
│   │   └── reservation.types.ts
│   ├── App.tsx          # Root component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables
├── .gitignore          # Git ignore rules
├── eslint.config.js    # ESLint configuration
├── index.html          # HTML template
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── README.md           # This file
```

## 🔑 Key Features Explained

### Authentication

- JWT-based authentication
- Role-based access control (Admin/Member)
- Protected routes
- Automatic token refresh

### Book Management

- **Add Book**: Support for URL or file upload for cover images
- **Genre Selection**: Multi-select from predefined genres (Software, Engineering, Architecture)
- **Search & Filter**: Real-time search with multiple filter options
- **Status Tracking**: Available, Limited, Out of Stock

### Borrowing System

- **Custom Due Dates**: Select return date (tomorrow to +7 days)
- **Smart Copy Selection**: Automatically finds available copies
- **Loan Tracking**: View all active loans with status indicators
- **Renewal**: Extend loan periods before they expire

### Reservation System

- **Estimated Availability**: Shows when books might become available
- **Date Range Selection**: Choose desired start and end dates
- **Queue Management**: Track reservation status
- **Auto-notifications**: Get notified when books are ready

<!-- ## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Interface**: Clean, intuitive design with Material Icons
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time input validation
- **Animations**: Smooth transitions and micro-interactions

## 🔌 API Integration

The frontend communicates with the backend API through Axios interceptors:

- **Base URL**: Configured via `VITE_API_URL` environment variable
- **Authentication**: JWT tokens automatically attached to requests
- **Error Handling**: Centralized error handling with automatic logout on 401
- **Response Interceptor**: Auto-unwraps `.data` from responses

### Main Endpoints

```
Authentication:
  POST   /auth/login
  POST   /auth/register
  POST   /auth/logout

Books:
  GET    /catalog/books
  GET    /catalog/books/:id
  POST   /catalog/books
  PATCH  /catalog/books/:id
  DELETE /catalog/books/:id

Loans:
  GET    /loans
  POST   /loans/borrow
  POST   /loans/:id/renew
  POST   /loans/:id/return

Reservations:
  GET    /reservations
  POST   /reservations
  POST   /reservations/:id/cancel

Members:
  GET    /members
  GET    /members/:id
  PATCH  /members/:id/status
  DELETE /members/:id

Dashboard:
  GET    /admin/dashboard/stats
```

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9

# Or run on a different port
npm run dev -- --port 3000
```

### CORS Issues

Ensure your backend API has CORS enabled for the frontend origin:

```javascript
// Backend CORS configuration example
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
```

### Module Not Found

Clear cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use CSS Modules for component styling
- Keep components small and focused
- Use meaningful variable names

### Component Structure

```typescript
// Component template
import React, { useState, useEffect } from "react";
import styles from "./Component.module.css";

interface ComponentProps {
  // Props definition
}

const Component: React.FC<ComponentProps> = ({ props }) => {
  // State and hooks

  // Event handlers

  // Effects

  // Render
  return <div className={styles.container}>{/* JSX */}</div>;
};

export default Component;
```

### Service Structure

```typescript
// Service template
import axiosClient from "./axiosClient";
import type { TypeName } from "../types/type.types";

export const serviceName = {
  methodName: async (): Promise<TypeName> => {
    const response = await axiosClient.get<TypeName>("/endpoint");
    return response as unknown as TypeName;
  },
};
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Hoàng Minh** - [Hoangminh2704](https://github.com/Hoangminh2704)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for the blazing fast build tool
- Material Symbols for the beautiful icons
- All contributors who have helped this project

## 📧 Support

For support, email support@library.com or open an issue in the GitHub repository.

---

**Made with ❤️ by the Library Management Team** -->
