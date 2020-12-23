import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setContries } from './AppSlice';
import Map from './components/map/map';
import CountryList from './components/countryList/countryList';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Statistics from './components/statistics/statistics';
import Chart from './components/chart/chart';

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('https://corona.lmao.ninja/v2/countries')
            .then((response) => response.json())
            .then((json) => {
                dispatch(setContries(json));
            });
    }, []);

    return (
        <>
            <Header />
            <main>
                <CountryList />
                <Map />
                <div>
                    <Statistics />
                    <Chart />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default App;
