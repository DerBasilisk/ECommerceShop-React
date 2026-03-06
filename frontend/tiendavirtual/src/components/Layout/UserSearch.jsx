import { useState } from 'react';

const UserSearch = ({ onSelectUser }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    setError(null);

    if (value.trim().length < 2) {
      setResults([]);
      return;
    }

    const token = JSON.parse(localStorage.getItem('usuario'))?.token;
    if (!token) {
      setError('No hay sesión activa.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8081/api/user/search?q=${value}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.ok) setResults(data.data);
      else {
        setResults([]);
        setError(data.message);
      }
    } catch {
      setError('Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (usuario) => {
    onSelectUser(usuario);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="relative w-full group">
      {/* Contenedor del Input con Icono */}
      <div className="relative flex items-center">
        <span className="absolute left-3 text-gray-400 group-focus-within:text-blue-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Buscar personas..."
          className="w-full bg-gray-100 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-gray-400 text-gray-700"
        />
      </div>

      {/* Estados de Carga y Error */}
      <div className="absolute right-3 top-2.5">
        {loading && (
          <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
        )}
      </div>

      {error && query.length > 1 && (
        <p className="absolute -bottom-5 left-1 text-[10px] text-red-500 font-medium">{error}</p>
      )}

      {/* Dropdown de Resultados */}
      {results.length > 0 && (
        <div className="absolute top-12 left-0 right-0 bg-white/95 backdrop-blur-sm border border-gray-100 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto overflow-x-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Resultados</p>
          
          {results.map((usuario) => (
            <div
              key={usuario._id}
              onClick={() => handleSelect(usuario)}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <div className="shrink-0 w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xs ring-2 ring-white shadow-sm">
                {usuario.nombre?.[0]?.toUpperCase() ?? '?'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{usuario.nombre}</p>
                <p className="text-[11px] text-gray-500 truncate">{usuario.correo}</p>
              </div>
              <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSearch;