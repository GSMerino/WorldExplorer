import { useEffect } from "react";
import { useCountrieStore } from "../store/countrieStore/useCountrieStore"

export const CountryList = () => {
    const { 
        countries, 
        loading, 
        error, 
        fetchCountries, 
        currentPage,
        itemsPerPage,
        selectedRegion,
        totalPages,
        getPaginatedCountries,
        setCurrentPage,
        setItemsPerPage,
        filterByRegion
       
    } = useCountrieStore();
    
    // Obtener países de la página actual
    const paginatedCountries = getPaginatedCountries();
    const totalCountries = countries.length;
    
    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    if (loading) return <div className="p-8 text-center">Loading countries...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;
    
    return(
        <section>
            {/* CONTROLES DE PAGINACIÓN */}
            <div className="p-4 bg-gray-100 flex flex-wrap gap-4 items-center justify-between rounded-xl">
                <div>
                    <span className="text-sm text-gray-600">
                        Showing {((currentPage - 1) * itemsPerPage) + 1} to {" "}
                        {Math.min(currentPage * itemsPerPage, totalCountries)} of {" "}
                        {totalCountries} countries
                    </span>
                </div>

                 <select
                        value={selectedRegion}
                        onChange={(e) => filterByRegion(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Regions</option>
                        <option value="europe">Europe</option>
                        <option value="asia">Asia</option>
                        <option value="africa">Africa</option>
                        <option value="americas">Americas</option>
                        <option value="oceania">Oceania</option>
                        <option value="antarctic">Antarctic</option>
                    </select>
                
                <div className="flex items-center gap-4">
                    {/* Selector de items por página */}
                    <div className="flex items-center gap-2">
                        <label className="text-sm">Paises por pagina:</label>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                            className="p-1 border rounded"
                        >
                            <option value={8}>8</option>
                            <option value={12}>12</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>

                    {/* Controles de página */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
                        >
                            ←
                        </button>
                        
                        <span className="text-sm">
                            Page {currentPage} of {totalPages}
                        </span>
                        
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
                        >
                            →
                        </button>
                    </div>
                </div>

            </div>

            {/* LISTA DE PAÍSES PAGINADOS */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {paginatedCountries.map(country => (
                    <article key={country.cca3} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                        <img 
                            src={country.flags.png} 
                            alt={country.flags.alt || `Flag of ${country.name.common}`}
                            className="w-full h-40 object-cover mb-3 rounded"
                        />
                        
                        <h3 className="text-lg font-bold mb-2 text-gray-800">{country.name.common}</h3>
                        
                        <div className="space-y-1 text-sm text-gray-600">
                            <p>🏛️ Capital: {country.capital?.[0] || "N/A"}</p>
                            <p>🌍 Region: {country.region || "N/A"}</p>
                            <p>👥 Population: {country.population?.toLocaleString() || "N/A"}</p>
                            {country.languages && (
                                <p>🗣️ Language: {Object.values(country.languages)[0]}</p>
                            )}
                        </div>
                    </article>
                ))}
            </section>

            {/* PAGINACIÓN INFERIOR (opcional) */}
            {totalPages > 1 && (
                <div className="p-4 bg-gray-100 border-t flex justify-center">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600"
                        >
                            First
                        </button>
                        
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600"
                        >
                            Previous
                        </button>
                        
                        <span className="px-4 py-2 bg-white border rounded">
                            Page {currentPage} of {totalPages}
                        </span>
                        
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600"
                        >
                            Next
                        </button>
                        
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600"
                        >
                            Last
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}