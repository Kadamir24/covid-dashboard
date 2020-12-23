import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TotalNumber from '../utils';
import styles from './countryList.module.scss';
import { ICountry } from '../../interfaces/appInterfaces';
import { setSelectedCountry } from '../../AppSlice';
import { RootState } from '../../store/rootReducer';

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

const ListItem = (props: {
    flagSrc: string,
    countryName: string,
    totalNumber: number,
    handleClick: () => void,
}) => {
    const {
        flagSrc, countryName, totalNumber, handleClick,
    } = props;
    return (
        <div
            className={styles.listItem}
            onClick={handleClick}
            onKeyDown={handleClick}
            role="button"
            tabIndex={0}
        >
            <img className={styles.flag} alt={`${countryName} flag`} srcSet={flagSrc} />
            <h2 className={styles.country}>{countryName}</h2>
            <h2 className={styles.totalNumber}>{totalNumber.toLocaleString()}</h2>
        </div>
    );
};

const List = (props: { data: ICountry[] }) => {
    const { data } = props;
    const dispatch = useDispatch();
    return (
        <div className={styles.list}>
            {data.sort((a, b) => (b.cases - a.cases)).map((item) => (
                <ListItem
                    flagSrc={item.countryInfo.flag}
                    countryName={item.country}
                    totalNumber={item.cases}
                    handleClick={() => {
                        dispatch(setSelectedCountry(item.country));
                    }}
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
    const { countries } = useSelector((state: RootState) => state.appState);
    const data = countries.slice().filter(({ country }) => (
        country.toLowerCase().includes(search.toLowerCase())
    ));
    return (
        <div className={styles.container}>
            <Header data={countries.slice()} search={{ onChange: handleChange }} />
            <List data={data} />
        </div>
    );
};

export default CountryList;
