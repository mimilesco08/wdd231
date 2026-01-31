// Weather API

const API_KEY = '764795917676bc1cffa718ab8bd6b68c';
const LAT = 14.305278; 
const LON = 121.055270; 

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=imperial&appid=${API_KEY}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=imperial&appid=${API_KEY}`;

// Fetch Current Weather
async function getWeather() {
    try {
        const response = await fetch(weatherURL);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw new Error('Weather data unavailable');
        }
    } catch (error) {
        document.getElementById('current-weather').innerHTML = 
            '<p>Unable to load weather. Please check API key.</p>';
    }
}

// Display Current Weather
function displayWeather(data) {
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    
    const html = `
        <div class="current-weather">
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" 
                 alt="${desc}" width="100">
            <div>
                <div class="temp">${temp}°F</div>
                <div class="weather-desc">${desc}</div>
                <div>Humidity: ${data.main.humidity}%</div>
            </div>
        </div>
    `;
    
    document.getElementById('current-weather').innerHTML = html;
}

// Fetch 3-Day Forecast
async function getForecast() {
    try {
        const response = await fetch(forecastURL);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw new Error('Forecast unavailable');
        }
    } catch (error) {
        document.getElementById('forecast').innerHTML = 
            '<p>Forecast unavailable</p>';
    }
}

// Display 3-Day Forecast
function displayForecast(data) {
    // Get forecast for next 3 days at 12:00
    const dailyData = data.list.filter(item => 
        item.dt_txt.includes('12:00:00')
    ).slice(0, 3);
    
    const forecastHTML = dailyData.map(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        const icon = day.weather[0].icon;
        
        return `
            <div class="forecast-day">
                <div class="day">${dayName}</div>
                <img src="https://openweathermap.org/img/wn/${icon}.png" 
                     alt="weather" width="50">
                <div class="temp-forecast">${temp}°F</div>
            </div>
        `;
    }).join('');
    
    document.getElementById('forecast').innerHTML = `
        <h4>3-Day Forecast</h4>
        <div class="forecast-grid">${forecastHTML}</div>
    `;
}

// Initialize
getWeather();
getForecast();