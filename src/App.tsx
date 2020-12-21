import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setContries } from './AppSlice';
import CountryList from './components/countryList/countryList';
import Footer from './components/footer/footer';
import Header from './components/header/header';

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
            </main>
            <Footer />
        </>
    );
};

export default App;
