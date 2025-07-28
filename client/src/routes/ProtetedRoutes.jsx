import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, adminOnly = false, isAuthPage = false, authPageType = 'user' }) => {
  const { isAuthenticated, isCheckingAuth, user, admin } = useSelector((state) => state.auth);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }


  if (isAuthPage) {
    if (isAuthenticated) {
      if (authPageType === 'admin') {

        if (user && !admin) {
          return <Navigate to="/dashboard" replace />;
        }

        if (admin) {
          return <Navigate to="/admin/dashboard" replace />;
        }
      } else {
        if (admin && !user) {

          return <Navigate to="/admin/dashboard" replace />;
        }
        if (user) {

          return <Navigate to="/dashboard" replace />;
        }
      }
    }

    return children;
  }


  if (!isAuthenticated) {
    return <Navigate to={adminOnly ? "/admin/login" : "/login"} replace />;
  }

  if (adminOnly && !admin) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!adminOnly && admin && !user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;