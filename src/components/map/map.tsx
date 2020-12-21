import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import drawBorders from './drawBorders';
import drawPointers from './drawPointers';
import styles from './map.module.scss';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FkYW1pcjI0IiwiYSI6ImNraXk2emplNTI1cGEyeW40Y2JxMmQ0ZmQifQ.-rzmHUAxpKRFdBrqat63GA';

function Map() {
    const mapboxElRef = useRef(null);
    const { countries } = useSelector((state: RootState) => state.countries);
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
            drawPointers(map, data);
        }
    }, [data]);

    return (
        <div className={styles.container}>
            <div className={styles.box} ref={mapboxElRef} />
        </div>
    );
}

export default Map;
