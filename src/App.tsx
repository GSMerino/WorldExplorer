import { Routes, Route } from 'react-router-dom'
import { Home } from "./pages/Home"
import { CountryDetail } from './pages/CountryDetail'
import { TbWorldDollar } from "react-icons/tb";

function App() {
  

    return (
        <main className='bg-[#EBF0F2]'>
            <header className='bg-red-500 p-5 sticky top-[0px] z-[99]'>
                <nav>
                    <span className='font-oswald text-2xl font-medium flex items-center gap-1 '>
                        World Explorer
                        <TbWorldDollar size={30}/>
                    </span>
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/country/:countryCode' element={<CountryDetail />} />
            </Routes>
        </main>
    )
}

export default App
