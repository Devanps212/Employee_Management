import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeManagement from "./pages/employee/employee";
import DepartManagement from "./pages/department/department";
import Login from "./pages/login/login";
import { useSelector } from "react-redux";
import { ProtectedRoute, PublicRoute } from "./auth/routeGuard";

function App() {
  const token = useSelector((state: { token: string }) => state.token)

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <PublicRoute token={token}>
            <Login />
          </PublicRoute>
        } />
        <Route path="/employeeManage" element={
          <ProtectedRoute token={token}>
            <EmployeeManagement />
          </ProtectedRoute>
        } />
        <Route path="/departmentManage" element={
          <ProtectedRoute token={token}>
            <DepartManagement />
          </ProtectedRoute>
        } />
        </Routes>
    </Router>
  )
}

export default App
