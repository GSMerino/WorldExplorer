import { useEffect, useState } from "react";
import { useCountrieStore } from "../store/countrieStore/useCountrieStore"
import { motion, AnimatePresence  } from 'framer-motion';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import { useDebounceCountry } from "../hooks/useSearchCountryDebauns";
import { MdArrowBackIos, MdArrowForwardIos, MdOutlineCleaningServices  } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { fadeIn } from "../variants/variant"; 
import { RxDoubleArrowRight } from "react-icons/rx";
import { MdOutlineKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardArrowLeft  } from "react-icons/md";



export const CountryList = () => {

    const navigate = useNavigate();

    const {
        countries,
        loading,
        error,
        currentPage,
        itemsPerPage,
        totalPages,
        selectedRegion,
        selectedLanguage,
        sortBy,
        searchQuery,
        selectedCurrency,
        
        getPaginatedCountries,
        setCurrentPage,
        setItemsPerPage,
        setRegion,
        setLanguage,
        setSortBy,
        searchCountriesByName,
        resetFilters,
        fetchCountries,
        setCurrency 
    } = useCountrieStore();

    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
    const debouncedSearchQuery = useDebounceCountry(localSearchQuery, 500);
    
    useEffect(() => {
        searchCountriesByName(debouncedSearchQuery);
    }, [debouncedSearchQuery]);

    //carga inicial de paises si no hay datos
    useEffect(() => {
        if (countries.length === 0) {
            fetchCountries();
        }
    }, [fetchCountries, countries.length]);

    // Obtener países de la página actual
    const paginatedCountries = getPaginatedCountries();
    const totalCountries = countries.length;

    const handleViewDetail = (countryCode: string) => {
        navigate(`/country/${countryCode}`);
    };


    //FILTROS

    const handleRegionChange = (region: string) => {
        
        setRegion(region);
    };

    const handleLanguageChange = (language: string) => {
        setLanguage(language);
    };

    const handleSortChange = (sortOption: string) => {
        setSortBy(sortOption as typeof sortBy);
    };

    const handleClearAllFilters = () => {
        setLocalSearchQuery('');
        resetFilters();
    };



    if (loading) return <div className="p-8 text-center">Loading countries...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;
    
    return(
        <section>
            <div className="w-full mb-10 pt-8 pl-4 pr-4 mt-4 md:mt-0 lg:mt-0" >

                <div className="flex flex-col gap-4">
                    
                    <div>
                        <div className="w-full md:w-[40%] lg:w-[40%] xl:w-[30%]">
                            <TextField
                                value={localSearchQuery}
                                onChange={(e) => setLocalSearchQuery(e.target.value)}
                                label="Buscar"

                                placeholder="Escribe el nombre de un país"
                                className="w-full bg-[#ffffff] p-0"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        padding: '4px 8px', 
                                        height: '40px',     
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <div className="p-4 bg-[#ffffff] rounded-xl w-full">
                        <div className="flex flex-col gap-6">
                            <div className="w-full grid grid-cols-1 lg:grid-cols-5 md:grid-cols-5 gap-5">
                                
                                <div className="flex flex-col gap-4">
                                    <p>Filtrar por Idioma</p>
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
                                <div className="flex flex-col gap-4">
                                    <p>Filtrar por Region</p>
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
                                            <MenuItem value="Europe">Europa</MenuItem>
                                            <MenuItem value="Asia">Asia</MenuItem>
                                            <MenuItem value="Africa">Africa</MenuItem>
                                            <MenuItem value="Americas">America</MenuItem>
                                            <MenuItem value="Oceania">Oceania</MenuItem>
                                            <MenuItem value="Antarctic">Antartida</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <p>Ordenar por</p>  
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="demo-simple-select-label">Ordenar</InputLabel>
                                        <Select
                                            value={sortBy}
                                            label="Ordenar"
                                            onChange={(e) => handleSortChange(e.target.value)}
                                        >
                                            <MenuItem value="none">Sin orden</MenuItem>
                                            <MenuItem value="populationDesc">Población (Mayor a menor)</MenuItem>
                                            <MenuItem value="populationAsc">Población (Menor a mayor)</MenuItem>
                                            <MenuItem value="nameAsc">Nombre (A-Z)</MenuItem>
                                            <MenuItem value="nameDesc">Nombre (Z-A)</MenuItem>
                                        </Select>
                                    </FormControl> 
                                </div>
                                <div className="flex flex-col gap-4">
                                    <p>Paises por pagina</p>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="demo-simple-select-label">Paginas</InputLabel>
                                        <Select
                                            id="demo-simple-select-label"
                                            label="Paginas"
                                            value={itemsPerPage}
                                            onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                        >
                                            <MenuItem value={8}>8</MenuItem>
                                            <MenuItem value={12}>12</MenuItem>
                                            <MenuItem value={20}>20</MenuItem>
                                            <MenuItem value={50}>50</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <p>Moneda</p>
                                    <FormControl fullWidth size="small">
                                        <InputLabel id="demo-simple-select-label">Moneda</InputLabel>
                                        <Select
                                            label="Moneda"
                                            value={selectedCurrency}
                                            onChange={(e) => setCurrency(e.target.value)}
                                        >
                                            <MenuItem value="USD">USD</MenuItem>
                                            <MenuItem value="EUR">EUR</MenuItem>
                                            <MenuItem value="GBP">GBP</MenuItem>
                                            <MenuItem value="JPY">JPY</MenuItem>
                                            <MenuItem value="MXN">MXN</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                            </div>
                            <div className="w-full flex justify-between items-center">
                                <div>
                                    {(selectedRegion !== "all" || selectedLanguage !== "all" ) && (
                                        <div className="items-center flex">
                                            <p className="text-sm text-blue-800">
                                                📍 Filtros: 
                                                {selectedRegion !== "all" && <span className="font-bold ml-2">Region: {selectedRegion}</span>}
                                                {selectedLanguage !== "all" && <span className="font-bold ml-2">Language: {selectedLanguage}</span>}
                                                <span className="ml-2 text-blue-600">({totalCountries} Paises)</span>
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-5">
                                    <div>
                                        {(selectedRegion !== "all" || selectedLanguage !== "all" ) && (
                                            <div>
                                                <Tooltip title="Limpiar filtros">
                                                    <IconButton
                                                        onClick={handleClearAllFilters}
                                                    >
                                                        <MdOutlineCleaningServices /> 
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        )}

                                    </div>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 rounded disabled:opacity-50 hover:bg-gray-100"
                                        >
                                            <MdArrowBackIos size={20} />
                                        </button>
                                
                                        <span className="text-sm">
                                            Pagina {currentPage} de {totalPages}
                                        </span>
                                
                                        <button
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1 disabled:opacity-50 hover:bg-gray-100"
                                        >
                                            <MdArrowForwardIos  size={20} />
                                        </button>
                                    </div> 
                                </div>

                            </div>
                        </div>


                    </div>
                </div>

            </div>







            {/* LISTA DE PAÍSES PAGINADOS */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                
                <AnimatePresence mode="wait">
                    {paginatedCountries.map((country, index) => (
                        <motion.article
                            key={country.cca3}
                            initial="hidden"
                            animate="show"
                            exit={{ opacity: 0, scale: 0.9 }}
                            variants={fadeIn('up', index * 0.1)}
                            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                        >
                            <img 
                                src={country.flags.png} 
                                alt={country.flags.alt || `Flag of ${country.name.common}`}
                                className="w-full h-40 object-cover mb-3 rounded"
                            />
                                
                            <h3 className="text-lg font-bold mb-2 text-gray-800">{country.name.common}</h3>
                                
                            <div className="text-sm text-gray-600 flex flex-col gap-4 font-semibold">
                                <p>🏛️ Capital: {country.capital?.[0] || "N/A"}</p>
                                <p>
                                    🌍 Region: {country.region || "N/A"}
                                </p>
                                <p>👥 Poblaciòn: {country.population?.toLocaleString() || "N/A"}</p>

                                {country.languages && (
                                    <p>🗣️ Idioma: {Object.values(country.languages)[0]}</p>
                                )}
                                <div className="flex justify-center">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ type: 'spring', stiffness: 400 }}
                                        className="bg-[#FC4044] font-semibold text-white px-4 py-2 rounded-xl"
                                        onClick={() => handleViewDetail(country.cca3)}
                                    >
                                        Ver detalle
                                    </motion.button>

                                </div>
                            </div>
                        </motion.article>

                    ))}                           
                </AnimatePresence>                       

                          

            </section>

            {/* PAGINACIÓN INFERIOR (opcional) */}
            {totalPages > 1 && (
                <div className="p-4 bg-gray-100 border-t flex justify-center">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-[#0D30C3] text-white rounded disabled:opacity-50 hover:bg-blue-600"
                        >
                            <MdKeyboardDoubleArrowLeft />
                        </button>
                        
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-[#0D30C3] text-white rounded disabled:opacity-50 hover:bg-blue-600"
                        >
                            
                            <MdKeyboardArrowLeft />
                        </button>
                        
                        <span className="px-4 py-2 bg-white border rounded">
                            Pagina {currentPage} de {totalPages}
                        </span>
                        
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-[#0D30C3] text-white rounded disabled:opacity-50 hover:bg-blue-600"
                        >
                            <MdOutlineKeyboardArrowRight />
                        </button>
                        
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-[#0D30C3] text-white rounded disabled:opacity-50 hover:bg-blue-600"
                        >
                            <RxDoubleArrowRight />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}