import { create } from 'zustand';
import type { CountriesState } from '../types/countrieState';
import { getAllCountries } from "../../api/country/fetchCountry";

export const useCountrieStore = create<CountriesState>((set, get) => ({
    countries: [],
    loading: false,
    error: null,

    currentPage: 1,
    itemsPerPage: 12,
    totalPages: 1,



    fetchCountries: async () => {
        set({ loading: true, error: null });
        try {
            const countries = await getAllCountries(); 
            const totalPages = Math.ceil(countries.length / get().itemsPerPage)
            
            set({ 
                countries, 
                loading: false, 
                error: null, 
                currentPage: 1, 
                totalPages 
            });

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error loading countries';
            set({ error: errorMessage, loading: false });
        }
    },
    
  // 2. Obtener países paginados
  getPaginatedCountries: () => {
    const { countries, currentPage, itemsPerPage } = get();
    
    // Calcular índices de paginación
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Devolver solo los países de la página actual
    return countries.slice(startIndex, endIndex);
  },

  // 3. Cambiar página actual
  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },

  // 4. Cambiar items por página
  setItemsPerPage: (items: number) => {
    const { countries } = get();
    const totalPages = Math.ceil(countries.length / items);
    
    set({ 
      itemsPerPage: items, 
      totalPages,
      currentPage: 1 // Resetear a página 1 al cambiar items por página
    });
  }

}));