import { useState, useEffect } from 'react';
import Navbar from '../Layout/Navbar'; // Ajusta la ruta
import FeaturedProducts from '../Layout/FeatureProducts'; // El que creamos antes
import Footer from '../Layout/Footer';
import Hero from '../Layout/Hero';
import Categories from '../Layout/Categories';
import { Cat } from 'lucide-react';

function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Aquí debes poner la misma URL de tu API que usas en Products.jsx
    fetch('http://localhost:8081/api/productos') 
      .then(response => {
        if (!response.ok) throw new Error('Error al conectar con la base de datos');
        return response.json();
      })
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      {/* Aquí le pasamos los datos al componente */}
      <FeaturedProducts 
        productos={productos} 
        loading={loading} 
        error={error} 
      />
      <Footer />
    </>
  );
}

export default Home;