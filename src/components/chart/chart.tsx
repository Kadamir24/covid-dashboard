import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Line, Bar } from 'react-chartjs-2';
import { RootState } from '../../store/rootReducer';
import { fetchData, fetchDataByCountry } from './fetchChart';
import styles from './chart.module.scss';

const Chart = () => {
    const { appState } = useSelector((state: RootState) => state);
    const is100k = appState.is100KPopSelected;
    const { isLastDaySelected } = appState;
    const urlForAll = isLastDaySelected ? 'all?yesterday=true' : 'historical/all?lastdays=340';
    const [items, setItems] = useState({});
    const { selectedCountry } = appState;

    useEffect(() => {
        const fetchMyAPI = async () => {
            const initData = selectedCountry == null ? await fetchData(isLastDaySelected, urlForAll)
                : await fetchDataByCountry(appState, isLastDaySelected, selectedCountry);
            setItems(initData);
        };
        fetchMyAPI();
    }, [selectedCountry, isLastDaySelected]);

    const gettingData = items[0];
    const line = (
        gettingData ? (
            <div>
                <Line
                    data={{
                        labels: Object.keys(gettingData.cases).map((item) => item),
                        datasets: [{
                            label: 'cases',
                            data: Object.values(gettingData.cases).map((item) => {
                                if (is100k) {
                                    const temp = Number(item) / 100000;
                                    return String(temp);
                                }
                                return item;
                            }),
                            borderColor: '#3333ff',
                            fill: true,
                        }, {
                            label: 'deaths',
                            data: Object.values(gettingData.deaths).map((item) => {
                                if (is100k) {
                                    const temp = Number(item) / 100000;
                                    return String(temp);
                                }
                                return item;
                            }),
                            borderColor: 'red',
                            fill: true,
                        }, {
                            label: 'recovered',
                            data: Object.values(gettingData.recovered).map((item) => {
                                if (is100k) {
                                    const temp = Number(item) / 100000;
                                    return String(temp);
                                }
                                return item;
                            }),
                            borderColor: 'green',
                            fill: true,
                        }],
                    }}
                    height={300}
                    width={600}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                },
                            }],
                        },
                    }}
                />
            </div>
        ) : null
    );
    let caseToday;
    let recoveredToday;
    let deathsToday;
    if (gettingData) {
        caseToday = gettingData.cases;
        recoveredToday = gettingData.recovered;
        deathsToday = gettingData.deaths;
        if (is100k) {
            caseToday /= 100000;
            recoveredToday /= 100000;
            deathsToday /= 100000;
        }
    }
    const bar = (
        gettingData ? (
            <div>
                <Bar
                    data={{
                        labels: ['Cases', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'Last day',
                            data: [caseToday, recoveredToday, deathsToday],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        }],
                    }}
                />
            </div>
        ) : null
    );

    return (
        <div className={styles.container}>
            { isLastDaySelected ? bar : line}
        </div>
    );
};

export default Chart;
