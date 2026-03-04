import { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar'
import Filter from '../Layout/Filter'
import ProductsCat from '../Layout/ProductsCat.jsx'
import Footer from '../Layout/Footer'

export default function Products() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState('');
    const [orden, setOrden] = useState('relevance');

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/productos');
                if (!response.ok) throw new Error('No se pudo conectar con el servidor');
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

    const productosFiltrados = productos
        .filter(p => {
            const coincideNombre = p.nombre.toLowerCase().includes(search.toLowerCase());
            const coincideCategoria = categoria ? p.categoria === categoria : true;

            let coincidePrecio = true;
            if (precio === '0-500000') coincidePrecio = p.precio <= 500000;
            else if (precio === '500000-1500000') coincidePrecio = p.precio > 500000 && p.precio <= 1500000;
            else if (precio === '1500000-3000000') coincidePrecio = p.precio > 1500000 && p.precio <= 3000000;
            else if (precio === '3000000') coincidePrecio = p.precio > 3000000;

            return coincideNombre && coincideCategoria && coincidePrecio;
        })
        .sort((a, b) => {
            if (orden === 'price-asc') return a.precio - b.precio;
            if (orden === 'price-desc') return b.precio - a.precio;
            if (orden === 'name-asc') return a.nombre.localeCompare(b.nombre);
            if (orden === 'name-desc') return b.nombre.localeCompare(a.nombre);
            return 0;
        });

    return (
        <>
            <Navbar />
            <Filter
                search={search} setSearch={setSearch}
                categoria={categoria} setCategoria={setCategoria}
                precio={precio} setPrecio={setPrecio}
                orden={orden} setOrden={setOrden}
            />
            <ProductsCat
                productos={productosFiltrados}
                loading={loading}
                error={error}
            />
            <Footer />
        </>
    );
}