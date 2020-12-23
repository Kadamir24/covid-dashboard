import axios from 'axios';

export const fetchData = async (isLastDaySelected, urlForAll) => {
    const { data } = await axios.get(`https://disease.sh/v3/covid-19/${urlForAll}`);
    let newData;
    if (isLastDaySelected) {
        newData = [data].map((dataClass) => ({
            cases: dataClass.todayCases,
            deaths: dataClass.todayDeaths,
            recovered: dataClass.todayRecovered,
        }));
    } else {
        newData = [data].map((dataClass) => ({
            cases: dataClass.cases,
            deaths: dataClass.deaths,
            recovered: dataClass.recovered,
        }));
    }
    return newData;
};

export const fetchDataByCountry = async (appState, isLastDaySelected, selectedCountry) => {
    if (!isLastDaySelected) {
        const { data } = await axios.get(`https://disease.sh/v3/covid-19/historical/${selectedCountry}?lastdays=340`);
        const newData = [data].map((dataClass) => ({
            cases: dataClass.timeline.cases,
            deaths: dataClass.timeline.deaths,
            recovered: dataClass.timeline.recovered,
        }));
        return newData;
    }
    const data = appState.countries.find((element) => element.country === selectedCountry);
    const newData = [data].map((dataClass) => ({
        cases: dataClass.todayCases,
        deaths: dataClass.todayDeaths,
        recovered: dataClass.todayRecovered,
    }));
    return newData;
};
