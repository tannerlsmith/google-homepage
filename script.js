// vars where I store things
var apiKey = '6a370bbd49c72304c89b6cb94973905c';


// click the select city function
var city = "";
$('.enter-button').on('click', function (event) {
    event.preventDefault();
    // gets value of the city input to correctly make the call.
    var city = $('#city').val();

    https://openweathermap.org/api/one-call-api
    // calls the json 
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial", function(data) {
        console.log(data)
        let currentIconEl = $('.current-icon') 
        let currentWeatherEl = $('.current-weather')
        let currentTempEl = $('.current-temp') 
        let currentHumidityEl = $('.current-humidity')
        let currentUvEl = $('.current-UV')
        let date = moment.unix(data.dt).format('MM/DD/YYYY')
        var currentIconLink = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
        let currentWindEl = $(".current-wind")
        let lat = data.coord.lat
        let lon = data.coord.lon
        
        currentTempEl.html('Temperature: ' + data.main.temp)
        currentHumidityEl.html('Humidity: ' + data.main.humidity + '%')
        currentIconEl.html(data.name + ' ' + date + ' <img src='+ currentIconLink+'> ')
        currentWindEl.html('Wind speed: ' + data.wind.speed)

        
            
        // links to the icon emoji when we call the icon, + whatever code the weather is [0] is an array with icons.
        // this will link the temperature site, & this gives us the temp number.
        // var temp = Math.floor(data.main.temp);
        // This adds the weather description.
        // var weather = data.weather[0].main;
            
        // puts the icon inside the icon element.
        // $('.icon').attr('src', icon);
        // puts weather description inside weather element.
        // $('.weather').append(weather);
        // puts the temp inside the temp element.
        // $('.temp').append(temp);
            
            
        // trying to get it to display
        // var displayContainerEl = document.querySelector('#data-container');
        // displayContainerEl.innerHTML = '';
        // displayContainerEl.appendChild(data);
        

        // converts the temperature
        // when i figure it out...        
        getUVIndex(lat, lon)
        
    })
    
    
    
})

function getUVIndex(lat, lon) {
    $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey, function(data) {
        console.log('UV INDEX one call API', data)
    }
    )
}