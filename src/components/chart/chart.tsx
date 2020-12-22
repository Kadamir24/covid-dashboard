import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

// async function fetchDate(url) {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
// }

// const getData = async () => {
//     const data = await fetchDate('https://disease.sh/v3/covid-19/historical/all?lastdays=340');
//     return data;
// };

const fetchData = async () => {
    const { data } = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=340');
    console.log('DATA CHE TAM', data);
    const newData = [data].map((dataClass) => ({
        cases: dataClass.cases,
        deaths: dataClass.deaths,
        recovered: dataClass.recovered,
    }));

    return newData;
};

const Chart = () => {
    const [items, setItems] = useState({});

    // useEffect(() => {
    //     fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=340')
    //         .then((response) => response.json())
    //         .then((json) => setItems(json));
    // }, []);
    useEffect(() => {
        const fetchMyAPI = async () => {
            const initData = await fetchData();
            setItems(initData);
        };
        fetchMyAPI();
    }, []);
    console.log('chetam', items[0]);
    // console.log('checkcheck23123', Object.keys(items[0]));
    // const data = items.map(({ cases }) => cases);
    // console.log('DATA', data);
    // console.log('checkcheck', Object.keys(items[0]));
    if (items[0]) {
        console.log('ifif', Object.keys(items[0].cases));
    }

    return (
        items[0] ? (
            <div>
                <Line
                    data={{
                        labels: Object.keys(items[0].cases).map((item) => item),
                        // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                        datasets: [{
                            label: 'cases',
                            data: Object.values(items[0].cases).map((item) => item),
                            borderColor: '#3333ff',
                            fill: true,
                        }, {
                            label: 'deaths',
                            data: Object.values(items[0].deaths).map((item) => item),
                            borderColor: 'red',
                            fill: true,
                        }, {
                            label: 'recovered',
                            data: Object.values(items[0].recovered).map((item) => item),
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

// const Chart = () => {
//     // const [date, setDate] = useState([]);
//     // let labels;
//     // let data = [];
//     // labels = Object.keys(items.cases).map((element) => element);
//     // let data = {};
//     // const data = fetchDate('https://disease.sh/v3/covid-19/historical/all?lastdays=340')
//     // // .then((items) => items);
//     // console.log(data);
//     // let data;
//     // const data = fetchDate('https://disease.sh/v3/covid-19/historical/all?lastdays=340');
//     //     .then((items) => { data = items; });
//     // console.log(data);
//     const data = getData();
//     console.log(data);

//     return (
//         <div>
//             <Line
//                 data={{
//                     // labels: data.map((items) => items.cases),
//                     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//                     // labels: Object.keys(data.cases),
//                     datasets: [{
//                         label: '# of Votes',
//                         data: [10, 11, 12, 13, 14, 5],
//                         backgroundColor: [
//                             'rgba(255, 99, 132, 0.2)',
//                             'rgba(54, 162, 235, 0.2)',
//                             'rgba(255, 206, 86, 0.2)',
//                             'rgba(75, 192, 192, 0.2)',
//                             'rgba(153, 102, 255, 0.2)',
//                             'rgba(255, 159, 64, 0.2)',
//                         ],
//                         borderColor: [
//                             'rgba(255, 99, 132, 1)',
//                             'rgba(54, 162, 235, 1)',
//                             'rgba(255, 206, 86, 1)',
//                             'rgba(75, 192, 192, 1)',
//                             'rgba(153, 102, 255, 1)',
//                             'rgba(255, 159, 64, 1)',
//                         ],
//                         borderWidth: 1,
//                     }],
//                 }}
//                 height={300}
//                 width={600}
//                 options={{
//                     maintainAspectRatio: false,
//                     scales: {
//                         yAxes: [{
//                             ticks: {
//                                 beginAtZero: true,
//                             },
//                         }],
//                     },
//                 }}
//             />
//         </div>
//     );
// };

export default Chart;
