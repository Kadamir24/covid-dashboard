import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIs100KPopSelected, setIsLastDaySelected } from '../../AppSlice';
import { ICountry } from '../../interfaces/appInterfaces';
import { RootState } from '../../store/rootReducer';
import { getCountries } from '../utils';
import styles from './statistics.module.scss';

const Toggle = (props: {
    toTitle: (toggle: boolean) => string,
    handleClick: (toogle: boolean) => void,
}) => {
    const { toTitle, handleClick } = props;
    const [toggle, setToggle] = useState<boolean>(false);
    const toClass = () => (toggle ? 'toggleOn' : 'toggleOff');
    const toggleAction = () => {
        setToggle(!toggle);
        handleClick(!toggle);
    };

    return (
        <div className={styles.subContainer}>
            <button
                type="button"
                className={styles[toClass()]}
                onClick={toggleAction}
                aria-label="text"
            />
            <h2 className={styles.subTitle}>{toTitle(toggle)}</h2>
        </div>
    );
};

const Header = (props: { title: string | null }) => {
    const { title } = props;
    const toTitle = () => (title === null ? 'Global' : title);
    const dispatch = useDispatch();
    return (
        <div className={styles.header}>
            <h1 className={styles.title}>
                {toTitle()}
                {' '}
                statistics
            </h1>
            <Toggle
                toTitle={(toggle: boolean): string => (toggle ? 'for last day' : 'for all time')}
                handleClick={(toggle: boolean) => dispatch(setIsLastDaySelected(toggle))}
            />
            <Toggle
                toTitle={(toggle: boolean): string => (toggle ? 'in 100k population' : 'in absolute')}
                handleClick={(toggle: boolean) => dispatch(setIs100KPopSelected(toggle))}
            />
        </div>
    );
};

const TotalItem = (props: { title: string, number: number }) => {
    const { title, number } = props;
    return (
        <div className={`${styles.totalItem} ${styles[title]}`}>
            <h2 className={styles.totalTitle}>{`Total ${title}`}</h2>
            <h2 className={styles.totalNumber}>{number.toLocaleString()}</h2>
        </div>
    );
};

const TotalList = (props: { countries: ICountry[] }) => {
    const { countries } = props;
    const statistics = [
        {
            title: 'cases',
            number: countries.reduce((total, element) => total + element.cases, 0),
        },
        {
            title: 'deaths',
            number: countries.reduce((total, element) => total + element.deaths, 0),
        },
        {
            title: 'recovored',
            number: countries.reduce((total, element) => total + element.recovered, 0),
        },
    ];
    return (
        <div className={styles.totalList}>
            {
                statistics.map((element) => (
                    <TotalItem title={element.title} number={element.number} />
                ))
            }
        </div>
    );
};

const Statistics = () => {
    const { selectedCountry } = useSelector((state: RootState) => state.appState);
    let countries = getCountries();
    if (selectedCountry !== null) {
        countries = countries.filter((element) => element.country === selectedCountry);
    }
    return (
        <div className={styles.container}>
            <Header title={selectedCountry} />
            <TotalList countries={countries} />
        </div>
    );
};

export default Statistics;
