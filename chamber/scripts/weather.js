const currentTemp = document.querySelector("#current-temp");
const weatherDescription = document.querySelector("#weather-description");
const forecastContainer = document.querySelector("#forecast");

// Andover, Minnesota
const latitude = 45.23;
const longitude = -93.29;

// OpenWeatherMap API Key
const apiKey = "761ced503d5216cd5e7a5416eaa00fa2";

// API URLs
const currentWeatherURL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;


// Get weather information
async function getWeather() {
    try {
        // Current weather
        const currentResponse = await fetch(currentWeatherURL);

        if (!currentResponse.ok) {
            throw new Error("Unable to load current weather.");
        }

        const currentData = await currentResponse.json();

        displayCurrentWeather(currentData);


        // Three-day forecast
        const forecastResponse = await fetch(forecastURL);

        if (!forecastResponse.ok) {
            throw new Error("Unable to load weather forecast.");
        }

        const forecastData = await forecastResponse.json();

        displayForecast(forecastData);

    } catch (error) {
        console.error("Weather error:", error);

        weatherDescription.textContent =
            "Weather information is currently unavailable.";
    }
}


// Display current weather
function displayCurrentWeather(data) {
    currentTemp.textContent =
        `${Math.round(data.main.temp)}°F`;

    weatherDescription.textContent =
        data.weather[0].description;
}


// Display three-day forecast
function displayForecast(data) {
    forecastContainer.innerHTML = "";

    // OpenWeatherMap provides forecasts every three hours.
    // Select the forecast closest to noon each day.
    const dailyForecasts = data.list.filter((forecast) =>
        forecast.dt_txt.includes("12:00:00")
    );

    dailyForecasts.slice(0, 3).forEach((forecast) => {

        const card = document.createElement("div");
        card.classList.add("forecast-day");

        const date = new Date(forecast.dt_txt);

        const dayName = date.toLocaleDateString("en-US", {
            weekday: "long"
        });

        const day = document.createElement("p");
        day.textContent = dayName;

        const temperature = document.createElement("p");
        temperature.textContent =
            `${Math.round(forecast.main.temp)}°F`;

        card.appendChild(day);
        card.appendChild(temperature);

        forecastContainer.appendChild(card);
    });
}


// Run weather function
getWeather();