import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const fetchData = async () => {
    const { data } = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=340');
    console.log('DATA CHE TAM', data);
    const newData = [data].map((dataClass) => ({
        cases: dataClass.cases,
        deaths: dataClass.deaths,
        recovered: dataClass.recovered,
    }));
    console.log('NEWDATA', newData);
    return newData;
};

const fetchDataByCountry = async () => {
    const { data } = await axios.get('https://disease.sh/v3/covid-19/historical/Russia?lastdays=340');
    console.log('DATA CHE TAM', data);
    const newData = [data].map((dataClass) => ({
        cases: dataClass.timeline.cases,
        deaths: dataClass.timeline.deaths,
        recovered: dataClass.timeline.recovered,
    }));
    console.log('NEWDATA', newData);
    return newData;
};

const Chart = () => {
    const flag = true;
    const [items, setItems] = useState({});

    // useEffect(() => {
    //     fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=340')
    //         .then((response) => response.json())
    //         .then((json) => setItems(json));
    // }, []);
    useEffect(() => {
        const fetchMyAPI = async () => {
            const initData = flag ? await fetchData() : await fetchDataByCountry();
            setItems(initData);
        };
        fetchMyAPI();
    }, []);
    // console.log('chetam', items[0]);
    // // console.log('checkcheck23123', Object.keys(items[0]));
    // // const data = items.map(({ cases }) => cases);
    // // console.log('DATA', data);
    // // console.log('checkcheck', Object.keys(items[0]));
    // // let gettingData;
    // if (items[0]) {
    //     console.log('ifif', Object.keys(items[0].cases));
    // }
    const gettingData = items[0];
    // console.log('gettingData', gettingData);

    return (
        gettingData ? (
            <div>
                <Line
                    data={{
                        labels: Object.keys(gettingData.cases).map((item) => item),
                        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                        datasets: [{
                            label: 'cases',
                            data: Object.values(gettingData.cases).map((item) => item),
                            borderColor: '#3333ff',
                            fill: true,
                        }, {
                            label: 'deaths',
                            data: Object.values(gettingData.deaths).map((item) => item),
                            borderColor: 'red',
                            fill: true,
                        }, {
                            label: 'recovered',
                            data: Object.values(gettingData.recovered).map((item) => item),
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
};

export default Chart;
