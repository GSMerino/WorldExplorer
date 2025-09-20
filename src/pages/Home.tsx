import {CountryList} from "../components/CountryList"

export function Home() {
    return (
        <section className="lg:py-8 lg:px-40 sm:py-2">
            <div className="">
                <div className="w-full flex justify-between">
                    <input className="border rounded py-2 px-4" placeholder="Buscar por nombre" />
                    <select className="border rounded py-2 px-2">
                        <option value="all">Region</option>
                            <option value="All">Filter By Region</option>
                            <option value="Africa">Africa</option>
                            <option value="Americas">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                    </select>
                </div>
            </div>

            <CountryList />
        
        </section>
    )
}