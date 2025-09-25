import { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { RegionDistributionChart } from '../components/RegionDistributionChart';
import { TopPopulationChart } from '../components/TopPopulationChart';
import { useCountrieStore } from '../store/countrieStore/useCountrieStore';



interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`chart-tabpanel-${index}`}
      aria-labelledby={`chart-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `chart-tab-${index}`,
    'aria-controls': `chart-tabpanel-${index}`,
  };
}




export const ChartsPage = () => {
    const [value, setValue] = useState(0);
    
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const { allCountries, fetchCountries } = useCountrieStore();

    useEffect(() => {
        if (!allCountries || allCountries.length === 0) {
        fetchCountries();
        }
    }, []);


    return (
        <Box  sx={{ width: '100%', minHeight: '95vh' }} >
            <Box sx={{p: 2}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="Gráficas de países" centered>
                        <Tab label="Distribución por región" {...a11yProps(0)} />
                        <Tab label="Top países más poblados" {...a11yProps(1)} />
                    </Tabs>
                </Box>
            </Box>


            <CustomTabPanel value={value} index={0}>
                <RegionDistributionChart />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <TopPopulationChart />
            </CustomTabPanel>
        </Box>
    );
};


