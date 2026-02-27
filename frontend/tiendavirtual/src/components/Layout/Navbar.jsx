// Navbar.jsx
import { useState } from 'react';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; // 👈 importa el contexto

function Navbar (){
    const { usuario, logout } = useAuth(); // 👈 obtén el usuario y logout
    const [cartCount, setCartCount] = useState(0);
    const [mobileMenuOpen, setMobilOpenMenu] = useState(false);
    const { totalItems } = useCart();
    const getInitials = () => {
      const n = usuario?.nombre?.[0] || "";
      const a = usuario?.apellido?.[0] || "";
      return (n + a).toUpperCase() || "U";
  };
    

    return(
        <header className="bg-white shadow-lg sticky top-0 z-50">
    <nav className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg mr-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TechStore Pro
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
              Inicio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a href="/products" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
              Productos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
          </a>
          <a href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
          </a>
        </div>

        {/* Cart and User Icons */}
        <div className="flex items-center space-x-2">

          {/* Cart Icon */}
          <a href="/cart" className="relative group p-2.5 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 transform hover:scale-105">
            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-all duration-300 group-hover:rotate-3" />
            {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-linear-to-r from-red-500 via-pink-500 to-red-600 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1 shadow-lg border-2 border-white animate-pulse">
                {totalItems}
                </span>
            )}
          </a>

          {/* 👇 Aquí está el cambio clave */}
          {usuario ? (
            // Si hay sesión: muestra nombre + botón de perfil + logout
            <div className="flex items-center space-x-1">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-2 hover:bg-blue-50 rounded-xl transition-all duration-300 group"
              >
                <span className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-xl shadow-md hover:scale-105 transition-transform">
                  {getInitials()}
                </span>
              </Link>

              <button
                onClick={logout}
                title="Cerrar sesión"
                className="p-2.5 hover:bg-red-50 rounded-xl transition-all duration-300 group"
              >
                <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
              </button>
            </div>
          ) : (
            // Si NO hay sesión: muestra el link de login como antes
            <Link
              to="/login"
              className="relative group p-2.5 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              <User className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-all duration-300" />
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobilOpenMenu(!mobileMenuOpen)}
            className="md:hidden p-2.5 hover:bg-linear-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300"
          >
            {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
            ) : (
                <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 py-4 border-t border-gray-200 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">Inicio</a>
            <a href="/products" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">Productos</a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2">Contacto</a>
            {/* 👇 También en mobile */}
            {usuario ? (
              <>
                <Link to="/profile" className="text-blue-600 font-medium py-2">Mi perfil ({usuario.nombre})</Link>
                <button onClick={logout} className="text-red-500 font-medium py-2 text-left">Cerrar sesión</button>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium py-2">Iniciar sesión</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  </header>
    );
}

export default Navbar;