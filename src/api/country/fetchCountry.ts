import { countriesApi } from '../Api';
import type { Country, CountriesResponse } from '../../store/types/countrieState';

// Campos que necesitamos
const FIELDS = 'name,cca2,cca3,currencies,capital,flags,region,population,languages,subregion';



export async function getAllCountries(): Promise<Country[]> {
    const response = await countriesApi.get<CountriesResponse>( 
        `/all?fields=${FIELDS}`
    );
    return response.data;
}

// export async function  currencyApi ()  {
//     const response = await
// }

export async function getCountriesByRegion(region: string): Promise<Country[]> {
    const response = await countriesApi.get<CountriesResponse>(
        `/region/${region}?fields=${FIELDS}`
    );
    return response.data;
}

export async function getCountriesByLanguaje(lang: string): Promise<Country[]> {
    const response = await countriesApi.get<CountriesResponse>(
        `/lang/${lang}?fields=${FIELDS}`
    );

    return response.data
}