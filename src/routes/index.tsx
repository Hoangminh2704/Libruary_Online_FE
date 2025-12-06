import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/Login/LoginPage";
import HomePage from "../pages/member/Home/HomePage";
import BookDetailPage from "../pages/member/BookDetail/BookDetailPage";
import MyLoansPage from "../pages/member/MyLoans/MyLoan";
import AdminDashboard from "../pages/admin/Dashboard/AdminDashboard";
import BookCatalogPage from "../pages/admin/BookCatalog/BookCatalogPage";
import MembersListPage from "../pages/admin/MemberList/MemberListPage";
import ReturnBookPage from "../pages/admin/ReturnBook/ReturnBookPage";
import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute";
import Layout from "../components/common/Layout/Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/user/homepage",
        element: (
          <ProtectedRoute allowedRoles={["user"]}>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user/book/:id",
        element: (
          <ProtectedRoute allowedRoles={["user"]}>
            <BookDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/user/my-loans",
        element: (
          <ProtectedRoute allowedRoles={["user"]}>
            <MyLoansPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/catalog",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <BookCatalogPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/members",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <MembersListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/returns",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            <ReturnBookPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/",
        element: <LoginPage />,
      },
    ],
  },
]);
