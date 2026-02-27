import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, Send, Loader2, KeyRound, Shield } from "lucide-react";
import axios from "axios";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState( {type: "", text: ""});
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setMessage({type: "", text: ""});

        try {
            const response = await axios.post("http://localhost:8081/api/Recuperar/solicitar-codigo",
                { correo: email }
            );

            setMessage({type: "success", text: response.data.message || "Codigo Enviado"});

            setTimeout(() => {
                navigate("/verify-code", { state: { email } });
            }, 2000);
            
        } catch (error) {
            setMessage({type: "error", text: error.response?.data?.message || "Error al solicitar codigo"});

        } finally {
            setLoading(false);
        }

        
    }


return (
    <main className="min-h-screen flex items-center justify-center bg-gradiendt-to-br from-blue-50 to-purple-50">
        <div className="w-full max-w-md">
            <div className="bg-white shadow-2xl rounded-2xl p-8">
                {/* ENCABEZADO */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                        <KeyRound className="w-8 h-8 text-white"/>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Recuperar Contraseña</h2>
                    <p className="text-gray-600">Ingresa tu correo y te enviaremos un codigo</p>
                </div>
                {/* FORMULARIO */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="recovery-email" className="block text-sm font-medium text-gray-700 mb-2">
                            <Mail className="w-4 h-4 inline mr-2 text-gray-400"/>
                            Correo Electronico
                        </label>
                        <input type="email" 
                        id="recovery-email"
                        placeholder="tu@email.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                        required
                        />
                    </div>      
                    {/* Mensaje exito o error */}
                    {message.text && (
                    <div className={`p-4 rounded-lg ${
                        message.type === "success"
                        ? "bg-green-50 border border-green-200 text-green-800"
                        : "bg-red-50 border border-red-200 text-red-800"
                    }`}>
                        <span>{message.text}</span>
                    </div>
                    )}

                    {/* Boton enviar */}
                    <button type="submit" disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600
                                text-white py-3 rounded-lg font-semibold
                                disabled:opacity-50 flex items-center justify-center">
                    {loading ? (
                        <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Enviando...
                        </>
                    ) : (
                        <>
                        <Send className="w-5 h-5 mr-2" /> ENVIAR CODIGO
                        </>
                    )}
                    </button>
                    </form>

                    {/* Boton volver */}
                    <div className="mt-6 text-center">
                    <button type="button" onClick={() => navigate("/login")}
                        className="text-blue-600 font-semibold inline-flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Volver al inicio de sesion
                    </button>
                </div>
            </div>
        </div>
    </main>
);
// fin ForgotPassword
}