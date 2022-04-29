"use strict";

(function() {

    window.addEventListener("load", init);

    function init() {
        let button = document.querySelector('button');
        button.addEventListener('click', () => {
            let intro = document.getElementById('intro');
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
            style: 'mapbox://styles/mapbox/navigation-night-v1',
            zoom: 4.5,
            center: [-94, 40],
            projection: 'albers'
        });

        const case_number = [100, 1000, 10000, 100000],
            colors = ['rgb(254,204,92)', 'rgb(253,141,60)', 'rgb(227,26,28)', 'rgb(200,0,38)'],
            radii = [3, 9, 15, 21];


        map.on('load', () => {
            map.addSource('covid19-cases', {
                type: 'geojson',
                data: 'assets/us-covid-2020-counts.json'
            });

            map.addLayer({
                    'id': 'county-covid-point',
                    'type': 'circle',
                    'source': 'covid19-cases',
                    'minzoom': 4,
                    'maxzoom': 12,
                    'buffer': 512,
                    'paint': {
                        'circle-radius': {
                            'property': 'cases',
                            'stops': [
                                [{
                                    zoom: 4,
                                    value: case_number[0]
                                }, radii[0]],
                                [{
                                    zoom: 4,
                                    value: case_number[1]
                                }, radii[1]],
                                [{
                                    zoom: 4,
                                    value: case_number[2]
                                }, radii[2]],
                                [{
                                    zoom: 4,
                                    value: case_number[3]
                                }, radii[3]]
                            ]
                        },
                        'circle-color': {
                            'property': 'cases',
                            'stops': [
                                [case_number[0], colors[0]],
                                [case_number[1], colors[1]],
                                [case_number[2], colors[2]],
                                [case_number[3], colors[3]]
                            ]
                        },
                        'circle-stroke-color': 'white',
                        'circle-stroke-width': 0.5,
                        'circle-opacity': 0.9
                    }
                }
            );

            map.on('click', 'county-covid-point', (event) => {
                var county_info = `<strong>State:</strong> ${event.features[0].properties.state}<br>`
                county_info += `<strong>County:</strong> ${event.features[0].properties.county}<br>`
                county_info += `<strong>Cases:</strong> ${event.features[0].properties.cases}<br>`
                county_info += `<strong>Deaths:</strong> ${event.features[0].properties.deaths}`
                new mapboxgl.Popup()
                    .setLngLat(event.features[0].geometry.coordinates)
                    .setHTML(county_info)
                    .addTo(map);
                let info = document.getElementById('info');
                info.innerHTML = "";
                info.innerHTML = county_info;
            });

            let legend = document.getElementById('legend');
            var labels = ['<strong>Cases</strong>'],
                vbreak;
            for (var i = 0; i < case_number.length; i++) {
                vbreak = ' >' + case_number[i];
                let dot_radii = 2 * radii[i];
                labels.push(
                    '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radii +
                    'px; height: ' +
                    dot_radii + 'px; "></i> <span class="dot-label" style="top: ' + dot_radii / 2 + 'px;">' + vbreak +
                    '</span></p>');
            }
            legend.innerHTML = labels;

            const source =
                '<p style="text-align: right; font-size:10pt">Source: '+
                '<a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">New York Times</a></p>';
            legend.innerHTML = labels.join('') + source;
        });
    }
})();


