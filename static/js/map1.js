//Empty list to store our data from API call for coordinates
var ufoMarkers = [];
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
//create Popup content
//fetch data and render onto map with createMap function
d3.json('geojson').then(function(response){
    for (var i=0; i < 1000; i++){
    //for (var i=0; i < response[0]["features"].length; i++) {
        ufoMarkers.push(
            L.circleMarker((response[0]["features"][i]["geometry"]["coordinates"]), {
              color: "green",
              fillColor: "green",
              fillOpacity: 0.75,
              radius: 3
            }).bindPopup(response[0]["features"][i]["properties"]["Month"] + "/"+ response[0]["features"][i]["properties"]["Day"] + "/"
            + response[0]["features"][i]["properties"]["Year"] + "<br> Shape: " + response[0]["features"][i]["properties"]["Shape"] + "<br>Duration of Sighting in Seconds:<br>" + response[0]["features"][i]["properties"]["Duration"]
                ).openPopup());
    // console.log(response);
    // console.log(ufoMarkers);
        };
    console.log("loaded data");
    createMap(ufoMarkers);
  });// // // set latitude and longtitude of geojsons 
// // // marker1.setLatLng([latitude, longitude])
// console.log('hi');

// // Creating our initial map object
// // We set the longitude, latitude, and the starting zoom level
// // This gets inserted into the div with an id of 'map'

  
// ufoSighting = d3.json('geojson').then(function(data){
//     console.log(data);
//   });

// // Sighting Data to marker 
// // ufoSightings.forEach(ufo => {
// //     var marker = L.marker(ufoSighting.GET LAT LONG);
// // });

// //Fetching data from API and then construct the map, and a marker layer
// // var ufoMarkers = [];

// // for (var i=0; i < ufoSighting.length; i++) {
// //     ufoMarkers.push(
// //         L.marker(ufoSighting[i].GET LAT LONG)
// //     );
// // }

//  // Adding a tile layer (the background map image) to our map
//   // We use the addTo method to add objects to our map

// var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/light-v10",
//     accessToken: API_KEY,
// }).addTo(myMap1);

// var dark = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/dark-v10",
//     accessToken: API_KEY,
// }).addTo(myMap1);

// var baseMaps = {
//     Dark: dark,
//     Light: light,
// };

// //var ufoLayer = L.layerGroup(ufoMarkers);

// var myMap1 = L.map("Map1", {
//     center: [37.0902, -95.7129],
//     zoom: 5,
//     layers: [dark],
//   });

// L.control.layers(baseMaps, overlayMaps).addTo(myMap1)
//