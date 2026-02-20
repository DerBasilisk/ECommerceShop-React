import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Admin from "./components/Pages/Admin";
import Home from "./components/Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/productos"
            element={
              <PrivateRoute rolRequerido="user">
                <div>Productos</div>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute rolRequerido="admin">
                <Admin />
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