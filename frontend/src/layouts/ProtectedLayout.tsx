import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedLayout() {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
