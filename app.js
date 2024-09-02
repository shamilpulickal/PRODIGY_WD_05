// app.js

const apiKey = '78c3ee0af61d2f5d2ad941b998cad15f'; // Replace with your OpenWeatherMap API key

// Function to fetch weather by user-inputted location
function getWeather() {
    const location = document.getElementById('location').value;
    if (!location) {
        alert('Please enter a location');
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('Error fetching weather data: ' + error));
}

// Function to fetch weather by user's current location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => displayWeather(data))
                .catch(error => alert('Error fetching weather data: ' + error));
        }, () => {
            alert('Geolocation not supported or permission denied');
        });
    } else {
        alert('Geolocation is not supported by your browser');
    }
}

// Function to display weather information
function displayWeather(data) {
    if (data.cod !== 200) {
        alert('Error: ' + data.message);
        return;
    }
    const weatherDiv = document.getElementById('weather');
    const weatherInfo = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <p>Condition: ${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherDiv.innerHTML = weatherInfo;
}
