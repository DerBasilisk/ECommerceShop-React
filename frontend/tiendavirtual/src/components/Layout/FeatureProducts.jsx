import { Link } from 'react-router-dom';

function FeaturedProducts({ productos, loading, error }) {
  
  if (loading) return <div className="text-center py-20">Cargando destacados...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  
  // Si productos es null o vacío, mostramos un mensaje o nada
  if (!productos || productos.length === 0) {
    return <div className="text-center py-20 text-gray-400">No hay productos disponibles actualmente.</div>;
  }

  // Tomamos solo los primeros 3 para la sección destacada
  const featured = productos.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Productos Destacados</h2>
          <p className="text-gray-600">Lo mejor de nuestro catálogo para ti</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((prod) => (
            <div key={prod.productId || prod.id} className="border rounded-xl overflow-hidden shadow-lg flex flex-col">
              <div className="h-64 bg-gray-100">
                <img 
                  src={prod.imagen || prod.image} 
                  alt={prod.nombre || prod.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col grow">
                <h3 className="font-bold text-xl mb-2">{prod.nombre || prod.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{prod.descripcion || prod.description}</p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    ${Number(prod.precio).toLocaleString('es-CO')}
                  </span>
                  <Link 
                    to="/products" 
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition-colors"
                  >
                    Ver catálogo
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;