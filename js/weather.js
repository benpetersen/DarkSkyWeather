$(document).ready(function() {
    //get browser location? (it says to enter via keyboard)
    //use long/lat to get data from api
    /*
    https://api.darksky.net/forecast/[key]/[latitude],[longitude]
    Key: 1f9a5eedd4211ec9f965223be81f2020
    Example for KPA’s weather
    https://api.darksky.net/forecast/1f9a5eedd4211ec9f965223be81f2020/40.014257,-105.126537
    https://codepen.io/benpetersen/pen/goNYNZ
*/
  var location = getLocation();
  var weather = getWeather(location.longitude, location.latitude);
  if(weather != null){
    setWeather(weather);
  }
});

function getLocation(){
  var location = {
    longitude: 0,
    latitude: 0
  }

  if (!navigator.geolocation){
    return;
  }
  navigator.geolocation.getCurrentPosition(success, error);
  
  function success(position) {
    location.latitude  = position.coords.latitude;
    location.longitude = position.coords.longitude;
    return location;
  }

  function error() {
    //error message
    return;
  }

  
}
function getWeather(longitude, latitude){
  var url = "https://api.darksky.net/forecast/1f9a5eedd4211ec9f965223be81f2020/" + longitude + "," + latitude;
  $.ajax({
    format: "jsonp",
    dataType: "jsonp",
    url: url,
    success: function(json){
      return json;
    }
  }).error(function(jqXHR, textStatus) {
    alert("errror: " + JSON.stringify(jqXHR));
  });
}
function setWeather(json){

}
  