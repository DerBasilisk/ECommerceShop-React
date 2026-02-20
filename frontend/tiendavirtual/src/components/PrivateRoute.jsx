import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, rolRequerido }) => {
  const { usuario } = useAuth();

    // Si no hay usuario, redirigimos a login
    if (!usuario) {
        return <Navigate to="/login" replace />;
}

    // SI el rol no coincide, redirimos segun el rol del usuario
    if (rolRequerido && usuario.rol !== rolRequerido) {
        return usuario.rol === "admin"
            ? <Navigate to="/admin" replace />
            : <Navigate to="/productos" replace />;
    }

    return children;
};

export default PrivateRoute;