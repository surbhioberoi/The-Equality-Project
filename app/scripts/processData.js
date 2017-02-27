'use strict';

var geojson = require('../data/countries.json');

var fs = require('fs');
var contents = fs.readFileSync('../data/parameters.csv').toString();


function processContents() {
    var lines = contents.split('\r\n');
    var propertyObject = {};
    var header = lines[0].split(',');
    lines = lines.slice(1);

    for (var i in lines) {
        var countryData = lines[i].split(',');
        propertyObject[countryData[0]] = {};
        for (var j = 2; j < header.length; j++) {
            propertyObject[countryData[0]][header[j]] = countryData[j];
        }
    }
    return propertyObject;
}

var countryProperties = processContents();



for (var k = 0; k < geojson.features.length; k++) {
    geojson.features[k].properties = countryProperties[geojson.features[k].id];
}

console.log(geojson.features);

var json = JSON.stringify(geojson);
fs.writeFile('../data/output.json', json, 'utf8', function(r) {
    console.log(r);
});
