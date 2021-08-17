// vars where I store things
var apiKey = '6a370bbd49c72304c89b6cb94973905c';


// click the select city function
var city = "";
$('btn').on('click', function (event) {
    event.preventDefault();
    // gets value of the city input to correctly make the call.
    var city = $('#city').val();

    
    // calls the json 
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey, function(data) {

        console.log(data);
            
            
            
            
        // links to the icon emoji when we call the icon, + whatever code the weather is [0] is an array with icons.
        var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        // this will link the temperature site, & this gives us the temp number.
        var temp = Math.floor(data.main.temp);
        // This adds the weather description.
        var weather = data.weather[0].main;
            
        // puts the icon inside the icon element.
        $('.icon').attr('src', icon);
        // puts weather description inside weather element.
        $('.weather').append(weather);
        // puts the temp inside the temp element.
        $('.temp').append(temp);
            
            
        // trying to get it to display
        var displayContainerEl = document.querySelector('#data-container');
        displayContainerEl.innerHTML = '';
        displayContainerEl.appendChild(data);
        

        // converts the temperature
        // when i figure it out...        
        
        
    })
})