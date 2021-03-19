window.addEventListener("load",function(){
    searchButton = document.querySelector(".search-button");
    todayWeather = document.getElementsByClassName("");
    nameSearch = document.getElementById("city-search")

    //Instatiate table data

    var cityName = document.getElementById("city-name");
    var cityTemp = document.getElementById("tempInput");
    var cityWind = document.getElementById("windInput");
    var cityHum  = document.getElementById("humidityInput");
    var cityUv   = document.getElementById("uvIndexInput");
    var cityImg  = document.getElementById("weatherIcon");

    // api.openweathermap.org/data/2.5/weather?q={city name}&appid=820da3b7a8a561cc5f603199f9d93f15
    function searchWeather(searchedName) {
        var fetchUrl = `http://api.openweathermap.org/data/2.5/weather?q=${searchedName}&units=imperial&appid=820da3b7a8a561cc5f603199f9d93f15`

        fetch(fetchUrl) 
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data)
            //parse data 
                // define each element
            
            postWeather(data);
            var coordinate = data.coord;
            getUVIndex(coordinate);
        });
        
        // append all the elements together
        // get the uv index and append that
        // get the forecast

    
    }
    //Function that posts todays weather 
    function postWeather(dataWeather){
        console.log(dataWeather)
         cityName.innerHTML= dataWeather.name;
        //  cityImg.src = dataWeather.weather[0].icon;
         cityTemp.innerHTML= dataWeather.main.temp;
         cityWind.innerHTML= dataWeather.wind.speed+ " MPH";
         cityHum.innerHTML= dataWeather.main.humidity+ "%";

    }

    function getUVIndex(coordinate) {
        console.log(coordinate);
        fetchUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinate.lat}&lon=${coordinate.lon}&exclude=hourly,daily&appid=820da3b7a8a561cc5f603199f9d93f15`
        fetch(fetchUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            cityUv.innerHTML = data.current.uvi;
        })
    }

    function getForecast() {
         

    }
    searchButton.addEventListener("click", function(){
        console.log("works")
       var nameSearch = document.getElementById("city-search").value;
    //    var searchedName=nameSearch.value;
       console.log(nameSearch)
       if(nameSearch){
           searchWeather(nameSearch)
           // clear the input field
           // deal with adding it to the list and to the history
       } 
    })

})

