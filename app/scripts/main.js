'use strict';


function getColor(propValue) {
    console.log(propValue);
    if (propValue === 'Yes') {
        return '#B3DC69';
    } else if (propValue === 'No') {
        return '#E66665';
    } else if (propValue === 'Partial') {
        return '#F2C8C4';
    }
}


function renderMap(mapId, propertyName) {
    var mymap = L.map(mapId).setView([17.6078, 8.0817], 2);
    L.tileLayer('https://api.mapbox.com/styles/v1/surbhioberoi/cizmx52o5005s2ro18kb26ohd/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VyYmhpb2Jlcm9pIiwiYSI6ImNpem1na2JyNjAyaDcycW9jMmNocmVseWoifQ.tIfeurj_y9UUcY2Br9-yVw').addTo(mymap);

    var countries = new L.geoJson();
    countries.addTo(mymap);
    var legend = L.control({ position: 'bottomleft' });

    legend.onAdd = function() {

        var div = L.DomUtil.create('div', 'info legend');

        div.innerHTML += '<i style="background:#B3DC69"></i> YES <br>';
        div.innerHTML += '<i style="background:#E66665"></i> NO <br>';
        div.innerHTML += '<i style="background:#F2C8C4"></i> PARTIAL <br>';

        return div;
    };

    legend.addTo(mymap);


    function style(feature) {
        var props = feature.properties;
        var value;
        if (props === undefined || props[propertyName] === undefined) {
            value = 'UNDEF';
        } else {
            value = getColor(feature.properties[propertyName]);
        }
        return {
            fillColor: value,
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '2',
            fillOpacity: 0.7
            };
    }


    $.ajax({
        dataType: 'json',
        url: '/data/output.json',
        success: function(data) {
            $(data.features).each(function(key, d) {
                console.log(d);
                countries.addData(d);
                countries.setStyle(style);
            });
        }
    });

}

renderMap('trafficking', 'trafficking');
renderMap('literacy', 'equalLiteracy');
renderMap('homosexual', 'samesex');
renderMap('press', 'freedomPress');
renderMap('censorship', 'censorship');
