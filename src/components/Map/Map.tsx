import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import useSWR from 'swr';
// import drawBorders from './drawBorders';
// import drawPointers from './drawPointers';

import './Map.scss';

import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoia2FkYW1pcjI0IiwiYSI6ImNraXk2emplNTI1cGEyeW40Y2JxMmQ0ZmQifQ.-rzmHUAxpKRFdBrqat63GA';

function Map() {
    const mapboxElRef = useRef(null);

    const getData = (url) => {
        fetch(url)
            .then((r) => r.json())
            .then((data) => data.map((point, index) => ({
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
            })));
    };

    const { data } = useSWR('https://corona.lmao.ninja/v2/countries', getData);
    console.log('data', data);

    useEffect(() => {
        // if (data) {
        const map = new mapboxgl.Map({
            container: mapboxElRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [70, 50],
            zoom: 3,
        });

        map.addControl(new mapboxgl.NavigationControl());
        // }
    }, []);

    return (
        <div className="Map">
            <div className="mapContainer">
                <div className="mapBox" ref={mapboxElRef} />
            </div>
        </div>
    );
}

export default Map;
