// On change to the DDM, runs function to fetch and render new data
function optionChanged(id) {
    getData(id);
}
// Defines global variables
var heatLayer = new L.heatLayer()
var myMap1;
// funtion fetches data for new visualizations
function getData(id) {
    myMap1.removeLayer(heatLayer);
    var coordinates = [];
    var heat = [];
    d3.json('geojson').then(function(response){
        var selectedyear = response[0]['features'].filter(s => s.properties.Year.toString() === id);
        //console.log(selectedyear)
        for (var i=0; i < selectedyear.length; i++){
            coordinates = (response[0]["features"][i]["geometry"]["coordinates"]);
            heat.push([coordinates[0], coordinates[1]]);
        };
        heatLayer = L.heatLayer(heat, {
            radius: 35,
            blur: 5,
        });
        heatLayer.addTo(myMap1);
    });
};
var coordinates = [];
var heat = [];
var select = document.getElementById("selDataset");
d3.json('geojson').then(function(response){
    var yeardrops = []
    for (var i=0; i < response[0]['features'].length; i++){
        yeardrops.push(response[0]['features'][i]['properties']['Year']);
    };
    var uyeardrops = Array.from(new Set(yeardrops));
    for (var i=0; i < uyeardrops.length; i++){
        {
            var optn = uyeardrops[i];
            var el = document.createElement("option");
            el.textContent = optn;
            el.value = optn;
            select.appendChild(el);
        }
    }
    var selectedyear = response[0]['features'].filter(s => s.properties.Year.toString() === uyeardrops[0]);
    for (var i=0; i < selectedyear.length; i++){
        coordinates = (response[0]["features"][i]["geometry"]["coordinates"]);
        heat.push([coordinates[0], coordinates[1]]);
    }
    var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY,
    });
    var dark = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/dark-v10",
        accessToken: API_KEY,
    });
    baseMaps = {
        Dark: dark,
        Light: light,
    };
    heatLayer = L.heatLayer(heat, {
        radius: 20,
        blur: 40,
    });
    myMap1 = L.map("Map1", {
        center: [37.0902, -95.7129],
        zoom: 4,
        layers: [dark, heatLayer]
    });
    L.control.layers(baseMaps).addTo(myMap1);
});