/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log('hi');

// This isn't necessary but it keeps the editor from thinking L and carto are typos
/* global L, carto */

var map = L.map('map', {
  center: [40.70, -73.89],
  zoom: 11
});

// Add base layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

// Initialize Carto
var client = new carto.Client({
  apiKey: 'default_public',
  username: 'torrh257'
});



// Initialze source data - Census Tracts
var censussource = new carto.source.SQL('SELECT * FROM nyc_block_group_census');

// Create style for the data
var censusstyle = new carto.style.CartoCSS(`
#layer {
  polygon-fill: #ffffff;
  polygon-opacity: 0.9;
}
#layer::outline {
  line-width: 1;
  line-color: #6e6e6e;
  line-opacity: 0.5;
}
`)

// Add style to the data
var censuslayer = new carto.layer.Layer(censussource, censusstyle);

// Add the data to the map as a layer
client.addLayer(censuslayer);
client.getLeafletLayer().addTo(map);

/*
 * Listen for changes on the layer picker
 */

// Step 1: Find the dropdown by class. If you are using a different class, change this.
var layerPicker = document.querySelector('.layer-picker');

// Step 2: Add an event listener to the dropdown. We will run some code whenever the dropdown changes.
layerPicker.addEventListener('change', function (e) {
  // The value of the dropdown is in e.target.value when it changes
  var column = e.target.value;
  
  // Step 3: Decide on the SQL query to use and set it on the datasource
  if (column === 'census') {
    console.log('census');
    // If the value is "all" then we show all of the features, unfiltered
    censusstyle.setContent(`
#layer {
  polygon-fill: #ffffff;
  polygon-opacity: 0.9;
}
#layer::outline {
  line-width: 1;
  line-color: #6e6e6e;
  line-opacity: 0.5;
}`);
  }
  
  if (column === 'race') {
    console.log('race');
    // If the value is "all" then we show all of the features, unfiltered
    censusstyle.setContent(`
#layer {
  polygon-fill: ramp([ethnic_1st], (#7F3C8D, #11A579, #3969AC, #F2B701, #E73F74, #A5AA99), ("white", "hispanic or latino", "black", "asian", "other"), "=");
}
#layer::outline {
  line-width: 1;
  line-color: #FFFFFF;
  line-opacity: 0.5;
}`);
  }
  
  if (column === 'income') {
    console.log('income');
    // If the value is "all" then we show all of the features, unfiltered
    censusstyle.setContent(`
#layer {
  polygon-fill: ramp([median_household_income], (#f3e0f7, #dbbaed, #b998dd, #9178c4, #63589f), quantiles);
}
#layer::outline {
  line-width: 1.5;
  line-color: #FFFFFF;
  line-opacity: 0.5;
}`);
  }
  
  if (column === 'age') {
    console.log('age');
    // If the value is "all" then we show all of the features, unfiltered
    censusstyle.setContent(`
#layer {
  polygon-fill: ramp([median_age], (#f7feae, #7ccba2, #089099, #045275), quantiles);
}
#layer::outline {
  line-width: 1;
  line-color: #FFFFFF;
  line-opacity: 0.5;
}`);
  }

if (column === 'off') {
    console.log('off');
    // If the value is "all" then we show all of the features, unfiltered
    censusstyle.setContent(`
#layer {
  polygon-fill: #ffffff;
  polygon-opacity: 0;
}
#layer::outline {
  line-width: 1;
  line-color: transparent;
  line-opacity: 0;
}`);
  }

});


// Initialze source data - Bike Lanes Routes
var bikeroutesource = new carto.source.SQL('SELECT * FROM nyc_bike_routes_2017');

// Create style for the data
var bikeroutestyle = new carto.style.CartoCSS(`
 #layer {
  line-width: 1.5;
  line-color: green;
  line-opacity: 100;
}
`)

// Add style to the data
var bikeroutelayer = new carto.layer.Layer(bikeroutesource, bikeroutestyle);

// Add the data to the map as a layer
client.addLayer(bikeroutelayer);
client.getLeafletLayer().addTo(map);



// Add style to the data
var bikeroutelayer = new carto.layer.Layer(bikeroutesource, bikeroutestyle);

// Add the data to the map as a layer
client.addLayer(bikeroutelayer);
client.getLeafletLayer().addTo(map);


// Initialze source data - Subway Lines
var subwaylinesource = new carto.source.SQL('SELECT * FROM nyc_subway_line');

// Create style for the data
var subwaylinestyle = new carto.style.CartoCSS(`
 #layer {
  line-width: 1.5;
  line-color: ramp([color], (#fd7b3b, #fd3924, #fff23a, #2744fd, #21a118, #491414, #4e514d, #82c74d, #615f5f, #6928bc, #000000), ("orange", "red", "yellow", "blue", "green", "brown", "dark grey", "light green", "grey", "pruple"), "=");
}
`)

// Add style to the data
var subwaylinelayer = new carto.layer.Layer(subwaylinesource, subwaylinestyle);

// Add the data to the map as a layer
client.addLayer(subwaylinelayer);
client.getLeafletLayer().addTo(map);


// Initialze source data - Subway Stations
var subwaystationsource = new carto.source.SQL('SELECT * FROM subway_stations_color');

// Create style for the data
var subwaystationstyle = new carto.style.CartoCSS(`
 #layer {
  marker-width: 7;
  marker-fill: ramp([grey], (#ff4545, #3e4bff, #ff8b16, #317426, #ffed48, #643434, #919191, #90e260, #951bff, #545454, #000000), ("red", "blue", "orange", "green", "yellow", "brown", "grey", "light green", "purple", "dark grey"), "=");
  marker-fill-opacity: 1;
  marker-allow-overlap: true;
  marker-line-width: 0.5;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 1;
}
`)

// Add style to the data
var subwaystationlayer = new carto.layer.Layer(subwaystationsource, subwaystationstyle);

// Add the data to the map as a layer
client.addLayer(subwaystationlayer);
client.getLeafletLayer().addTo(map);



// Initialze source data - Citi Bike Stations
var citibikesource = new carto.source.SQL('SELECT * FROM bikeshare_nyc_raw_lat_lon');

// Create style for the data
var citibikestyle = new carto.style.CartoCSS(`
 #layer {
  marker-width: 7;
  marker-fill: #345ba9;
  marker-fill-opacity: 0.9;
  marker-allow-overlap: true;
  marker-line-width: 1;
  marker-line-color: #FFFFFF;
  marker-line-opacity: 1;
}
`)

// Add style to the data
var citibikelayer = new carto.layer.Layer(citibikesource, citibikestyle, {
  featureClickColumns: ['dock_name']
});

citibikelayer.on('featureClicked', function (event) {
  // Create the HTML that will go in the popup. event.data has all the data for 
  // the clicked feature.
  //
  // I will add the content line-by-line here to make it a little easier to read.
  var citibikecontent = '<h1>' + event.data['dock_name'] + '</h1>';
  
  // If you're not sure what data is available, log it out:
  console.log(event.data);
  
  var citibikepopup = L.popup();
  citibikepopup.setContent(citibikecontent);
  
  // Place the popup and open it
  citibikepopup.setLatLng(event.latLng);
  citibikepopup.openOn(map);
});


// Add the data to the map as a layer
client.addLayer(citibikelayer);
client.getLeafletLayer().addTo(map);



map.on('click', function (e) {
  console.log(e.latlng);
  // We want the SQL to look something like this (lat: 40.732, lng: -73.986)
  // SELECT * FROM nypd_motor_vehicle_collisions WHERE ST_Within(ST_Transform(the_geom, 2263), ST_Buffer(ST_Transform(CDB_LatLng(40.732,-73.986), 2263),10000))
  
  //Citi Bike Station
  // So place the lat and lng in the query at the appropriate points
  var sqlbikeroute = 'SELECT * FROM nyc_bike_routes_2017 WHERE ST_Intersects(ST_Transform(the_geom, 2263), ST_Buffer(ST_Transform(CDB_LatLng(' + e.latlng.lat + ',' + e.latlng.lng + '), 2263),2500))';
  console.log(sqlbikeroute);
  
  bikeroutesource.setQuery(sqlbikeroute);
  
  // Make SQL to get the summary data you want
  var countSql1 = 'SELECT Sum(ST_length(ST_Transform(the_geom, 2263))) FROM nyc_bike_routes_2017 WHERE ST_Intersects(ST_Transform(the_geom, 2263), ST_Buffer(ST_Transform(CDB_LatLng(' + e.latlng.lat + ',' + e.latlng.lng + '), 2263),2500))';
  

  // Request the data from Carto using fetch.
  // You will need to change 'brelsfoeagain' below to your username, otherwise this should work.
  fetch('https://torrh257.carto.com/api/v2/sql/?q=' + countSql1)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // All of the data returned is in the response variable
      console.log(data);

      // The sum is in the first row's sum variable
      var bikelanemiles = data.rows[0].sum;

      // Get the sidebar container element
      var sidebarContainer1 = document.querySelector('.sidebar-feature-content1');

      // Add the text including the sum to the sidebar
      sidebarContainer1.innerHTML = '<div>There are ' + Math.round(bikelanemiles/5280) + ' Bike Lanes in this area</div>';
    });
  
  
  console.log(e.latlng);
  // We want the SQL to look something like this (lat: 40.732, lng: -73.986)
  // SELECT * FROM nypd_motor_vehicle_collisions WHERE ST_Within(ST_Transform(the_geom, 2263), ST_Buffer(ST_Transform(CDB_LatLng(40.732,-73.986), 2263),10000))
  
    //Train Station
  // So place the lat and lng in the query at the appropriate points
  var sqltrainstop = 'SELECT * FROM subway_stations_color WHERE ST_Within(ST_Transform(the_geom, 2263), ST_Buffer(ST_Transform(CDB_LatLng(' + e.latlng.lat + ',' + e.latlng.lng + '), 2263),2500))';
  console.log(sqltrainstop);
  
  subwaystationsource.setQuery(sqltrainstop);
  
  // Make SQL to get the summary data you want
  var countSql2 = 'SELECT SUM(train_stop) FROM subway_stations_color WHERE ST_Within(ST_Transform(the_geom, 2263), ST_Buffer(ST_Transform(CDB_LatLng(' + e.latlng.lat + ',' + e.latlng.lng + '), 2263),2500))';
  
  // Request the data from Carto using fetch.
  // You will need to change 'brelsfoeagain' below to your username, otherwise this should work.
  fetch('https://torrh257.carto.com/api/v2/sql/?q=' + countSql2)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // All of the data returned is in the response variable
      console.log(data);

      // The sum is in the first row's sum variable
      var trainstop = data.rows[0].sum;

      // Get the sidebar container element
      var sidebarContainer2 = document.querySelector('.sidebar-feature-content2');

      // Add the text including the sum to the sidebar
      sidebarContainer2.innerHTML = '<div>There are ' + trainstop + ' train stops in this area</div>';
    });
    
    
  console.log(e.latlng);
  // We want the SQL to look something like this (lat: 40.732, lng: -73.986)
  // SELECT * FROM nypd_motor_vehicle_collisions WHERE ST_Within(ST_Transform(the_geom, 2263), ST_Buffer(ST_Transform(CDB_LatLng(40.732,-73.986), 2263),10000))
  
    //Census Track
  // So place the lat and lng in the query at the appropriate points
  var sqlcensus = 'SELECT * FROM nyc_block_group_census WHERE ST_Within(ST_Transform(the_geom, 2263), ST_Buffer(ST_Transform(CDB_LatLng(' + e.latlng.lat + ',' + e.latlng.lng + '), 2263),2500))';
  console.log(sqlcensus);
  
  censussource.setQuery(sqlcensus);
  
  // Make SQL to get the summary data you want
  var countSql3 = 'SELECT AVG(median_household_income) FROM nyc_block_group_census WHERE ST_Within(ST_Transform(the_geom, 2263), ST_Buffer(ST_Transform(CDB_LatLng(' + e.latlng.lat + ',' + e.latlng.lng + '), 2263),2500))';
  
  // Request the data from Carto using fetch.
  // You will need to change 'brelsfoeagain' below to your username, otherwise this should work.
  fetch('https://torrh257.carto.com/api/v2/sql/?q=' + countSql3)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // All of the data returned is in the response variable
      console.log(data);

      // The sum is in the first row's sum variable
      var censusdata = data.rows[0].avg;

      // Get the sidebar container element
      var sidebarContainer3 = document.querySelector('.sidebar-feature-content3');

      // Add the text including the sum to the sidebar
      sidebarContainer3.innerHTML = '<div>The average median household income is $' + censusdata + ' in this area</div>';
  });
      });
  
  /*
 * Add event listener to the map that updates the latitude and longitude on the form
 */

var latitudeField = document.querySelector('.latitude-field');
var longitudeField = document.querySelector('.longitude-field');

var markerLayer = L.featureGroup().addTo(map);

map.on('click', function (event) {
  // Clear the existing marker
  markerLayer.clearLayers();
  
  // Log out the latlng so we can see that it's correct
  console.log(event.latlng);
  
  // Add a marker to the map
  var marker = L.marker(event.latlng);
  markerLayer.addLayer(marker);
  
  // Update the form fields
  latitudeField.value = event.latlng.lat;
  longitudeField.value = event.latlng.lng;
  });