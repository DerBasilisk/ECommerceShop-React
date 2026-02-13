import hero from '../assets/hero.png'
import balatro from '../assets/balatro.jpg'

function Sobremi(){
    return(
    <>
    <div  style={{ backgroundImage: `url(${balatro})` }} className='bg-cover bg-center bg-no-repeat'>
            <div className='min-h-screen w-full flex flex-col items-center justify-center bg-gray-900/95 p-10'>
        <div className='bg-gray-800 rounded-xl text-white p-3 flex flex-col items-center justify-center'>
         <img src={hero} alt="hero" className='w-40 border-5 border-green-300 h-40 rounded-full object-cover mb-4' />
            <h2 className='text-2xl font-bold'>Sobre Mi</h2>
            <p>Aprendiz de Tecnologo en el analisis y desarrollo de software en el SENA</p>
            <p>Estudiante de Ingenieria en Sistemas en la UNAD</p>
            <br />

            <div className='grid grid-cols-2 gap-4 justify-between'>
            
                <div className='flex flex-col rounded-2xl gap-1 items-center'> 
                    <span className='font-bold text-xl text-green-800'>Me Gusta</span>
                    <div className='text-green-200 hover:text-green-500'>Los Videojuegos</div>
                    <div className='text-green-200 hover:text-green-500'>La Edicion</div>
                    <div className='text-green-200 hover:text-green-500'>El Desarrollo</div>
                    <div className='text-green-200 hover:text-green-500'>El Analisis</div>
                    <div className='text-green-200 hover:text-green-500'>El Porno</div>
                </div>

                <div className='flex flex-col rounded-2xl gap-1 items-center'>
                    <span className='font-bold text-xl text-red-800'>Me Disgusta</span>
                    <div className='text-red-200 hover:text-red-500'>La Intolerancia</div>
                    <div className='text-red-200 hover:text-red-500'>Los Negros</div>
                    <div className='text-red-200 hover:text-red-500'>Los Blancos</div>
                    <div className='text-red-200 hover:text-red-500'>El Regueton</div>
                    <div className='text-red-200 hover:text-red-500'>No Tener Porno</div>
                </div>


                </div>            
            
            </div>
         </div>
    </div>
    
    </>
    )
}

export default Sobremi;