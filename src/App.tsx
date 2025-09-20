import { Routes, Route } from 'react-router-dom'
import { Home } from "./pages/Home"


function App() {
  

    return (
        <main className=''>
            <header className='bg-red-500 p-5 sticky top-[0px]'>
                <nav>
                    <p className='font-oswald text-2xl font-medium'>World Explorer</p>
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </main>
    )
}

export default App
