const API_KEY = 'be1d5736e1098f8482174308a6b2c23c';
const baseUrl = "http://api.openweathermap.org/data/2.5/weather";

document.getElementById('searchButton').addEventListener('click', () => {
    const cityName = document.getElementById('cityInput').value;
    if (cityName) {
        getWeather(cityName);
    } else {
        alert("Please enter a city name.");
    }
});

// Automatically get user's location
window.onload = () => {
    navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;
        await getWeatherByCoordinates(latitude, longitude);
    }, () => {
        alert("Unable to retrieve your location.");
    });
};

// Get weather data by city name
async function getWeather(cityName) {
    const response = await fetch(`${baseUrl}?q=${cityName}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    displayWeather(data);
}

// Get weather data by coordinates
async function getWeatherByCoordinates(lat, lon) {
    const response = await fetch(`${baseUrl}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    displayWeather(data);
}

// Display weather data
function displayWeather(data) {
    if (data.cod !== 200) {
        alert(data.message);
        return;
    }

    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)} °C`;
    document.getElementById('humidity').textContent = `${data.main.humidity} %`;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} km/h`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    document.getElementById('description').textContent = data.weather[0].description;

    // Set weather icon
    const iconId = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${iconId}.png`;
}
