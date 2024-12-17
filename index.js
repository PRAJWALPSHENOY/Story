const apiKey = "bd5e378503939ddaee76f12ad7a97608"; 
function getWeather() {
    const latitude = document.getElementById("latitude").value.trim();
    const longitude = document.getElementById("longitude").value.trim();
    const weatherInfo = document.getElementById("weather-info");

    weatherInfo.innerHTML = "";

    if (!latitude || !longitude) {
        weatherInfo.innerHTML = '<p id="error">Please enter both latitude and longitude!</p>';
        return;
    }

    if (isNaN(latitude) || isNaN(longitude)) {
        weatherInfo.innerHTML = '<p id="error">Latitude and longitude must be valid numbers.</p>';
        return;
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiURL)
        .then(response => {
            if (response.status === 401) {
                throw new Error("Unauthorized: Invalid API Key. Check your API Key.");
            }
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const location = data.name || "Unknown Location";
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const humidity = data.main.humidity;

            weatherInfo.innerHTML = `
                <h3>Weather Details</h3>
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Temperature:</strong> ${temperature}°C</p>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
            `;
        })
        .catch(error => {
            console.error("API Error:", error.message);
            weatherInfo.innerHTML = `<p id="error">${error.message}</p>`;
        });
}
