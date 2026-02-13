import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    const login = async (correo, password) => {
        try {
            const response = await axios.post("http://localhost:8081/api/login",
                { correo:correo, 
                    passwords:password,});


            const data = response.data;


            setUsuario({
                ...data.usuario, 
                token: data.token 
            });

            if(data.usuario.rol === "admin") {
                navigate("/admin");
            } else {
                navigate("/productos");
            }
        
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || "Error al iniciar sesión");
            } else if (error.request) {
                throw new Error("No se pudo conectar al servidor");
            } else {
                throw new Error("Error al procesar la solicitud");
            }
        }

    };

    const logout = () => {
        setUsuario(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
    
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};