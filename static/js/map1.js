/ On change to the DDM, runs function to fetch and render new data
function optionChanged(id) {
    getData(id);
}
var ufoLayer = new L.LayerGroup();
var myMap1;
// color function //
// --purple: #6F42C1',
// --pink: #E83E8C',
// --red: #DC3545',
// --green2: #79D29E',
// --orange: #FD7E14',
// --yellow: #FFC107',
// --green: #28A745',
// --teal: #64A19D',
// --cyan: #17A2B8',
// --green1: #B3E6C8;
// --gray: #6C757D',
// --green5: #194D2F',
clrs = ["#58B5E1", "#0A4F4E", "#8BD7A0", "#841E41", "#8ADC30", "#7B4DD9", "#E4CCF1", "#1E438D", "#1CF1A3", "#D46052", "#658114", "#FA2E55"]
// ['#007BFF', 
//         '#6610F2',
//         '#6F42C1',
//         '#E83E8C',
//         '#DC3545',
//         '#79D29E',
//         '#FD7E14',
//         '#FFC107',
//         '#28A745',
//         '#64A19D',
//         '#17A2B8',
//         '#B3E6C8',
//         '#6C757D',
//         '#194D2F'];
function getColor(shape1, shapelist) {
    for (var i=0; i < shapelist.length; i++){
        if (shape1 === shapelist[i]){   
            return  clrs[i];
        }
    }
};
function setRaduius(seconds){
    if (seconds <= 3) {
        return 2;
    } else if (seconds <= 180) {
        return 4;
    } else if (seconds <= 600) {
        return 6;
    } else { 
        return 8;
    }
};
// funtion fetches data for new visualizations
function getData(id) {
    myMap1.removeLayer(ufoLayer);
    var ufoMarkers = [];
    d3.json('geojson').then(function(response){
        var selectedyear = response[0]['features'].filter(s => s.properties.Year.toString() === id);
        //console.log(selectedyear)
        for (var i=0; i < selectedyear.length; i++){
            chocolor = getColor(selectedyear[i]["properties"]["Shape"], ushapes)
            rad = setRaduius(parseInt(selectedyear[i]["properties"]["Duration"]))
            ufoMarkers.push(
                L.circleMarker((selectedyear[i]["geometry"]["coordinates"]), {
                  color: chocolor,
                  fillColor: chocolor,
                  fillOpacity: 0.25,
                  radius: rad
                }).bindPopup(selectedyear[i]["properties"]["Month"] + "/"+ selectedyear[i]["properties"]["Day"] + "/"
                + selectedyear[i]["properties"]["Year"] + "<br> Shape: " + selectedyear[i]["properties"]["Shape"] + "<br>Duration of Sighting in Seconds:<br>" + selectedyear[i]["properties"]["Duration"] + "<br>" + selectedyear[i]["properties"]["City"] + ", " + selectedyear[i]["properties"]["State"]
                    ).openPopup());
        };
        ufoLayer = L.layerGroup(ufoMarkers).addTo(myMap1);
    });
}
var ufoMarkers = [];
var coordinates = [];
var heat = [];
var ushapes;
var select = document.getElementById("selDataset");
d3.json('geojson').then(function(response){
    var yeardrops = []
    var shapedrops = []
    for (var i=0; i < response[0]['features'].length; i++){
        yeardrops.push(response[0]['features'][i]['properties']['Year']);
        shapedrops.push(response[0]['features'][i]['properties']['Shape']);
    };
    var uyeardrops = Array.from(new Set(yeardrops));
    ushapes = Array.from(new Set(shapedrops));
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
    //console.log(selectedyear)
    for (var i=0; i < selectedyear.length; i++){
        chocolor = getColor(selectedyear[i]["properties"]["Shape"], ushapes)
        rad = setRaduius(parseInt(selectedyear[i]["properties"]["Duration"]))
        ufoMarkers.push(
                L.circleMarker((selectedyear[i]["geometry"]["coordinates"]), {
                    color: chocolor,
                    fillColor: chocolor,
                    fillOpacity: 0.25,
                    radius: rad
                }).bindPopup(selectedyear[i]["properties"]["Month"] + "/"+ selectedyear[i]["properties"]["Day"] + "/"
                + selectedyear[i]["properties"]["Year"] + "<br> Shape: " + selectedyear[i]["properties"]["Shape"] +
                "<br>Duration of Sighting in Seconds:<br>" + selectedyear[i]["properties"]["Duration"] + "<br>"
                    + selectedyear[i]["properties"]["City"] + ", " + selectedyear[i]["properties"]["State"]
                ).openPopup());
    }
    var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY,
    })
    var dark = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/dark-v10",
        accessToken: API_KEY,
    })
    baseMaps = {
        Dark: dark,
        Light: light,
    };
    ufoLayer = L.layerGroup(ufoMarkers);
    myMap1 = L.map("Map1", {
    center: [37.0902, -95.7129],
    zoom: 4,
    layers: [dark, ufoLayer]
    });
    L.control.layers(baseMaps).addTo(myMap1);
});