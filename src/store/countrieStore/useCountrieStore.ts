import { create } from 'zustand';
import type { CountriesState} from '../types/countrieState';
import { getAllCountries } from '../../api/country/fetchCountry';

export const useCountrieStore = create<CountriesState>((set, get) => ({
    // Estado
    countries: [],
    allCountries: [],
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 12,
    totalPages: 1,
    selectedRegion: 'all',
    selectedLanguage: 'all',
    searchQuery: '',
    sortBy: 'none',

    // Obtener todos los países al inicio
    fetchCountries: async () => {
        set({ loading: true, error: null });
        try {
        const allCountries = await getAllCountries();
        const totalPages = Math.ceil(allCountries.length / get().itemsPerPage);
        set({
            countries: allCountries,
            allCountries,
            loading: false,
            currentPage: 1,
            totalPages,
            selectedRegion: 'all',
            selectedLanguage: 'all',
            searchQuery: '',
            sortBy: 'none',
        });
        } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Error loading countries';
        set({ error: errorMessage, loading: false });
        }
    },

    // Aplicar todos los filtros combinados
    applyAllFilters: () => {
        const {
        allCountries,
        selectedRegion,
        selectedLanguage,
        searchQuery,
        sortBy,
        itemsPerPage,
        } = get();

        let filtered = [...allCountries];

        // 🔍 Filtro por nombre
        if (searchQuery.trim()) {
            filtered = filtered.filter((country) =>
                country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // 🌍 Filtro por región
        if (selectedRegion !== 'all') {
            filtered = filtered.filter((country) => country.region === selectedRegion);
        }

        // 🗣️ Filtro por idioma
        if (selectedLanguage !== 'all') {
            debugger
            filtered = filtered.filter(
                (country) =>
                country.languages &&
                Object.values(country.languages).some(
                    (lang) =>
                    lang.toLowerCase() === selectedLanguage.toLowerCase() ||
                    lang.toLowerCase().includes(selectedLanguage.toLowerCase())
                )
            );
        }

        // 📊 Ordenamiento
        switch (sortBy) {
        case 'populationAsc':
            filtered.sort((a, b) => a.population - b.population);
            break;
        case 'populationDesc':
            filtered.sort((a, b) => b.population - a.population);
            break;
        case 'nameAsc':
            filtered.sort((a, b) => a.name.common.localeCompare(b.name.common));
            break;
        case 'nameDesc':
            filtered.sort((a, b) => b.name.common.localeCompare(a.name.common));
            break;
        }

        const totalPages = Math.ceil(filtered.length / itemsPerPage);

        set({
        countries: filtered,
        currentPage: 1,
        totalPages,
        loading: false,
        });
    },

    // Limpiar todos los filtros
    resetFilters: () => {
        set({
        selectedRegion: 'all',
        selectedLanguage: 'all',
        searchQuery: '',
        sortBy: 'none',
        });
        get().applyAllFilters();
    },

    // Setters que activan filtros
    setRegion: (region: string) => {
        set({ selectedRegion: region });
        get().applyAllFilters();
    },

    setLanguage: (language: string) => {
        
        set({ selectedLanguage: language });
        get().applyAllFilters();
    },

    setSortBy: (sortOption: CountriesState['sortBy']) => {
        set({ sortBy: sortOption });
        get().applyAllFilters();
    },

    searchCountriesByName: (name: string) => {
        set({ searchQuery: name });
        get().applyAllFilters();
    },

    // Paginación
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