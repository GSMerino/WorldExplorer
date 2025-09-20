import axios from 'axios';



// API 1 - REST Countries API (NO necesita API key)
export const countriesApi = axios.create({
  baseURL: 'https://restcountries.com/v3.1', // ← Esta URL está bien
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

