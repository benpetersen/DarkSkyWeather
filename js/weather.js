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
  $('#getWeather').click(function(){  
    var latitude = $('#latitude').val();
    var longitude = $('#longitude').val();
    updateWeather(longitude, latitude, function(json){
      setWeather(json);
    });
  });
  updateCoordinate(function(location){
    updateWeather(location.longitude, location.latitude, function(json){
      setWeather(json);
    });
  });

});

function updateCoordinate(callback) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var location = {
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString()
        }
        $('#longitude').val(location.longitude);
        $('#latitude').val(location.latitude);
        // and here you call the callback with whatever
        // data you need to return as a parameter.
        callback(location);
      },error,options
    )
    var options = {
      enableHighAccuracy: true, 
      maximumAge        : 30000, 
      timeout           : 27000
    }
    function error(err){
      $("#errors").val(err);
      //alert(err)
    }
}
function updateWeather(longitude, latitude, callback){
  var url = "https://api.darksky.net/forecast/1f9a5eedd4211ec9f965223be81f2020/" + latitude + "," + longitude;
  $.ajax({
    format: "jsonp",
    dataType: "jsonp",
    url: url,
    success: function(json){
      callback(json);
    },error: function(err){
      $("#errors").val(err);
    }
  }).error(function(jqXHR, textStatus) {
    $("#errors").val(jqXHR + " " + textStatus);
  });
}

function setWeather(json){
  //console.log(JSON.stringify(json, null, 4));
  $("#todaysLow").text("Todays Low: " + json.daily.data[0].temperatureMin)
  $('#todaysHigh').text("Todays High: " + json.daily.data[0].temperatureMax);
  $('#currentTemp').text("Currently " + json.currently.summary + " with a temp of " + json.currently.temperature);
}
  