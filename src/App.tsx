import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setContries } from './AppSlice';
// import CountryList from './components/countryList/countryList';
import Map from './components/Map/Map';

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
            {/* <CountryList /> */}
            <Map />
        </>
    );
};

export default App;
