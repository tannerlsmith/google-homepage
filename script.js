// vars where I store things
var apiKey = '6a370bbd49c72304c89b6cb94973905c';
var city = "";
var searchesEl = $('.searches');

$('.enter-button').on('click', function (event) {
    event.preventDefault();
    var city = $('#city').val();
    $(this).closest('form').find('input[type=text], textarea').val('')

    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial", function(data) {
        let currentIconEl = $('.current-icon') 
        let currentTempEl = $('.current-temp') 
        let currentHumidityEl = $('.current-humidity')
        let date = moment.unix(data.dt).format('MM/DD/YYYY')
        var currentIconLink = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
        let currentWindEl = $(".current-wind")
        let lat = data.coord.lat
        let lon = data.coord.lon
        
        currentTempEl.html('Temperature: ' + data.main.temp)
        currentHumidityEl.html('Humidity: ' + data.main.humidity + '%')
        currentIconEl.html(data.name + ' ' + date + ' <img src='+ currentIconLink+'> ')
        currentWindEl.html('Wind speed: ' + data.wind.speed)

        getUVIndex(lat, lon)
    })

    // call search function
    searchSection(city)
})

function getUVIndex(lat, lon) {
    $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly,alerts&appid=' + apiKey, function(data) {
        let getUVIEl = $('.current-UV')
        getUVIEl.html('UVI: ' + data.current.uvi)

        fiveDayForecast(data.daily)
    })
}

function fiveDayForecast(dailyForecast) {
    console.log('This is a daily forecast', dailyForecast)

    for (i = 1; i < 6; i++) {
        let fiveDayEl = $('#day-' + i)

        // clears cities
        fiveDayEl.html('')

        let dateEl = $('<p> </p>').html(moment.unix(dailyForecast[i].dt).format('MM/DD/YYYY'))
        
        var iconLinkEl = "https://openweathermap.org/img/w/" + dailyForecast[i].weather[0].icon + ".png"
        let iconEl = $('<img class="jquery-img" src='+ iconLinkEl + '>')
        
        let tempEl = $('<p> </p>').html("Temperature: " + dailyForecast[i].temp.day)

        let windEl = $('<p> </p>').html('Wind Speed: ' + dailyForecast[i].wind_speed)

        let humidityEl = $('<p> </p>').html('Humidity: ' + dailyForecast[i].humidity + ' %')
        
        fiveDayEl.append(dateEl, iconEl, tempEl, windEl, humidityEl)
    }
}

function searchSection(city) {
    var liEl = $('<li> </li>').html(city)
    searchesEl.append(liEl)
}



// Date, Icon, Temp, Wind, Humidity
// weather.[0].icon