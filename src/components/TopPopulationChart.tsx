import { Bar } from 'react-chartjs-2';
import { useCountrieStore } from '../store/countrieStore/useCountrieStore';
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

  if (!allCountries || allCountries.length === 0) {
    return <p className="text-center">Cargando datos de países...</p>;
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
        <div className="max-w-[60%] mx-auto mb-8 bg-[#ffffff] rounded-xl p-4">
            <h2 className="text-xl font-bold mb-4 text-center">Top 10 países más poblados</h2>
            <Bar data={chartData} options={options} />
        </div>
    </section>

  );
};