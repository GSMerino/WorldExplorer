import { Routes, Route } from 'react-router-dom'
import { Home } from "./pages/Home"
import { CountryDetail } from './pages/CountryDetail'
import { TbWorldDollar } from "react-icons/tb";
import { ChartsPage } from "./pages/ChartsPage";
import { Link } from 'react-router-dom';


function App() {
  

    return (
        <main className='bg-[#EBF0F2]'>
            <header className='bg-[#002A52] p-5 sticky top-0 z-[99]'>
                <nav className='flex items-center justify-between pl-2 pr-2 md:pl-[3.5rem] md:pr-[3.5rem] lg:pl-[3.5rem] lg:pr[3.5rem] xl:pl-[3.5rem] xl:pr-[3.5rem]'>
                    <span className='text-white font-oswald text-2xl font-medium flex items-center gap-1 '>
                        World Explorer
                        
                        <TbWorldDollar size={30}/>
                    </span>
                    <ul className='list-none flex gap-5'>
                        <li>
                            <Link to="/" className='text-white hover:underline'>
                                INICIO
                            </Link>
                        </li>
                        <li>
                            <Link to="/charts" className="text-white hover:underline">
                                GRAFICAS
                            </Link>

                        </li>
                    </ul>
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/country/:countryCode' element={<CountryDetail />} />
                <Route path="/charts" element={<ChartsPage />} />

            </Routes>
        </main>
    )
}

export default App
