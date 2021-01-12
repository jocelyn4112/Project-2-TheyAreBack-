// On change to the DDM, runs function to fetch and render new data
function optionChanged(id) {
    getData(id);
}

// funtion fetches data for new visualizations
function getData(id) {
    var container = L.DomUtil.get('Map1');
    if(container != null){
        container._leaflet_id = null;
    }
    var ufoMarkers = [];
    d3.json('geojson').then(function(response){
        var selectedyear = response[0]['features'].filter(s => s.properties.Year.toString() === id);
        console.log(selectedyear)
        for (var i=0; i < selectedyear.length; i++){
            ufoMarkers.push(
                L.circleMarker((selectedyear[i]["geometry"]["coordinates"]), {
                  color: "green",
                  fillColor: "green",
                  fillOpacity: 0.75,
                  radius: 3
                }).bindPopup(selectedyear[i]["properties"]["Month"] + "/"+ selectedyear[i]["properties"]["Day"] + "/"
                + selectedyear[i]["properties"]["Year"] + "<br> Shape: " + selectedyear[i]["properties"]["Shape"] + "<br>Duration of Sighting in Seconds:<br>" + selectedyear[i]["properties"]["Duration"] + "<br>" + selectedyear[i]["properties"]["City"] + ", " + selectedyear[i]["properties"]["State"]
                    ).openPopup());
        // console.log(response);
        // console.log(ufoMarkers);
            };
        // console.log("loaded data");
        createMap(ufoMarkers);
      }); 
}

// init function plots data of first year to display on page load
function init() {
    var ufoMarkers = [];
    var select = document.getElementById("selDataset"); 
    d3.json('geojson').then(function(response){
        var yeardrops = []
        // console.log(response)
        for (var i=0; i < response[0]['features'].length; i++){
            yeardrops.push(response[0]['features'][i]['properties']['Year']);
            // shapebut.push(response[0]['features'][i]['properties']['Shape']);
        };
        var uyeardrops = Array.from(new Set(yeardrops));
        // var ushapes = Array.from(new Set(shapebut));
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
        console.log(selectedyear)
        for (var i=0; i < selectedyear.length; i++){
            ufoMarkers.push(
                    L.circleMarker((selectedyear[i]["geometry"]["coordinates"]), {
                        color: "green",
                        fillColor: "green",
                        fillOpacity: 0.75,
                        radius: 3
                    }).bindPopup(selectedyear[i]["properties"]["Month"] + "/"+ selectedyear[i]["properties"]["Day"] + "/"
                    + selectedyear[i]["properties"]["Year"] + "<br> Shape: " + selectedyear[i]["properties"]["Shape"] + 
                    "<br>Duration of Sighting in Seconds:<br>" + selectedyear[i]["properties"]["Duration"] + "<br>"
                     + selectedyear[i]["properties"]["City"] + ", " + selectedyear[i]["properties"]["State"]
                    ).openPopup());
            // console.log(response);
            // console.log(ufoMarkers);
        }
            // console.log("loaded data");
        
        createMap(ufoMarkers);
    });
}; 

// function to create background layers and UfoLayer to render onto map
function createMap(ufoMarkers){
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
    var baseMaps = {
        Dark: dark,
        Light: light,
    };
    var ufoLayer = L.layerGroup(ufoMarkers);
    var myMap1 = L.map("Map1", {
    center: [37.0902, -95.7129],
    zoom: 4,
    layers: [dark, ufoLayer]
    });
    // console.log("map created");
    // add baselayers to Map
    L.control.layers(baseMaps).addTo(myMap1);
};

init();