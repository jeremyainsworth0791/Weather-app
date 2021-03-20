window.addEventListener("load",function(){
    searchButton = document.querySelector(".search-button");
    todayWeather = document.getElementsByClassName("");
    nameSearch = document.getElementById("city-search")

    //Variables 

    var cityName = document.getElementById("city-name");
    var cityTemp = document.getElementById("tempInput");
    var cityWind = document.getElementById("windInput");
    var cityHum  = document.getElementById("humidityInput");
    var cityUv   = document.getElementById("uvIndexInput");
    var savedCity = document.getElementById("stored-searches");
    var dayDate  = document.getElementById("date-today")
    var fiveDay = document.getElementById("future-forecast");
    var currentDate = "("+moment().format('l')+")";
    var cityButtons = document.getElementsByClassName("stored-buttons");
   
   
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
                dayDate.innerHTML = currentDate;
            
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
            uvStyles(data.current.uvi);
        })
    }
    //function for displaying teh 5-day forecast
    function getForecast(searchedName) {
        fetchUrl= `api.openweathermap.org/data/2.5/forecast/daily?q=${searchedName}&cnt=5&units=imperial&appid=820da3b7a8a561cc5f603199f9d93f15`
        fetch(fetchUrl)
        .then(function (response){
            return response.json();
        })
         .then(function(data){
             fiveDay.innerHTML = "";
             for(i=0; i<5; i++){
                              
                var dateCard = document.createElement('h4');

                var cardTemp = document.createElement('p');
                var cardHumid = document.createElement('p');

                dateCard.innerHTML = moment().add((1+i), 'days').format('L');
                cardTemp.innerHTML = data.list[i].main.temp;
                cardHumid.innerHTML = data.list[i].main.humidity+" %";

                // dayCard.appendChild(dateCard);
                // dayCard.appendChild(dayTemp);
                // dayCard.appendChild(dayHumid);
                
             }
         })

    }

    function uvStyles(uvIndex){

    
        if(uvIndex > 0 && (uvIndex < 3)) {
    
            cityUv.className = "low";
                
        }
    
        if(uvIndex > 3 && (uvIndex < 6)){
    
            cityUv.className = "medium";
                
        }
    
        if(uvIndex > 6 && (uvIndex < 8)){
    
            cityUv.className = "high";
            
         }
    
        if(uvIndex > 8 && (uvIndex < 11)){
    
            cityUv.className = "very-high";
                
        }
        if(uvIndex > 11 && (uvIndex < 3)){
    
            cityUv.className = "extreme";
    
        }
    }

    function storeButtons(cityToStore){

        var savedCities = localStorage.getItem("city list");
    
        if(savedCities){
    
            savedCities = JSON.parse(savedCities);
            savedCities.push(cityToStore);
            localStorage.setItem("city list", JSON.stringify(savedCities));
    
        }else{
    
            savedCities = []
            savedCities.push(cityToStore);
            localStorage.setItem("city list", JSON.stringify(savedCities));
    
        }
    }
    
    function printStoreButtons(){

        var savedCities = localStorage.getItem("city list");
    
        if(savedCities){
    
            savedCities = JSON.parse(savedCities);
    
            for(i=0; i<savedCities.length; i++){
    
                var newButton = document.createElement('button');
                newButton.innerHTML = savedCities[i];
                newButton.setAttribute("class", "stored-buttons");
    
                newButton.addEventListener("click", function(e){
    
                    nameSearch = this.innerHTML;
                    searchWeather(nameSearch);
                    getUVIndex(coordinate);
                    // futureForcasts(searchedCity);
                    storeButtons(nameSearch);
    
                })
    
                savedCity.appendChild(newButton);
    
            }
    
        }
    }

    function updateSavedList(){

        var savedCities = localStorage.getItem("city list");
    
        if(savedCities){
    
            savedCities = JSON.parse(savedCity);
    
            var newButton = document.createElement('button');
            newButton.innerHTML = searchInput.value;
            newButton.setAttribute("class", "stored-buttons");
    
            newButton.addEventListener("click", function(e){
    
                nameSearch = this.innerHTML;
                searchWeather(nameSearch);
                // futureForcasts(searchedCity);
                storeButtons(nameSearch);
    
            })
    
            savedCity.appendChild(newButton);
    
        }
    }

    searchButton.addEventListener("click", function(){

       var nameSearch = document.getElementById("city-search").value;
    
       console.log(nameSearch)
       if(nameSearch){
           searchWeather(nameSearch);
           getForecast(nameSearch);
           storeButtons(nameSearch);
           updateSavedList();
           
       } 
       
    })
    printStoreButtons();
})

