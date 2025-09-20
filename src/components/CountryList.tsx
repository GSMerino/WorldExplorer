import { useEffect } from "react";
import { useCountrieStore } from "../store/countrieStore/useCountrieStore"

export const CountryList = () => {
    const { countries, fetchCountries } = useCountrieStore();
    
    useEffect(() => {
        fetchCountries(); 
    }, [fetchCountries]);
    
    return(
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-10 lg:p-4 py-9 ">
            {countries.map(country => (
                <article 
                    key={country.cca3 || country.name.common} 
                    className="flex flex-col min-h-[240px] bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                    <div className="w-full  max-h-[300px]">
                        <img 
                            src={country.flags.png} 
                            alt={country.flags.alt || `Flag of ${country.name.common}`}
                            className="w-full h-40"
                        />
                    </div>

                    <div className="p-2 flex flex-col gap-10 mb-5 font-oswald">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-center font-oswald text-primary-800  text-2xl font-medium">{country.name.common}</h3>
                            <p className="font-oswald">Capital: {country.capital?.[0]}</p>
                            <p className="">Idioma: {Object.values(country.languages || {})[0]}</p>
                            <p>Población 👥: {country.population?.toLocaleString()}</p>
                        </div>


                        <div className="flex justify-center">
                            <button className="font-oswald py-2 px-10 bg-red-500 rounded-xl cursor-pointer">
                                Ver detalle
                            </button>
                        </div>
                    </div>



                </article>
            ))}
        </section>
    );
}