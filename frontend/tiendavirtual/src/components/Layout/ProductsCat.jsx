import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react'; // Opcional, para el botón
import { useCart } from '../../context/CartContext';

function ProductsCat() {
    // 1. Estados para los datos, carga y posibles errores
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();

    // 2. useEffect para llamar a tu API al montar el componente
    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/productos');
                if (!response.ok) {
                    throw new Error('No se pudo conectar con el servidor');
                }
                const data = await response.json();
                setProductos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        obtenerProductos();
    }, []);

    // 3. Manejo de estados visuales (Carga y Error)
    if (loading) return <div className="text-center p-10">Cargando productos...</div>;
    if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;

    return (
        <section className="bg-gray-50 py-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                    {productos.map((prod) => (
                        <div key={prod.productId} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
                            {/* Imagen del Producto */}
                            <div className="h-48 overflow-hidden bg-gray-200">
                                <img 
                                    src={prod.imagen} 
                                    alt={prod.nombre} 
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            {/* Info del Producto */}
                            <div className="p-5 flex flex-col grow">
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{prod.nombre}</h3>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{prod.descripcion}</p>
                                
                                <div className="mt-auto flex justify-between items-center">
                                    <span className="text-2xl font-bold text-blue-600">
                                        ${prod.precio.toLocaleString()}
                                    </span>
                                    <button onClick={() => addToCart(prod)} // 👈
                                        className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition-colors"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Paginación (puedes hacerla funcional después) */}
                <div className="mt-12 mb-4 flex justify-center">
                    <nav className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-500">
                        <button className="px-3 py-1 text-gray-400 cursor-not-allowed">Anterior</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</button>
                        <button className="px-3 py-1 text-gray-700 hover:text-blue-600">Siguiente</button>
                    </nav>
                </div>
            </div>
        </section>
    );
}

export default ProductsCat;