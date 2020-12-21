function drawBorders(map) {
    map.on('load', () => {
        map.addSource('country-boundaries-simplified', {
            type: 'vector',
            url: 'mapbox://examples.countries-simplification',
        });
        map.addLayer({
            id: 'countries-simplification-data',
            type: 'line',
            source: 'country-boundaries-simplified',
            'source-layer': 'countries_polygons',
            layout: {
                'line-join': 'round',
                'line-cap': 'round',
            },
            paint: {
                'line-color': 'red',
                'line-width': 3,
            },
        });
    });
}

export default drawBorders;
