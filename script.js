


//request geo location from user
const getPosition = () => {
    return new Promise((resolve, reject) => {
        const onSuccess = (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            pos = [lat,lng];
            latNum = lat;
            longNum = lng;
            resolve(pos);
            
        }
        const onError = () => {
            console.log('Can\'t get location info');
            reject();
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    })
}

// use it anywhere
getPosition().then((position) => {
    console.log(position); 
});




//variables created to pull id from html
const inputval = document.querySelector('#city-input');
const btn = document.querySelector('#add');
const city = document.querySelector('#city-output');
const latVal = document.querySelector('#lat-coord');
const longVal = document.querySelector('#long-coord');
const weatherVal = document.querySelector('#weather-info');
const windVal = document.querySelector('#wind-speed');
const timeVal = document.querySelector('#current-time');
const currentTempVal = document.querySelector('#hourly-temp')
const hoursBox = document.querySelector('#hours')
const iconData = document.querySelector('#icon')


//eventlistener to trigger a function when clicked on submit to pull data from json
btn.addEventListener('click', function() {
    
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latNum}&longitude=${longNum}&hourly=temperature_2m&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&hourly=&forecast_days=16&timezone=CST`)
    .then((res) => {
        return res.json()
       
        })
        .then((data) => {
            console.log(data)
    
            //variables create to pull data from api
            const nameVal = data['name']
            const lat = data['latitude']
            const long = data['longitude']
            const weatherInfo = data['current_weather']['temperature']
            const windspeedVal = data['current_weather']['windspeed']
            const timeData = data['current_weather']['']
           
            const hrTime = data['hourly']['time']
            

            //variables to get icons 
              
            const icon = `https://api.open-meteo.com/v1/dwd-icon?`
        
            
            // latVal.innerHTML = `Latitude: <span>${lat}\u00B0<span>`;
            // longVal.innerHTML = `Latitude: <span>${long}\u00B0<span>`;
            weatherVal.innerHTML = `Current temperature: <span>${Math.round(weatherInfo)}\u00B0F<span>`;
            windVal.innerHTML = `Wind Speed: <span>${Math.round(windspeedVal)} Mph<span>`;
            // timeVal.innerHTML = `Current time: <span> ${timeData}<span>`;
            // currentTempVal.innerHTML = `<span> ${Math.round(currentTemp)}\u00B0F</span>`;
            // hoursBox.innerHTML = `<span>${}</span>`

            iconData.innerHTML = `<span> ${iconData}</span>`;

        });

        //Function to grab user ip address and converts and grabs city name
        fetch('https://api.ipregistry.co/?key=gsu3wd1naudlulb9')
        .then(function (response) {
            return response.json();
            })
        .then((payload) => {
            const cityInfo = payload.location.country.name + ', ' + payload.location.city;  
            city.innerHTML = ` ${cityInfo}`;
        });

       
});






    
    