import { create } from 'zustand';
import type { CountriesState    , Country } from '../types/countrieState';
import { getAllCountries, getCountriesByRegion} from '../../api/country/fetchCountry';

export const useCountrieStore = create<CountriesState>((set, get) => ({
    // Estado
    countries: [],
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 12,
    totalPages: 1,
    selectedRegion: "all",
    selectedLanguage: "all",
    allCountries: [], // ← Nuevo: guardar todos los países para filtros combinados
    searchQuery: '',

    // 1. Obtener todos los países al inicio
    fetchCountries: async () => {
        set({ loading: true, error: null });
        try {
            const allCountries = await getAllCountries();
            const totalPages = Math.ceil(allCountries.length / get().itemsPerPage);
            
            set({ 
                countries: allCountries,
                allCountries, // ← Guardar referencia
                loading: false, 
                currentPage: 1, 
                totalPages,
                selectedRegion: "all",
                selectedLanguage: "all"
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error loading countries';
            set({ error: errorMessage, loading: false });
        }
    },

    // 2. ✅ NUEVO: Aplicar filtros combinados
    applyFilters: async () => {
        const { selectedRegion, selectedLanguage, allCountries } = get();
        
        set({ loading: true, error: null });
        
        try {
            let filteredCountries: Country[] = allCountries;

            // Primero: Filtrar por región (si hay selección)
            if (selectedRegion !== "all") {
                const regionCountries = await getCountriesByRegion(selectedRegion);
                filteredCountries = regionCountries;
            }

            // Segundo: Filtrar por idioma (si hay selección) - EN FRONTEND
            if (selectedLanguage !== "all") {
                filteredCountries = filteredCountries.filter(country =>
                    country.languages && 
                    Object.values(country.languages).some(lang => 
                        lang.toLowerCase().includes(selectedLanguage.toLowerCase()) ||
                        selectedLanguage.toLowerCase().includes(lang.toLowerCase())
                    )
                );
            }

            const totalPages = Math.ceil(filteredCountries.length / get().itemsPerPage);
            set({ 
                countries: filteredCountries, 
                loading: false, 
                currentPage: 1, 
                totalPages 
            });
            
        } catch (error) {
            set({ error: 'Error applying filters', loading: false });
        }
    },


    searchCountriesByName: async (name: string) => {
        // ✅ PRIMERO: Actualizar searchQuery inmediatamente
        set({ searchQuery: name });
        
        if (!name.trim()) {
            // ✅ CORREGIDO: Limpiar COMPLETAMENTE y recargar
            set({ 
                countries: [], 
                loading: true,
                searchQuery: '' // ← ¡IMPORTANTE! Asegurar que esté vacío
            });
            
            // Usar la lógica de fetchCountries pero asegurando searchQuery vacío
            try {
                const allCountries = await getAllCountries();
                const totalPages = Math.ceil(allCountries.length / get().itemsPerPage);
                
                set({ 
                    countries: allCountries,
                    allCountries,
                    loading: false, 
                    currentPage: 1, 
                    totalPages,
                    selectedRegion: "all",
                    selectedLanguage: "all",
                    searchQuery: '' // ← ¡CONFIRMAR que esté vacío!
                });
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Error loading countries';
                set({ error: errorMessage, loading: false, searchQuery: '' });
            }
            return;
        }
        
        // ✅ Búsqueda normal cuando hay texto
        set({ loading: true, error: null });
        
        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
            
            if (!response.ok) {
                if (response.status === 404) {
                    set({ 
                        countries: [], 
                        loading: false 
                        // searchQuery se mantiene con el nombre para mostrar "0 resultados"
                    });
                    return;
                }
                throw new Error('Error en la búsqueda');
            }
            
            const data = await response.json();
            set({ 
                countries: data,
                loading: false,
                currentPage: 1 
            });
        } catch (error) {
            set({ 
                error: 'Error al buscar países',
                loading: false 
            });
        }
    },

  
    // 3. Setters para los filtros (sin peticiones automáticas)
    setRegion: (region: string) => {
        set({ selectedRegion: region });
    },

    setLanguage: (language: string) => {
        set({ selectedLanguage: language });
    },

    // 4. Paginación (se mantiene igual)
    getPaginatedCountries: () => {
        const { countries, currentPage, itemsPerPage } = get();
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return countries.slice(startIndex, endIndex);
    },

    setCurrentPage: (page: number) => {
        set({ currentPage: page });
    },

    setItemsPerPage: (items: number) => {
        const { countries } = get();
        const totalPages = Math.ceil(countries.length / items);
        set({ itemsPerPage: items, totalPages, currentPage: 1 });
    },

}));