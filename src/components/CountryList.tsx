import { useEffect, useState } from "react";
import { useCountrieStore } from "../store/countrieStore/useCountrieStore"
import { Button } from '@mui/material';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { useDebounceCountry } from "../hooks/useSearchCountryDebauns";


export const CountryList = () => {

    const navigate = useNavigate();

    const { 
        countries, 
        loading, 
        error,  
        currentPage,
        itemsPerPage,
        selectedRegion,
        selectedLanguage,
        totalPages,
        searchQuery,
        getPaginatedCountries,
        setCurrentPage,
        setItemsPerPage,
        setRegion,
        setLanguage,
        applyFilters,
        fetchCountries,
        searchCountriesByName
       
    } = useCountrieStore();

    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
    const debouncedSearchQuery = useDebounceCountry(localSearchQuery, 500);
    
    // Obtener países de la página actual
    const paginatedCountries = getPaginatedCountries();
    const totalCountries = countries.length;


    useEffect(() => {
        searchCountriesByName(debouncedSearchQuery);
    }, [debouncedSearchQuery]);
    
    useEffect(() => {
        if (countries.length === 0) {
            fetchCountries();
        }
    }, [fetchCountries, countries.length]);

    useEffect(() => {
        if (selectedRegion !== "all" || selectedLanguage !== "all") {
            applyFilters();
        }
    }, [selectedRegion, selectedLanguage, applyFilters]);


    const handleViewDetail = (countryCode: string) => {
        navigate(`/country/${countryCode}`);
    };

    const handleRegionChange = (region: string) => {
        setRegion(region);
    };

    const handleLanguageChange = (language: string) => {
        setLanguage(language);
    };



    if (loading) return <div className="p-8 text-center">Loading countries...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;
    
    return(
        <section>
            {/* CONTROLES DE PAGINACIÓN */}
            <div className="p-4 bg-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 rounded-xl">
                <div className="border">
                    <div className="flex flex-col w-full lg:w-[50%] justify-end h-[100%]">
                        <TextField
                            value={localSearchQuery}
                            onChange={(e) => setLocalSearchQuery(e.target.value)}
                            label="Buscar"
                            variant="outlined"
                            placeholder="Buscar por nombre"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    


                </div>
                <div className="flex gap-5">
                    
                    <div className="flex flex-col gap-2">
                        <p>Filtrar por Region:</p>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">Region</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedRegion}
                                label="Region"
                                onChange={(e) => handleRegionChange(e.target.value)}
                            >
                                <MenuItem value="all">Todos</MenuItem>
                                <MenuItem value="europe">Europa</MenuItem>
                                <MenuItem value="asia">Asia</MenuItem>
                                <MenuItem value="africa">Africa</MenuItem>
                                <MenuItem value="americas">America</MenuItem>
                                <MenuItem value="oceania">Oceania</MenuItem>
                                <MenuItem value="antarctic">Antartida</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p>Filtrar por Idioma:</p>
                        <FormControl fullWidth size="small">
                           <InputLabel id="demo-simple-select-label">Idioma</InputLabel> 

                            <Select
                                label="Idioma"
                                value={selectedLanguage}
                                onChange={(e) => handleLanguageChange(e.target.value)}
                            >       
                                <MenuItem value="all">Todos</MenuItem>
                                <MenuItem value="english">Ingles</MenuItem>
                                <MenuItem value="spanish">Español</MenuItem>
                                <MenuItem value="french">Francia</MenuItem>
                                <MenuItem value="german">German</MenuItem>
                                <MenuItem value="arabic">Arabia</MenuItem>
                                <MenuItem value="chinese">China</MenuItem>
                                <MenuItem value="hindi">India</MenuItem>
                                <MenuItem value="portuguese">Portuguese</MenuItem>
                                <MenuItem value="russian">Rusia</MenuItem>
                                <MenuItem value="japanese">Japon</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
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
                        
                        <div className="text-sm text-gray-600 flex flex-col gap-4">
                            <p>🏛️ Capital: {country.capital?.[0] || "N/A"}</p>
                            <p>
                                🌍 Region: {country.region || "N/A"}
                            </p>
                            <p>👥 Population: {country.population?.toLocaleString() || "N/A"}</p>

                            {country.languages && (
                                <p>🗣️ Language: {Object.values(country.languages)[0]}</p>
                            )}
                            <div className="flex justify-center">
                               <Button 
                                    variant="outlined"
                                    onClick={() => handleViewDetail(country.cca3)}
                                >
                                    Ver detalle
                                </Button>
                            </div>
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