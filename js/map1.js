"use strict";

(function() {

    window.addEventListener("load", init);

    function init() {
        let button = document.querySelector('button');
        button.addEventListener('click', () => {
            let intro = document.getElementById('intro-text');
            intro.classList.toggle('hidden');
            if (intro.classList.contains('hidden')) {
                button.innerHTML = 'show';
            } else {
                button.innerHTML = 'hide';
            }
        })
        mapboxgl.accessToken =
            'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/outdoors-v11',
            zoom: 4,
            center: [-100, 38],
            projection: 'albers'
        });

        async function geojsonFetch() {
            let response = await fetch('assets/us-covid-2020-rates.json');
            let stateData = await response.json();

            map.on('load', function loadingData() {
                map.addSource('countyData', {
                    type: 'geojson',
                    data: stateData
                });

                map.addLayer({
                    'id': 'countyData-layer',
                    'type': 'fill',
                    'source': 'countyData',
                    'paint': {
                        'fill-color': [
                            'step',
                            ['get', 'rates'],
                            '#FFD07F',
                            25,
                            '#FDA65D',
                            50,
                            '#FF8243',
                            100,
                            '#E26A2C',
                            200,
                            '#B20600'
                        ],
                        'fill-outline-color': '#041C32',
                        'fill-opacity': 0.9,
                    }
                });

                const layers = [
                    '0-24',
                    '25-49',
                    '50-99',
                    '99-199',
                    '>200'
                ];
                const colors = [
                    '#FFD07F70',
                    '#FDA65D70',
                    '#FF824370',
                    '#E26A2C70',
                    '#B2060070'
                ];

                const legend = document.getElementById('legend');
                legend.innerHTML = "<h3 class='centered'>Covid-19 Case Rate<br>(cases/1000 people)</h3>";


                layers.forEach((layer, i) => {
                    const color = colors[i];
                    const item = document.createElement('div');
                    const key = document.createElement('span');
                    key.className = 'legend-key';
                    key.style.backgroundColor = color;

                    const value = document.createElement('span');
                    value.innerHTML = `${layer}`;
                    item.appendChild(value);
                    item.appendChild(key);
                    legend.appendChild(item);
                });
                legend.innerHTML += "<h3>Sources</h3>"
                legend.innerHTML += "<a href='https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv' class='centered'>Covid-19 source</a>";
                legend.innerHTML += "<br><a href='https://data.census.gov/cedsci/table?g=0100000US%24050000&d=ACS%205-Year%20Estimates%20Data%20Profiles&tid=ACSDP5Y2018.DP05&hidePreview=true' class='centered'>Population source</a>";
            });

            map.on('mousemove', ({point}) => {
                const county = map.queryRenderedFeatures(point, {
                    layers: ['countyData-layer']
                });
                document.getElementById('text-escription').innerHTML = county.length ?
                    `<h3>${county[0].properties.county}, ${county[0].properties.state}</h3><p><strong><em>${county[0].properties.rates}</strong> Cases per 1000 people</em></p>` :
                    `<p>Hover over a county!</p>`;
            });
        }

        geojsonFetch();
    }
})();