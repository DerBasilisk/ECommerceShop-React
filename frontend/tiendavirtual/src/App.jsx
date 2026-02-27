import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from './context/CartContext';

import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Admin from "./components/Pages/Admin";
import Home from "./components/Pages/Home";
import ForgotPassword from "./components/Pages/ForgotPassword";
import VerifyCode from "./components/Pages/VerifyCode";
import Products from "./components/Pages/Products"
import Contact from "./components/Pages/Contact"
import Profile from "./components/Pages/Profile"
import Purshase from "./components/Pages/Purshase";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <CartProvider> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Purshase />} />

          <Route
            path="/"
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

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;