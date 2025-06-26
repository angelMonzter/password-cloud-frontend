// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { auth, cargando } = useAuth();

  if (cargando) return null;       // o tu spinner

  const estaAutenticado = Object.keys(auth).length > 0;

  return estaAutenticado
    ? children
    : <Navigate to="/sign-in" replace />;
}
