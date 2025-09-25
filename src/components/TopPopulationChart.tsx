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

export const TopPopulationChart = () => {
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

    const top10 = [...allCountries]
    .filter((c) => c.population)
    .sort((a, b) => b.population - a.population)
    .slice(0, 10);

    const chartData = {
        labels: top10.map((c) => c.name.common),
        datasets: [
            {
                label: 'Población',
                data: top10.map((c) => c.population),
                backgroundColor: '#C62828',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
            callbacks: {
                label: function (ctx: any) {
                return `${ctx.raw.toLocaleString()} habitantes`;
                },
            },
            },
        },
        scales: {
            x: {
            title: {
                display: true,
                text: 'País',
            },
            },
            y: {
            title: {
                display: true,
                text: 'Población',
            },
            beginAtZero: true,
            ticks: {
                callback: function (tickValue: string | number) {
                return typeof tickValue === 'number' ? tickValue.toLocaleString() : tickValue;
                },
            },
            },
        },
    };


    return (
        <section className='mt-[50px]'>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="p-4 w-full md:max-w-[60%] lg:max-w-[60%] mx-auto mb-8 bg-[#ffffff] rounded-xl"
            >
                <h2 className="text-xl font-bold mb-4 text-center">Top 10 países más poblados</h2>
                <Bar data={chartData} options={options} />
            </motion.div>
        </section>

    );
};