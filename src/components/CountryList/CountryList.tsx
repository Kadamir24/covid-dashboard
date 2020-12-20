import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TotalNumber from '../Utils';
import styles from './CountryList.module.scss';
import { RootState } from '../../store/rootReducer';
import { ICountry } from '../../interfaces/appInterfaces';

const Header = (props: {
    data: ICountry[],
    search: {onChange: (event: React.ChangeEvent<HTMLInputElement>) => void}
}) => {
    const { data, search } = props;
    const title = 'Global cases';
    const number = data.reduce((sum, element) => sum + element.cases, 0);
    return (
        <div className={styles.header}>
            <TotalNumber styles={styles} title={title} number={number} />
            <input className={styles.search} type="text" onChange={search.onChange} />
        </div>
    );
};

const ListItem = (props: {flagSrc: string, countryName: string, totalNumber: number }) => {
    const { flagSrc, countryName, totalNumber } = props;
    return (
        <div className={styles['list-item']}>
            <img className={styles.flag} alt={`${countryName} flag`} srcSet={flagSrc} />
            <h2 className={styles.country}>{countryName}</h2>
            <h2 className={styles['total-number']}>{totalNumber.toLocaleString()}</h2>
        </div>
    );
};

const List = (props: { data: ICountry[] }) => {
    const { data } = props;
    return (
        <div className={styles.list}>
            {data.sort((a, b) => (b.cases - a.cases)).map((item) => (
                <ListItem
                    flagSrc={item.countryInfo.flag}
                    countryName={item.country}
                    totalNumber={item.cases}
                />
            ))}
        </div>
    );
};

const CountryList = () => {
    const [search, setSearch] = useState<string>('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
    };
    const { countries } = useSelector((state: RootState) => state.countries);
    const data = countries.slice().filter(({ country }) => country.includes(search));
    return (
        <div className={styles.container}>
            <Header data={data} search={{ onChange: handleChange }} />
            <List data={data} />
        </div>
    );
};

export default CountryList;
