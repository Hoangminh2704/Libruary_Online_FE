import { Navigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  console.log("🛡️ ProtectedRoute check:", {
    isAuthenticated,
    user,
    loading,
    allowedRoles,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log("⛔ Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user) {
    const userRole = user.role?.toUpperCase();
    const hasPermission = allowedRoles.some(
      (role) => role.toUpperCase() === userRole
    );

    console.log("🔐 Role check:", {
      userRole,
      allowedRoles,
      hasPermission,
    });

    if (!hasPermission) {
      console.log("⛔ Insufficient permissions, redirecting to login");
      return <Navigate to="/login" replace />;
    }
  }

  console.log("✅ Access granted");
  return <>{children}</>;
};

export default ProtectedRoute;
