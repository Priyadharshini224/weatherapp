
const apiKey = 'ca6978305a800a1ce4247dcf24867970';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const pressureElement = document.getElementById('pressure');
const windElement = document.getElementById('wind');
const visibilityElement = document.getElementById('visibility');
const sunriseElement = document.getElementById('sunrise');
const sunsetElement = document.getElementById('sunset');
const weatherInfo = document.querySelector('.weather-info');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a city name.');
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            locationElement.textContent = `${data.name}, ${data.sys.country}`;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
            pressureElement.textContent = `Pressure: ${data.main.pressure} hPa`;
            windElement.textContent = `Wind: ${data.wind.speed} m/s at ${data.wind.deg}°`;
            visibilityElement.textContent = `Visibility: ${data.visibility / 1000} km`;
            sunriseElement.textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
            sunsetElement.textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
            weatherInfo.style.display = 'block'; // Show the weather info
        })
        .catch(error => {
            alert(error.message);
        });
}