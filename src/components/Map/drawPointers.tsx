import mapboxgl from 'mapbox-gl';
import lookup from 'country-code-lookup';

function drawPointers(map, data) {
    map.once('load', () => {
        map.addSource('points', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: data,
            },
        });
        map.addLayer({
            id: 'circles',
            source: 'points',
            type: 'circle',
            paint: {
                'circle-opacity': 0.75,
                'circle-stroke-width': [
                    'interpolate',
                    ['linear'],
                    ['get', 'cases'],
                    1, 1,
                    100000, 1.5,
                ],
                'circle-radius': [
                    'interpolate',
                    ['linear'],
                    ['get', 'cases'],
                    1, 4,
                    1000, 8,
                    4000, 10,
                    8000, 14,
                    12000, 18,
                    100000, 40,
                ],
                'circle-color': [
                    'interpolate',
                    ['linear'],
                    ['get', 'cases'],
                    1, '#00FF00',
                    5000, '#99ff00',
                    10000, '#FFFF00',
                    50000, '#FFCC00',
                    100000, '#ff9900 ',
                    300000, '#FF3300',
                    500000, '#FF0000',
                ],
            },
        });

        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
        });
        let lastId;
        map.on('mousemove', 'circles', (event) => {
            const { id } = event.features[0].properties;
            if (id !== lastId) {
                lastId = id;
                const {
                    cases, deaths, country, recovered,
                } = event.features[0].properties;
                // const newMap = map.getCanvas();
                // newMap.style.cursor = 'pointer';
                const coords = event.features[0].geometry.coordinates;
                const countryISO = lookup.byCountry(country)?.iso2
                || lookup.byInternet(country)?.iso2;
                const flagOfCountry = countryISO
                    ? `<img src="https://www.countryflags.io/${countryISO}/flat/64.png"></img>`
                    : '';
                const modalInfo = `${flagOfCountry}
                  <p>Country: <b>${country}</b></p>
                  <p>Cases: <b>${cases}</b></p>
                  <p>Recovered: <b>${recovered}</b></p>
                  <p>Deaths: <b>${deaths}</b></p>
                  `;
                while (Math.abs(event.lngLat.lng - coords[0]) > 180) {
                    coords[0] += event.lngLat.lng > coords[0] ? 360 : -360;
                }
                popup.setLngLat(coords).setHTML(modalInfo).addTo(map);
            }
        });
        map.on('mouseleave', 'circles', () => {
            lastId = undefined;
            // map.getCanvas().style.cursor = '';
            popup.remove();
        });
    });
}

export default drawPointers;
