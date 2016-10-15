// Get location through ipinfo.io
$.get('http://ipinfo.io', function(res) {
  // Create variables for location fields
  // ip needs to be split so I can use lat and long seperatly
  var ip = res.loc.split(',');
  var city = res.city;
  var country = res.country;
  // console.log(ip, city, country);
    
  // Assign area details to screen
  $('.city').text(city);
  $('.country').text(country);
  
  // Use ip to get weather details from Open Weather API
  var apiKey = '30aff74e8883b1157ec707686644b987';
  $.get('http://api.openweathermap.org/data/2.5/weather?lat=' + ip[0] + '&lon=' + ip[1] + '&units=metric&APPID=' + apiKey, function(res) {
    // Create variables for weather
    var desc = res.weather[0].description;
    var tempc = Math.floor(res.main.temp);
    var tempf = Math.floor(res.main.temp * 1.8 + 32);
    var windSpeed = res.wind.speed;
    var windDirection = res.wind.deg;
    var icon = res.weather[0].icon;
    
    // Put various variables on screen
    $('.desc').text(desc);
    $('.temp').text(tempc);
    $('.wind-speed').text(windSpeed + ' meter/sec');
    $('.fa').css('transform', 'rotate(' + windDirection + 'deg)');
    $('.fa').css('transform', '-o-rotate(' + windDirection + 'deg)');
    $('.fa').css('transform', '-ms-rotate(' + windDirection + 'deg)');
    $('.fa').css('transform', '-moz-rotate(' + windDirection + 'deg)');
    $('.fa').css('transform', '-webkit-rotate(' + windDirection + 'deg)');
    $("#image").attr('src','http://openweathermap.org/img/w/'+icon+'.png');
    
    // Add ability to change temperature
    var current = 0;
    $('.changeTemp').click(function(){
      if ( current == 0 ) {
        $('.temp').text(tempf);
        $('.tempc').css('display', 'none');
        $('.tempf').css('display', 'inline');
        $('.changeTemp').text('Change to Celsius');
        current = 1;
      } else {
        $('.temp').text(tempc);
        $('.tempf').css('display', 'none');
        $('.tempc').css('display', 'inline');
        $('.changeTemp').text('Change to Fahrenheit');
        current = 0;
      }
    })
  });
  
}, "jsonp");