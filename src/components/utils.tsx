import React from 'react';
import { useSelector } from 'react-redux';
import { ICountry } from '../interfaces/appInterfaces';
import { RootState } from '../store/rootReducer';

const TotalNumber = (props: {
    styles: { readonly [key: string]: string },
    title: string,
    number: number,
}) => {
    const {
        styles, title, number,
    } = props;
    return (
        <div className={styles.totalNumber}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.number}>{number.toLocaleString()}</h3>
        </div>
    );
};

const getCountries = (): ICountry[] => {
    const { appState } = useSelector((state: RootState) => state);
    let { countries } = appState;
    if (appState.isLastDaySelected) {
        countries = countries.map((country) => ({
            ...country,
            ...{
                cases: country.todayCases,
                deaths: country.todayDeaths,
                recovered: country.todayRecovered,
            },
        }));
    }

    if (appState.is100KPopSelected) {
        countries = countries.map((country) => ({
            ...country,
            cases: country.cases / 100000,
            deaths: country.deaths / 100000,
            recovered: country.recovered / 100000,
        }));
    }
    return countries;
};

export {
    getCountries,
};

export default TotalNumber;
