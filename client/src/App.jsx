import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { refreshToken } from "./features/auth/authThunk"
import { setAuthCheckComplete } from "./features/auth/authSlice"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import UserDashboard from "./pages/UserDashboard"
import AdminDashboard from "./pages/adminDashboard"
import ProtectedRoute from '../src/routes/ProtetedRoutes'
import AdminLogin from "./pages/AdminLogin"

const App = () => {
  const dispatch = useDispatch();
  const { accessToken, isCheckingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuth = async () => {
      if (accessToken) {
        try {
          await dispatch(refreshToken()).unwrap();
        } catch (error) {
          console.log('Token refresh failed on startup:', error);
        }
      } else {
        dispatch(setAuthCheckComplete());
      }
    };

    checkAuth();
  }, [dispatch, accessToken]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
 
        <Route
          path="/login"
          element={
            <ProtectedRoute isAuthPage={true} authPageType="user">
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute isAuthPage={true} authPageType="user">
              <Signup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/login"
          element={
            <ProtectedRoute isAuthPage={true} authPageType="admin">
              <AdminLogin />
            </ProtectedRoute>
          }
        />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App