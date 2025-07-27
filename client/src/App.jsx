import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import UserDashboard from "./pages/UserDashboard"
// import AdminDashboard from "./AdminDashboard"
import ProtectedRoute from '../src/routes/ProtetedRoutes'
import AdminLogin from "./pages/AdminLogin"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected User Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/login" element = {<AdminLogin/>}></Route>
        {/* Protected Admin Route
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
