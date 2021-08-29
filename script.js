// vars where I store things
var apiKey = '6a370bbd49c72304c89b6cb94973905c';
var city = "";

$('.enter-button').on('click', function (event) {
    event.preventDefault();
    var city = $('#city').val();

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

        getUVIndex(lat, lon)
    })
})

function getUVIndex(lat, lon) {
    $.getJSON('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey, function(data) {
        console.log('UV INDEX one call API', data)
        let getUVI = $('current-UV')
        getUVI.html('UVI: ' + data.current.uvi)
    })
}