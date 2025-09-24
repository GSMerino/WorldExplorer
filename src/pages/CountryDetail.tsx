import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button, Alert, Box, Typography, Paper, Chip, Stack
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCountrieStore } from '../store/countrieStore/useCountrieStore';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';

interface Country {
    name: {
        common: string;
        official: string;
        nativeName?: {
        [key: string]: { official: string; common: string };
        };
    };
    cca3: string;
    flags: { png: string; svg: string; alt?: string };
    capital?: string[];
    region: string;
    subregion?: string;
    population: number;
    currencies?: {
        [key: string]: { name: string; symbol: string };
    };
    languages?: { [key: string]: string };
    borders?: string[];
    tld?: string[];
    timezones?: string[];
    continents?: string[];
    startOfWeek?: string;
    car?: { signs?: string[]; side: string };
    maps?: { googleMaps: string; openStreetMaps: string };
}

export const CountryDetail = () => {
    const { countryCode } = useParams<{ countryCode: string }>();
    const navigate = useNavigate();
    const [country, setCountry] = useState<Country | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { selectedCurrency, exchangeRates, fetchExchangeRates } = useCountrieStore();

    useEffect(() => {
        const fetchCountryDetail = async () => {
        if (!countryCode) {
            setError('Código de país no válido');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
            if (!response.ok) throw new Error('País no encontrado');
            const data = await response.json();
            setCountry(data[0]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar el país');
        } finally {
            setLoading(false);
        }
        };

        fetchCountryDetail();
    }, [countryCode]);

    useEffect(() => {
        if (country && country.currencies) {
        fetchExchangeRates(selectedCurrency);
        }
    }, [country, selectedCurrency]);

    if (loading) {
        return (
            <section className='flex flex-col items-center min-h-[95vh] justify-center'>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className='flex flex-col gap-5 justify-center items-center'
                >
                    <ClipLoader color="#002A52" size={50} />
                    <p className="text-[#002A52] font-medium text-lg animate-pulse">Preparando gráficas de países...</p>
                </motion.div>
            </section>
        );
    }

    if (error) {
        return (
        <Box p={3}>
            <Alert severity="error" action={
            <Button color="inherit" onClick={() => navigate('/')}>
                Volver
            </Button>
            }>
            {error}
            </Alert>
        </Box>
        );
    }

    if (!country) {
        return (
        <Box p={3}>
            <Alert severity="warning">No se encontró información para este país.</Alert>
        </Box>
        );
    }

    return (
        <Box p={3} maxWidth="1200px" margin="0 auto">
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} variant="outlined" sx={{ mb: 3 }}>
                Volver
            </Button>

            <Paper elevation={3} sx={{ p: 4 }}>
                <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={4}>
                <Box>
                    <img
                        src={country.flags.png}
                        alt={country.flags.alt || `Bandera de ${country.name.common}`}
                        style={{
                            width: '100%',
                            maxWidth: '400px',
                            height: 'auto',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                    />
                </Box>

                <Box>
                    <Typography variant="h3" gutterBottom fontWeight="bold">
                    {country.name.common}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                    {country.name.official}
                    </Typography>

                    <Stack spacing={2} mt={3}>
                    <Box>
                        <Typography variant="body1"><strong>🌍 Continente:</strong> {country.continents?.[0] || 'N/A'}</Typography>
                        <Typography variant="body1"><strong>📍 Región:</strong> {country.region} {country.subregion && `- ${country.subregion}`}</Typography>
                    </Box>

                    <Box>
                        <Typography variant="body1"><strong>👥 Población:</strong> {country.population.toLocaleString()}</Typography>
                        <Typography variant="body1"><strong>🏛️ Capital:</strong> {country.capital?.[0] || 'N/A'}</Typography>
                    </Box>

                    {country.currencies && (
                        <Box>
                        <Typography variant="body1" gutterBottom><strong>💰 Monedas:</strong></Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {Object.entries(country.currencies).map(([code, currency]) => (
                            <Chip key={code} label={`${currency.name} (${currency.symbol || code})`} variant="outlined" size="small" />
                            ))}
                        </Stack>
                        </Box>
                    )}

                    {country.currencies && exchangeRates && typeof exchangeRates === 'object' && (
                        <Box mt={2}>
                        <Typography variant="body1" gutterBottom><strong>💱 Conversión de moneda:</strong></Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {Object.entries(country.currencies).map(([code]) => {
                            const localRate = exchangeRates[code];
                            const targetRate = exchangeRates[selectedCurrency];

                            const rate =
                                localRate && targetRate
                                ? selectedCurrency === 'USD'
                                    ? 1 / localRate
                                    : targetRate / localRate
                                : undefined;

                            return (
                                <Chip
                                key={code}
                                label={
                                    rate
                                    ? `1 ${code} = ${rate.toFixed(2)} ${selectedCurrency}`
                                    : `No disponible para ${code}`
                                }
                                variant="filled"
                                color={rate ? 'primary' : 'default'}
                                size="small"
                                />
                            );
                            })}
                        </Stack>
                        </Box>
                    )}

                    {country.languages && (
                        <Box>
                        <Typography variant="body1" gutterBottom><strong>🗣️ Idiomas:</strong></Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {Object.values(country.languages).map((language, index) => (
                            <Chip key={index} label={language} variant="outlined" size="small" />
                            ))}
                        </Stack>
                        </Box>
                    )}

                    {country.tld && (
                        <Box>
                        <Typography variant="body1"><strong>🌐 Dominio:</strong> {country.tld.join(', ')}</Typography>
                        </Box>
                    )}

                    {country.timezones && (
                        <Box>
                        <Typography variant="body1"><strong>⏰ Zona horaria:</strong> {country.timezones[0]}</Typography>
                        </Box>
                    )}

                    {country.car && (
                        <Box>
                        <Typography variant="body1"><strong>🚗 Conduce por la:</strong> {country.car.side} {country.car.signs && `(${country.car.signs.join(', ')})`}</Typography>
                        </Box>
                    )}
                    </Stack>

                    {country.maps && (
                    <Box mt={3}>
                        <Typography variant="h6" gutterBottom>
                        📍 Mapas
                        </Typography>
                        <Stack direction="row" spacing={2}>
                        <Button 
                            variant="outlined" 
                            size="small"
                            onClick={() => window.open(country.maps!.googleMaps, '_blank')}
                        >
                            Google Maps
                        </Button>
                        <Button 
                            variant="outlined" 
                            size="small"
                            onClick={() => window.open(country.maps!.openStreetMaps, '_blank')}
                        >
                            OpenStreetMap
                        </Button>
                        </Stack>
                    </Box>
                    )}

                </Box>
                </Box>

                {country.borders && country.borders.length > 0 && (
                <Box mt={4}>
                    <Typography variant="h6" gutterBottom>🚩 Países Fronterizos</Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                    {country.borders.map((borderCode) => (
                        <Chip
                        key={borderCode}
                        label={borderCode}
                        variant="outlined"
                        onClick={() => navigate(`/country/${borderCode}`)}
                        clickable
                        sx={{ cursor: 'pointer' }}
                        />
                    ))}
                    </Stack>
                </Box>
                )}
            </Paper>
        </Box>
    );
};