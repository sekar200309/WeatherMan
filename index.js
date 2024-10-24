let areaName = document.querySelector(".area");
let tempDisplay = document.querySelector(".tempDisplay");
let humidityDisplay = document.querySelector(".humidityDisplay");
let currentStatus = document.querySelector(".currentStatus");
let humimg = document.querySelector(".humimg");

let apiKey = '77258fd8fa586a71bbc12d5b28b523df';

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

let lat;
let lon;
function success(pos) {
    const crd = pos.coords;
    lat = crd.latitude;
    lon = crd.longitude;


    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;


    fetch(url)
        .then((res) => res.json())
        .then((data) => {

            // console.log(data.name, lat, lon);

            let cityName = data.name;
            let description = data.weather[0].description;
            let imageCode = data.weather[0].id;
            let humidity = data.main.humidity;
            let temperature = data.main.temp - 273.15;
            // console.log(imageCode)
            // console.log(cityName, description, humidity, temperature);
            areaName.textContent = cityName;
            currentStatus.textContent = description;
            tempDisplay.textContent = temperature.toFixed(2) + "°";
            humidityDisplay.textContent = humidity + "%";

            switch (imageCode) {
                case 200:
                    humimg.src = "./img/2.gif";
                    break;
                case 300:
                    humimg.src = "./img/3.gif";   
                    break;
                case 500:
                    humimg.src = "./img/5.gif";   
                    break;
                case 600:
                    humimg.src = "./img/6.gif";  
                    break;
                case 700:
                    humimg.src = "./img/7.gif";  
                    break;
                case 800:
                    humimg.src = "./img/8.gif";  
                    break;
            
                default:
                    humimg.src = "./img/2.gif";  
                    break;
            }
            


        })
        .catch((err) => console.error('Error:', err));


}

function error(err) {
    console.log(`ERROR(${err.code}): ${err.message}`);
}

// Pass the function references to watchPosition
navigator.geolocation.watchPosition(success, error, options);


