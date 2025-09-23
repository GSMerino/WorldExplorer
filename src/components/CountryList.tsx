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
        selectedLanguage,
        totalPages,
        getPaginatedCountries,
        setCurrentPage,
        setItemsPerPage,
        setRegion, // ← Cambiado
        setLanguage, // ← Cambiado
        applyFilters // ← Nuevo
       
    } = useCountrieStore();
    
    // Obtener países de la página actual
    const paginatedCountries = getPaginatedCountries();
    const totalCountries = countries.length;
    
    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    useEffect(() => {
        if (selectedRegion !== "all" || selectedLanguage !== "all") {
            applyFilters();
        }
    }, [selectedRegion, selectedLanguage, applyFilters]);

        const handleRegionChange = (region: string) => {
        setRegion(region);
    };

    const handleLanguageChange = (language: string) => {
        setLanguage(language);
    };

    const handleClearFilters = () => {
        setRegion("all");
        setLanguage("all");
        fetchCountries();
    };


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

                <div className="flex flex-col gap-2">
                    <p>Filtrar por Region:</p>
                    <select
                        value={selectedRegion}
                        onChange={(e) => handleRegionChange(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Todas</option>
                        <option value="europe">Europa</option>
                        <option value="asia">Asia</option>
                        <option value="africa">Africa</option>
                        <option value="americas">America</option>
                        <option value="oceania">Oceania</option>
                        <option value="antarctic">Antartida</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <p>Filtrar por Idioma</p>
                    <select
                        value={selectedLanguage}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                    >       
                        <option value="all">Todos</option>
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="arabic">Arabic</option>
                        <option value="chinese">Chinese</option>
                        <option value="hindi">Hindi</option>
                        <option value="portuguese">Portuguese</option>
                        <option value="russian">Russian</option>
                        <option value="japanese">Japanese</option>
                    </select>
                </div>

                
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


            {(selectedRegion !== "all" || selectedLanguage !== "all") && (
                <div className="p-4 bg-blue-50 border-b">
                    <div className="max-w-4xl mx-auto flex justify-between items-center">
                        <p className="text-sm text-blue-800">
                            📍 Active filters: 
                            {selectedRegion !== "all" && <span className="font-bold ml-2">Region: {selectedRegion}</span>}
                            {selectedLanguage !== "all" && <span className="font-bold ml-2">Language: {selectedLanguage}</span>}
                            <span className="ml-2 text-blue-600">({totalCountries} countries)</span>
                        </p>
                        <button 
                            onClick={fetchCountries}
                            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Clear All Filters
                        </button>
                    </div>
                </div>
            )}



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
                            <p>
                                🌍 Region: {country.region || "N/A"}
                            </p>
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