import { Bar } from 'react-chartjs-2';
import { useCountrieStore } from '../store/countrieStore/useCountrieStore';
import { motion } from 'framer-motion';
import { ClipLoader } from 'react-spinners';

import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const RegionDistributionChart = () => {
    const { allCountries } = useCountrieStore();
    const isLoading = !allCountries || allCountries.length === 0;

    if (isLoading) {
        return (
            <section className="mt-[50px] flex justify-center items-center h-[300px] ">
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


    // Agrupar países por región
    const regionCounts = allCountries.reduce((acc: Record<string, number>, country) => {
        const region = country.region || 'Unknown';
        acc[region] = (acc[region] || 0) + 1;
        return acc;
    }, {});

    const regionLabels = Object.keys(regionCounts);

    // Colores personalizados por región
    const regionColors: Record<string, string> = {
        Africa: '#2E7D32',
        Americas: '#C62828',
        Asia: '#FBC02D',
        Europe: '#1565C0',
        Oceania: '#00ACC1',
        Antarctic: '#BDBDBD',
        Unknown: '#9E9E9E',
    };

  const chartData = {
    labels: regionLabels,
    datasets: [
      {
        label: 'Cantidad de países',
        data: regionLabels.map((region) => regionCounts[region]),
        backgroundColor: regionLabels.map((region) => regionColors[region] || '#9E9E9E'),
      },
    ],
  };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                label: (ctx: any) => `${ctx.raw} países`,
                },
            },
        },
        scales: {
            x: {
                title: {
                display: true,
                text: 'Región',
                },
            },
        y: {
            title: {
                display: true,
                text: 'Cantidad de países',
            },
            beginAtZero: true,
            ticks: {
                stepSize: 5,
            },
        },
        },
    };

    return (
        <section className='mt-[50px]'>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}

                className="p-4 max-w-[60%] mx-auto mb-8 bg-[#ffffff] rounded-xl"
            >
                <h2 className="text-xl font-bold mb-4 text-center">
                    Distribución de países por región
                </h2>
                <Bar data={chartData} options={options} />
            </motion.div>
        </section>
    );
};