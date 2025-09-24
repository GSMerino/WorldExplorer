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

export const RegionDistributionChart = () => {
  const { allCountries } = useCountrieStore();

  if (!allCountries || allCountries.length === 0) {
    return <p className="text-center">Cargando datos de países...</p>;
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
        <div className="p-4 max-w-[60%] mx-auto mb-8 bg-[#ffffff] rounded-xl">
            <h2 className="text-xl font-bold mb-4 text-center">Distribución de países por región</h2>
            <Bar data={chartData} options={options} />
        </div>
    </section>

  );
};