import { create } from 'zustand';
import type { CountriesState } from '../types/countrieState';
import { getAllCountries } from "../../api/country/fetchCountry";

export const useCountrieStore = create<CountriesState>((set, get) => ({
    countries: [],
    loading: false,
    error: null,

    fetchCountries: async () => {
        set({ loading: true, error: null });
        try {
            const countries = await getAllCountries(); 
            set({ countries, loading: false, error: null });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error loading countries';
            set({ error: errorMessage, loading: false });
        }
    }

}));