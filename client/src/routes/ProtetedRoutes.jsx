import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user, admin } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (role && user?.role !== role) return <Navigate to="/" />;
//    if (!isAuthenticated && ! admin) return <Navigate to="admin/login" />;
//   if (role && admin?.role !== role) return <Navigate to="/admin/dashboard" />;

  return children;
};

export default ProtectedRoute;