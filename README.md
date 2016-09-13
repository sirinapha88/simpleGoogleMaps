# simpleGoogleMaps


- The main yelp screen where you can look for something near an address would be complex enough to show what the challenge asks for.  A map with a "Place Search" textbox and a "Nearby" textbox.  The page initializes the map with San Francisco as its center and if enabled, it uses geolocation to zoom in on the user's current location.

- A placeholder on the "Nearby" textbox shows that if the user leaves the textbox blank, it will use the current location as shown in the map.  I included an autocomplete feature from google maps as well, so the user can type either a city or an address.  

- I initialized the "Place Search" with "cafe" to have something to search if the user clicks the "Search" button.

- I feed the "Place Search" value to the google maps "type" property to narrow the type of places the app shows.  If the user types something in the "Nearby" textbox, the page will center the map on that location and zoom to 15 to show a small area.  I then ask google for a list of places that are visible in the map.

- The results are presented both as markers in the google map, and as items in a list.  If the user clicks on an item in the list, a small info window is placed on the proper marker.
