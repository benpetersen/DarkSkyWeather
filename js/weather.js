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
    if(longitude.length > 4 && latitude.length > 4){
    updateWeather(longitude, latitude, function(json){
      setWeather(json);
    });
    }else{
      $("#errors").text("Longitude and Latitude are not valid");
    }
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
        
        callback(location);
      },error,options
    )
    var options = {
      enableHighAccuracy: true, 
      maximumAge        : 30000, 
      timeout           : 27000
    }
    function error(err){
      $("#errors").text(err);
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
    $("#errors").text(jqXHR + " " + textStatus);
  });
}

function setWeather(json){
  //console.log(JSON.stringify(json, null, 4));
  var days = ['Mon','Tues','Wed','Thurs','Fri','Sat','Sun'];
  $('#currentTemp').text("Current: " + json.currently.temperature);
  $('#currentSummary').text(json.currently.summary);
  for(var i = 0; i < 5; i++){
    var item = json.daily.data[i];
    //get numerical day of week from json, convert to day of week like "Thursday"
    var dayOfWeek = days[new Date(item.time*1000).getDay()];
    var iconSrc = "img/" + item.icon + ".png";

    //build jQuery id's (this is a really hacky way of doing components)
    var iconId = "#day" + i + "Icon"
    var lowId = "#day" + i + "Low";
    var highId = "#day" + i + "High";
    var descriptionId = "#day" + i + "Description";
    
    $(iconId).attr('src', iconSrc);
    $(descriptionId).text(dayOfWeek);
    $(lowId).text(Math.ceil(item.temperatureMin))
    $(highId).text(Math.ceil(item.temperatureMax));
  }
  
}
  