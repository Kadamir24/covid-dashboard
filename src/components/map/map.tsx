import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import drawBorders from './drawBorders';
import drawPointers from './drawPointers';
import drawPointersAbs from './drawPointersAbs';
import styles from './map.module.scss';
import { getCountries } from '../utils';
import { RootState } from '../../store/rootReducer';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FkYW1pcjI0IiwiYSI6ImNraXk2emplNTI1cGEyeW40Y2JxMmQ0ZmQifQ.-rzmHUAxpKRFdBrqat63GA';

function Map() {
    const { appState } = useSelector((state: RootState) => state);
    const is100k = appState.is100KPopSelected;
    const mapboxElRef = useRef(null);
    const countries = getCountries();
    const data = countries.map((point, index) => ({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [
                point.countryInfo.long,
                point.countryInfo.lat,
            ],
        },
        properties: {
            id: index,
            country: point.country,
            cases: point.cases,
            deaths: point.deaths,
            recovered: point.recovered,
        },
    }));

    useEffect(() => {
        if (data) {
            const map = new mapboxgl.Map({
                container: mapboxElRef.current,
                style: 'mapbox://styles/kadamir24/ckiyaugis6k7419rptba9kztg',
                center: [70, 50],
                zoom: 3,
            });
            map.addControl(new mapboxgl.NavigationControl());
            drawBorders(map);
            if (!is100k) {
                drawPointers(map, data);
            } else {
                drawPointersAbs(map, data);
            }
        }
    }, [data]);

    return (
        <div className={styles.container}>
            <div className={styles.box} ref={mapboxElRef} />
        </div>
    );
}

export default Map;
