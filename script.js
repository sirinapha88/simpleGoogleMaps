
var myLocation, distance, interest, map, merkerContent;

var markers = [];

window.onload = function()
{
  // document.getElementsByClassName("form-style result")[0].style.visibility = "hidden";
  initMap();

}

function initMap()
{
  //initilize map in San Francisco
   map = new google.maps.Map(document.getElementById("mapArea"), {
    center: {lat: 37.774929, lng: -122.419416},
    zoom: 12
  });
  drawMap();
}

function drawMap()
{ 
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
  else
    alert("Geo Location is not supported");
}

function onSuccess(position)
{
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  myLocation = new google.maps.LatLng(lat, long);

  var mapOptions = {
    center: myLocation,
    zoom: 16,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("mapArea"), mapOptions);
  var myLoc = new google.maps.Marker({
      position: myLocation,
      map: map,
  });
  markers.push(myLoc);
}
// Popup div
function onError(error)
{
  if(error.code === "PERMISSION_DENIED")
    alert("User denied permission");
  else if(error.code === "TIMEOUT:")
    alert("Geolocation timed out");
  else
    alert("Geolocation Error");
}

function getLocations()
{
  clearMarkers();
  interest = document.getElementById("interest").value;
  distance = document.getElementById("distance").value;
  findPlaces();
}
// Drag the map find where the maps is.
function findPlaces()
{
  var request = {
    location: myLocation,
    radius: distance,
    type:interest
  };
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, createMarkers);
}

function createMarkers(response, status)
{
  var latlngbounds = new google.maps.LatLngBounds();

  if (status == google.maps.places.PlacesServiceStatus.OK){
    clearMarkers();
  
    for(var i=0;i<response.length;i++){
      drawMarker(response[i]);
      latlngbounds.extend(response[i].geometry.location);
      createMarkerButton(markers[i])
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

function drawMarker(obj)
{
  var marker = new google.maps.Marker({
    position:obj.geometry.location,
    map:map
  });

  markers.push(marker);
//TODO: Check for rating before display
  var infoWindow = new google.maps.InfoWindow({
    content: '<img src="' + obj.icon + '"/><font style="color:gray">' +
    obj.name + '<br />Rating: ' + obj.rating +
    '<br />Address: ' + obj.vicinity + '</font>'
  });

  merkerContent = infoWindow;

  google.maps.event.addListener(marker, 'click', function(){
    infoWindow.open(map, marker);
  });
}

function createMarkerButton(marker) 
{
  var placesList = document.getElementById("places");
  var li = document.createElement("li");

  var title = merkerContent.content;
  console.log(title);
  li.innerHTML = title;
  placesList.appendChild(li);
    
  google.maps.event.addDomListener(li, "click", function(){
    google.maps.event.trigger(marker, "click");
  });
}

function clearMarkers()
{
  if (markers){
    for(i in markers){
      markers[i].setMap(null);
    }
    markers = [];
  }
  
  var placesList = document.getElementById("places");
  placesList.innerHTML = '';

}
//TODO: Make sure its connected and it works.


function myFunction() 
{
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
      x.className += " responsive";
  } else {
      x.className = "topnav";
  }
}
