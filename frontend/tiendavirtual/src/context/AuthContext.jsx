import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AdminPanel from "./components/Admin";
import Home from "./components/Pages/Home";
import Layout from "./components/Layout/Layout";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/productos"
                    element={
                        <PrivateRoute rolRequerido="user">
                            <Layout />
                                <h1>Página de Productos</h1>
                        </PrivateRoute>
                    }
                />

                    <Route path="/admin"
                    element={
                        <PrivateRoute rolRequerido="admin">
                            <AdminPanel />
                        </PrivateRoute>
                    }
                />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;