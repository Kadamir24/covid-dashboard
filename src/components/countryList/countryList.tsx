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

const ActiveListItem = (props: {
    flagSrc: string,
    countryName: string | null,
}) => {
    const { flagSrc, countryName } = props;
    const dispatch = useDispatch();
    const toClass = () => (countryName !== null ? 'activeListItem' : 'activeListItemHide');
    const handleClick = () => {
        dispatch(setSelectedCountry(null));
    };
    return (
        <div className={styles[toClass()]}>
            <img className={styles.flag} alt={`${countryName} flag`} srcSet={flagSrc} />
            <h2 className={styles.country}>{countryName}</h2>
            <button
                type="button"
                className={styles.closeButton}
                aria-label="Close"
                onClick={handleClick}
            />
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

const List = (props: { data: ICountry[], selectedCountry: string | null }) => {
    const { data, selectedCountry } = props;
    const dispatch = useDispatch();
    return (
        <div className={selectedCountry === null ? styles.list : styles.listActive}>
            {data.sort((a, b) => (b.cases - a.cases)).map((item, index) => (
                <ListItem
                    key={index.toString()}
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
    const { countries, selectedCountry } = useSelector((state: RootState) => state.appState);
    const activeCountry = countries.slice().find((element) => (
        element.country === selectedCountry
    ));
    const data = countries.slice().filter(({ country }) => (
        country.toLowerCase().includes(search.toLowerCase())
    ));
    return (
        <div className={styles.container}>
            <Header data={countries.slice()} search={{ onChange: handleChange }} />
            <ActiveListItem
                flagSrc={activeCountry === undefined ? '' : activeCountry.countryInfo.flag}
                countryName={activeCountry === undefined ? null : activeCountry.country}
            />
            <List data={data} selectedCountry={selectedCountry} />
        </div>
    );
};

export default CountryList;
