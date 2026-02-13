import Categories from '../Layout/Categories'
import Hero from '../Layout/Hero.jsx'
import Navbar from '../Layout/Navbar'
import FeatureProducts from '../Layout/FeatureProducts'
import Newsletter from '../Layout/Newsletter.jsx'
import Footer from '../Layout/Footer'

export default function Home() {
    return (
    <>
      <Navbar/>
      <Hero/>
      <Categories/>
      <FeatureProducts/>
      <Newsletter/>
      <Footer/>
    </>
    )
}