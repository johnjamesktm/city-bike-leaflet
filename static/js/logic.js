var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;

let citiBikeUrl = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json";

// Create the createMap function.
function createMap(bikeMarkers) {

  // Create the tile layer that will be the background of our map.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });


  // Create a baseMaps object to hold the lightmap layer.
  var baseMaps = {
    Street: street
  };
  

  // Create an overlayMaps object to hold the bikeStations layer.
  var bikeStationsLayer = L.layerGroup(bikeMarkers);
  var overlayMaps = {
    "Bike Stations": bikeStationsLayer
  };

  // Create the map object with options.
  var myMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [street, bikeStationsLayer]
  });
  

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
}

// Create the createMarkers function.
function createMarkers(data) {
  // Pull the "stations" property from response.data.
  var stations = data.data.stations;

  // Initialize an array to hold the bike markers.
  var bikeMarkers = [];

  // Loop through the stations array.
  stations.forEach((item) => {
    // For each station, create a marker, and bind a popup with the station's name.
    var marker = L.marker([item.lat, item.lon]).bindPopup(`<b>${item.name}<br />Capacity: ${item.capacity}`);
    // Add the marker to the bikeMarkers array.
    bikeMarkers.push(marker);
  });

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  return bikeMarkers;
}

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
/*
d3.json(citiBikeUrl).then((data) => {
  bikeMarkers = createMarkers(data);
  createMap(bikeMarkers);
});
*/

bikeMarkers = createMarkers(data);
createMap(bikeMarkers);
