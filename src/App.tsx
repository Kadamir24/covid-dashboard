import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setContries } from './AppSlice';
import CountryList from './components/CountryList/CountryList';

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
        <CountryList />
    );
};

export default App;
