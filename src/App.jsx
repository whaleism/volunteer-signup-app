import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrowseShifts from "./pages/public/BrowseShifts.jsx";
import Login from "./pages/public/Login.jsx";
import Signup from "./pages/public/Signup.jsx";
import MyShifts from "./pages/volunteer/MyShifts.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import CreateShift from "./pages/admin/CreateShift.jsx";
import ShiftDetail from "./pages/admin/ShiftDetail.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BrowseShifts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/my-shifts"
            element={
              <ProtectedRoute>
                <MyShifts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/shifts/new"
            element={
              <AdminRoute>
                <CreateShift />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/shifts/:id"
            element={
              <AdminRoute>
                <ShiftDetail />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
