# DarkSkyWeather
Uses entered or HTML5 Geolocation to get longitude and latitude for Dark Sky's weather data. It displays a simple forcast using Google Now weather icons
Default Long/Lat values are from Lafeyette, Colorado

### Download the package and view the html file in the browser. Ex:
file:///C:/Projects/GitHub/DarkSkyWeather/index.html

### Background and Languages
To speed up development I used an old version of jQuery, did not do a maps lookup for City, State from that Longitude/Latitude (the callbacks were getting slightly crazy already), used Google Now's weather icons which may not be accurate because Dark Sky only sends clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night. While google now has 36 (day icons). I only pulled in the few night icons I needed (from https://drive.google.com/drive/folders/0B7QNGruJw4_hemp5QUZwcTZ4TEk?usp=sharing)
