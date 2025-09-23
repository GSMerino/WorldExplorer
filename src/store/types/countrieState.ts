// Types para Native Name
export interface NativeName {
   official: string;
   common: string;
}

export interface CountryName {
   common: string;
   official: string;
   nativeName?: {
      [key: string]: NativeName;
   };
}

// Types para Currency
export interface Currency {
   name: string;
   symbol: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

// Type principal para Country
export interface Country {
   flags: Flags;
   name: CountryName;
   currencies?: {
      [code: string]: Currency;
   };
   capital?: string[];
   cca2?: string;
   cca3: string;
   region?: string;
   subregion?: string;
   population?: number;
   languages?: {
      [code: string]: string;
   };
   timezones?: string[];
}

// Type para la respuesta de la API
export interface CountriesResponse extends Array<Country> {}

// Type para opciones de moneda en selectores
export interface CurrencyOption {
   code: string;
   name: string;
   symbol: string;
   countryName: string;
   countryCode: string;
}

// Type para el estado del store de países
export interface CountriesState {
   // Estado
   countries: Country[];
   allCountries: Country[]; // ← Nuevo
   loading: boolean;
   error: string | null;
   currentPage: number;
   itemsPerPage: number;
   totalPages: number;
   selectedRegion: string;
   selectedLanguage: string;
    
   // Acciones
   fetchCountries: () => Promise<void>;
   applyFilters: () => Promise<void>; // ← Cambiado
   setRegion: (region: string) => void; // ← Nuevo
   setLanguage: (language: string) => void; // ← Nuevo
   getPaginatedCountries: () => Country[];
   setCurrentPage: (page: number) => void;
   setItemsPerPage: (items: number) => void;
}