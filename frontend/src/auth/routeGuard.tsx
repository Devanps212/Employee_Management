import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ token, children }: { token: string | null, children: JSX.Element }) => {
    return token ? children : <Navigate to="/" />
}

export const PublicRoute = ({ token, children }: { token: string | null, children: JSX.Element }) => {
    return token ? <Navigate to="/employeeManage" /> : children
}