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
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log(data); // Log the entire data response for debugging

            let cityName = data.name;
            let description = data.weather[0].description;
            let imageCode = data.weather[0].id;
            let humidity = data.main.humidity;
            let temperature = data.main.temp - 273.15;

            areaName.textContent = cityName;
            currentStatus.textContent = description;
            tempDisplay.textContent = temperature.toFixed(2) + "°C"; // Specify units
            humidityDisplay.textContent = humidity + "%";

            // Handle weather icons based on imageCode
            humimg.src = `./img/${imageCode}.gif`; // Adjust this according to your image naming convention
        })
        .catch((err) => console.error('Fetch error:', err));
}

function error(err) {
    console.log(`ERROR(${err.code}): ${err.message}`);
}

// Pass the function references to watchPosition
navigator.geolocation.watchPosition(success, error, options);
