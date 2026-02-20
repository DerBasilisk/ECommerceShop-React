import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { User, Mail, Lock, Eye, EyeOff, LogIn, Loader2, Shield } from "lucide-react";

export default function Login() {

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });
    
        try {

            await login(correo, password);

            setMessage({ type: 'success', text: 'Inicio de sesión exitoso' });
            
        } catch (error) {
            console.error("Error", error);
            setMessage({ type: 'error', text: error.message || 'Error al iniciar sesión' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <main>
            <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-linear-to-br from-blue-50 via-white to-purple-50">
                <div className="w-full max-w-md">

                    <div className="text-center mb-8">

                        {/* Titulo */}
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold  text-gray-900 mb-2">!Bienvenido de vuelta¡</h2>
                        <p className="text-gray-600">Inicia Sesion en tu cuenta</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6" ></form>

                    {/* Correo */}
                    <div>
                        <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-2">
                            <Mail className="w-4 h-4 inline mr-2 text-gray-400" />
                            Correo Electronico
                        </label>
                        <input
                            type="email"
                            id="correo"
                            placeholder="tucorreo@email.com"
                            onChange={(e) => setCorreo(e.target.value)}
                            value={correo}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900"
                            required/>
                            </div>
                    </div>
                </div>
        </main>
    );
}