import { render, screen } from '@testing-library/react';
import { TopPopulationChart } from '../components/TopPopulationChart';

// Mock completo en el jest.mock()
jest.mock('../store/countrieStore/useCountrieStore', () => ({
  useCountrieStore: jest.fn(() => ({
    allCountries: [
      { 
        name: { common: 'China' }, 
        population: 1400000000 
      },
      { 
        name: { common: 'India' }, 
        population: 1380000000 
      },
    ]
  }))
}));

describe('TopPopulationChart', () => {
  it('renderiza el título correctamente', () => {
    render(<TopPopulationChart />);
    expect(screen.getByText(/Top 10 países más poblados/i)).toBeInTheDocument();
  });
});