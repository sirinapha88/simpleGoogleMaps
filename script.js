
var myLocation, distance, interest, map;

var markers = new Array();

window.onload = function(){
  initMap();
}

function initMap() {
  //initilize map in San Francisco
   map = new google.maps.Map(document.getElementById("mapArea"), {
    center: {lat: 37.774929, lng: -122.419416},
    zoom: 15
  });
  drawMap();
}

function drawMap(){ 
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
  else
    error('Geo Location is not supported');
}

function onSuccess(position){
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  myLocation = new google.maps.LatLng(lat, long);

  var mapOptions = {
    center: myLocation,
    zoom: 11,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("mapArea"), mapOptions);
  var marker = new google.maps.Marker({
      position: myLocation,
      map: map,
  });
}

function onError(error){


}

function getLocations(){
  interest = document.getElementById("interest").value;
  distance = document.getElementById("distance").value;
  console.log(interest)
    
  findPlaces();
}

function findPlaces(){
  var request = {
    location: myLocation,
    radius: distance,
    type:interest
  };
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, createMarkers);
}

function createMarkers(response, status){
  var latlngbounds = new google.maps.LatLngBounds();

  if (status == google.maps.places.PlacesServiceStatus.OK){
    clearMarkers();
  
    for(var i=0;i<response.length;i++){
      drawMarker(response[i]);
      latlngbounds.extend(response[i].geometry.location);
    }
    map.fitBounds(latlngbounds);
  } 
  else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS){
    alert("Sorry, there is no matching result!!");
  } 
  else{
    alert("Sorry, there is some error!!!");
  }
}

function drawMarker(obj){
  var marker = new google.maps.Marker({
    position:obj.geometry.location,
    map:map
  });

  markers.push(marker);
  var infoWindow = new google.maps.InfoWindow({
    content: '<img src="' + obj.icon + '"/><font style="color:gray">' +
    obj.name + '<br />Rating: ' + obj.rating +
    '<br />Vicinity: ' + obj.vicinity + '</font>'
  });

  google.maps.event.addListener(marker, 'click', function(){
    infoWindow.open(map, marker);
  });
}

function clearMarkers(){
  if (markers){
    for(i in markers){
      markers[i].setMap(null);
    }
    markers = [];
  }
}

function resize() {
  map.setCenter(map_center);
  map.fitBounds(path_bounds);
}
