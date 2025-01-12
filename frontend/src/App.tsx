import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import EmployeeManagement from "./pages/employee/employee"
import Login from "./pages/login/login"
import { useSelector } from "react-redux";

function App() {

const token = useSelector((state: {token: string})=>state.token)

const ProtectedRoute = ({ token, children }: { token: string | null; children: JSX.Element }) => {
  return token ? children : <Navigate to="/" />;
};

const PublicRoute = ({ token, children }: { token: string | null; children: JSX.Element }) => {
  return token ? <Navigate to="/manage" /> : children;
};

  return(
    <Router>
      <Routes>
        <Route path="/" element={
          <PublicRoute token={token}>
            <Login/>
          </PublicRoute>}/>
        <Route path="/manage" element={
          <ProtectedRoute token={token}>
            <EmployeeManagement/>
          </ProtectedRoute>}/>
      </Routes>
    </Router>
  )
  
}

export default App
